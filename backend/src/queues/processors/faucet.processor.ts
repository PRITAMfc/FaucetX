import { Worker, Job } from 'bullmq'
import { createRedisConnection } from '../redis.js'
import { faucetQueue, rateLimitQueue, maintenanceQueue } from '../queues.js'
import { fundWallet, getBalance, getTransaction } from '../../utils/wallet.js'
import { cacheManager, lockManager, metrics, eventBus } from '../index.js'
import { FaucetJobData, JobResult, FaucetJobPhase, CircuitBreakerState } from '../types.js'

const FAUCET_PROCESSOR_VERSION = '2.0.0'
const CIRCUIT_BREAKER_THRESHOLD = 5
const CIRCUIT_BREAKER_COOLDOWN_MS = 30000
const RATE_LIMIT_WINDOW_MS = 60000
const RATE_LIMIT_MAX_PER_WINDOW = 3
const JOB_DEDUP_TTL_SECONDS = 300

type PhaseResult = {
  phase: FaucetJobPhase
  success: boolean
  data?: any
  error?: string
  durationMs: number
}

type CircuitBreaker = {
  state: CircuitBreakerState
  failures: number
  lastFailure: number
  nextRetry: number
}

export class FaucetProcessor {
  private worker: Worker<FaucetJobData>
  private circuitBreaker: CircuitBreaker = {
    state: 'closed',
    failures: 0,
    lastFailure: 0,
    nextRetry: 0,
  }
  private activeJobs: Map<string, Job<FaucetJobData>> = new Map()
  private processedSignatures: Set<string> = new Set()

  constructor() {
    this.worker = new Worker(
      'faucet',
      async (job) => this.processJob(job),
      {
        connection: createRedisConnection(),
        concurrency: 10,
        limiter: {
          max: 100,
          duration: 1000,
        },
        settings: {
          stalledInterval: 30000,
          maxStalledCount: 2,
        },
      }
    )

    this.worker.on('completed', (job) => {
      this.activeJobs.delete(job?.id as string)
      console.log(`[FaucetProcessor:v${FAUCET_PROCESSOR_VERSION}] Job ${job?.id} completed`)
    })

    this.worker.on('failed', (job, err) => {
      this.activeJobs.delete(job?.id as string)
      console.error(`[FaucetProcessor:v${FAUCET_PROCESSOR_VERSION}] Job ${job?.id} failed:`, err.message)
    })

    this.worker.on('error', (err) => {
      console.error(`[FaucetProcessor:v${FAUCET_PROCESSOR_VERSION}] Worker error:`, err)
    })

    this.worker.on('stalled', (jobId) => {
      console.warn(`[FaucetProcessor:v${FAUCET_PROCESSOR_VERSION}] Job ${jobId} stalled`)
      metrics.incrementCounter('faucet.job.stalled', { jobId: String(jobId) })
    })
  }

  private async processJob(job: Job<FaucetJobData>): Promise<JobResult> {
    const startTime = Date.now()
    const { address, amount = 10, memo, userId, sessionId, priority = 'normal', metadata = {} } = job.data
    const phases: PhaseResult[] = []
    let retries = 0

    await job.updateProgress(5, { phase: 'initializing' })

    const dedupKey = `faucet:dedup:${address}:${amount}:${memo || 'none'}`
    const isDuplicate = await this.checkDuplicate(dedupKey)
    if (isDuplicate) {
      await metrics.incrementCounter('faucet.job.duplicate', { address, amount: String(amount) })
      throw new Error(`Duplicate faucet job for ${address} with amount ${amount}`)
    }
    await cacheManager.set(dedupKey, { address, amount, timestamp: Date.now() }, JOB_DEDUP_TTL_SECONDS)

    const lockKey = `fund:${address}`
    const lock = await lockManager.acquire(lockKey, 45000, `job-${job.id}-${FAUCET_PROCESSOR_VERSION}`)

    if (!lock) {
      await metrics.incrementCounter('job.retry', { queue: 'faucet', reason: 'lock_contention' })
      throw new Error(`Rate limited: wallet ${address} is already being processed`)
    }

    try {
      const rateLimitOk = await this.checkRateLimit(address)
      if (!rateLimitOk) {
        await metrics.incrementCounter('faucet.rate_limited', { address })
        eventBus.emit('rate:limited', { address, reason: 'per_address_limit' })
        throw new Error(`Rate limited: too many requests for ${address}`)
      }

      await job.updateProgress(10, { phase: 'validating' })
      const validationResult = await this.runPhase('validation', async () => {
        this.validateJobData({ address, amount, memo })
        return { valid: true }
      })
      phases.push(validationResult)

      if (!validationResult.success) {
        throw new Error(`Validation failed: ${validationResult.error}`)
      }

      await job.updateProgress(25, { phase: 'checking_balance' })
      const balanceResult = await this.runPhase('balance_check', async () => {
        const cacheKey = `balance:${address}`
        let balanceInfo: any = await cacheManager.get(cacheKey)

        if (!balanceInfo) {
          balanceInfo = await getBalance(address)
          await cacheManager.set(cacheKey, balanceInfo, 120)
          eventBus.emit('cache:miss', { key: cacheKey })
        } else {
          eventBus.emit('cache:hit', { key: cacheKey })
        }

        return balanceInfo
      })
      phases.push(balanceResult)

      if (amount > 0) {
        await job.updateProgress(40, { phase: 'circuit_breaker_check' })
        const circuitOk = await this.checkCircuitBreaker()
        if (!circuitOk) {
          throw new Error(`Circuit breaker open: Friendbot API temporarily unavailable`)
        }

        await job.updateProgress(50, { phase: 'funding' })
        const fundingResult = await this.runPhase('funding', async () => {
          const result = await fundWallet(address)
          await cacheManager.del(`balance:${address}`)
          return result
        })
        phases.push(fundingResult)

        if (fundingResult.success && fundingResult.data?.hash) {
          await job.updateProgress(65, { phase: 'verifying_transaction' })
          const verifyResult = await this.runPhase('verification', async () => {
            const tx = await getTransaction(fundingResult.data.hash)
            return { verified: tx.successful, tx }
          })
          phases.push(verifyResult)

          if (!verifyResult.success || !verifyResult.data?.verified) {
            await metrics.incrementCounter('faucet.verification_failed', { address, hash: fundingResult.data.hash })
          }

          await job.updateProgress(80, { phase: 'updating_metrics' })
          await metrics.recordTiming('faucet.funding', Date.now() - startTime, { address, priority })
          await metrics.incrementCounter('faucet.funded', { address, priority })
          await metrics.incrementCounter('faucet.amount_distributed', { amount: String(amount) })

          if (userId) {
            await metrics.incrementCounter('user.activity', { userId, type: 'faucet' })
          }
          if (sessionId) {
            await metrics.incrementCounter('session.activity', { sessionId, type: 'faucet' })
          }

          await metrics.incrementCounter('faucet.cache.invalidated', { key: `balance:${address}` })
        }
      }

      await job.updateProgress(90, { phase: 'finalizing' })

      const result: JobResult = {
        success: true,
        data: {
          address,
          balance: balanceResult.data?.balance || '0',
          previousBalance: balanceResult.data?.balance || '0',
          fundedAmount: amount,
          hash: phases.find((p) => p.phase === 'funding')?.data?.hash,
          phases: phases.map((p) => ({ phase: p.phase, success: p.success, durationMs: p.durationMs })),
          verified: phases.find((p) => p.phase === 'verification')?.data?.verified || false,
        },
        durationMs: Date.now() - startTime,
        retries,
        timestamp: Date.now(),
      }

      await metrics.recordTiming('faucet.total', result.durationMs, { priority, status: 'success' })
      await metrics.incrementCounter('job.success', { queue: 'faucet', priority })

      eventBus.emit('job:completed', { jobId: job.id, queue: 'faucet', result, version: FAUCET_PROCESSOR_VERSION })

      await job.updateProgress(100, { phase: 'completed' })

      return result
    } catch (error: any) {
      retries = job.attemptsMade
      const errorType = this.classifyError(error)

      await metrics.incrementCounter('job.error', { queue: 'faucet', error: errorType, message: error.message })
      await metrics.incrementCounter(`faucet.error.${errorType}`, { address, amount: String(amount) })
      eventBus.emit('job:failed', { jobId: job.id, queue: 'faucet', error: error.message, errorType, retries })

      if (errorType === 'friendbot_api_error') {
        this.recordCircuitBreakerFailure()
      }

      throw error
    } finally {
      await lockManager.release(lock)
      this.processedSignatures.delete(`${address}-${amount}-${memo || 'none'}`)
    }
  }

  private async runPhase<T>(phase: FaucetJobPhase, fn: () => Promise<T>): Promise<PhaseResult> {
    const start = Date.now()
    try {
      const data = await fn()
      return {
        phase,
        success: true,
        data,
        durationMs: Date.now() - start,
      }
    } catch (error: any) {
      return {
        phase,
        success: false,
        error: error.message,
        durationMs: Date.now() - start,
      }
    }
  }

  private validateJobData(data: { address: string; amount: number; memo?: string }): void {
    if (!data.address || data.address.length < 56 || data.address.length > 56) {
      throw new Error('Invalid Stellar address length')
    }

    if (!data.address.startsWith('G')) {
      throw new Error('Invalid Stellar address prefix')
    }

    if (data.amount < 0 || data.amount > 1000) {
      throw new Error('Amount must be between 0 and 1000 XLM')
    }

    if (data.memo && data.memo.length > 28) {
      throw new Error('Memo must be 28 characters or less')
    }
  }

  private async checkDuplicate(key: string): Promise<boolean> {
    const existing = await cacheManager.get<{ timestamp: number }>(key)
    if (!existing) return false

    const age = Date.now() - existing.timestamp
    return age < JOB_DEDUP_TTL_SECONDS * 1000
  }

  private async checkRateLimit(address: string): Promise<boolean> {
    const key = `ratelimit:faucet:${address}`
    const current = await cacheManager.get<{ count: number; windowStart: number }>(key)

    if (!current) {
      await cacheManager.set(key, { count: 1, windowStart: Date.now() }, Math.ceil(RATE_LIMIT_WINDOW_MS / 1000))
      return true
    }

    const windowAge = Date.now() - current.windowStart
    if (windowAge > RATE_LIMIT_WINDOW_MS) {
      await cacheManager.set(key, { count: 1, windowStart: Date.now() }, Math.ceil(RATE_LIMIT_WINDOW_MS / 1000))
      return true
    }

    if (current.count >= RATE_LIMIT_MAX_PER_WINDOW) {
      return false
    }

    await cacheManager.set(key, { count: current.count + 1, windowStart: current.windowStart }, Math.ceil(RATE_LIMIT_WINDOW_MS / 1000))
    return true
  }

  private async checkCircuitBreaker(): Promise<boolean> {
    const now = Date.now()

    if (this.circuitBreaker.state === 'open') {
      if (now >= this.circuitBreaker.nextRetry) {
        this.circuitBreaker.state = 'half-open'
        return true
      }
      return false
    }

    return true
  }

  private recordCircuitBreakerFailure(): void {
    this.circuitBreaker.failures++
    this.circuitBreaker.lastFailure = Date.now()

    if (this.circuitBreaker.failures >= CIRCUIT_BREAKER_THRESHOLD) {
      this.circuitBreaker.state = 'open'
      this.circuitBreaker.nextRetry = Date.now() + CIRCUIT_BREAKER_COOLDOWN_MS

      metrics.incrementCounter('faucet.circuit_breaker.opened')
      eventBus.emit('faucet:circuit_breaker_open', { failures: this.circuitBreaker.failures, cooldown: CIRCUIT_BREAKER_COOLDOWN_MS })

      setTimeout(() => {
        this.circuitBreaker.state = 'closed'
        this.circuitBreaker.failures = 0
        metrics.incrementCounter('faucet.circuit_breaker.closed')
        eventBus.emit('faucet:circuit_breaker_closed')
      }, CIRCUIT_BREAKER_COOLDOWN_MS)
    }
  }

  private classifyError(error: Error): string {
    const message = error.message.toLowerCase()
    if (message.includes('friendbot') || message.includes('funding failed') || message.includes('502') || message.includes('503')) {
      return 'friendbot_api_error'
    }
    if (message.includes('rate limit') || message.includes('too many requests')) {
      return 'rate_limit_error'
    }
    if (message.includes('invalid address') || message.includes('invalid stellar')) {
      return 'validation_error'
    }
    if (message.includes('lock')) {
      return 'lock_error'
    }
    if (message.includes('network') || message.includes('timeout') || message.includes('econnreset')) {
      return 'network_error'
    }
    return 'unknown_error'
  }

  async addJob(data: FaucetJobData, options?: { priority?: number; delay?: number; cron?: string; removeOnComplete?: boolean; removeOnFail?: boolean }) {
    const priorityMap: Record<string, number> = { low: 1, normal: 5, high: 8, critical: 10 }
    const jobPriority = priorityMap[data.priority || 'normal'] || 5

    const jobOptions: any = {
      priority: jobPriority,
      ...options,
    }

    if (!options?.removeOnComplete) {
      jobOptions.removeOnComplete = { count: 1000, age: 24 * 3600 }
    }
    if (!options?.removeOnFail) {
      jobOptions.removeOnFail = { count: 5000, age: 7 * 24 * 3600 }
    }

    const job = await faucetQueue.add(
      `faucet-${data.address}-${Date.now()}`,
      data,
      jobOptions
    )

    this.activeJobs.set(job.id as string, job)

    await metrics.incrementCounter('faucet.job.created', { address: data.address, priority: data.priority || 'normal' })
    eventBus.emit('faucet:job_created', { jobId: job.id, address: data.address, amount: data.amount })

    return job
  }

  async addScheduledJob(data: FaucetJobData, cronPattern: string, options?: { priority?: number }) {
    const priorityMap: Record<string, number> = { low: 1, normal: 5, high: 8, critical: 10 }
    const jobPriority = priorityMap[data.priority || 'normal'] || 5

    const job = await faucetQueue.add(
      `scheduled-faucet-${data.address}`,
      data,
      {
        priority: jobPriority,
        repeat: { cron: cronPattern },
        removeOnComplete: { count: 100, age: 24 * 3600 },
        removeOnFail: { count: 100, age: 24 * 3600 },
        ...options,
      }
    )

    await metrics.incrementCounter('faucet.job.scheduled', { address: data.address, cron: cronPattern })
    eventBus.emit('faucet:job_scheduled', { jobId: job.id, address: data.address, cron: cronPattern })

    return job
  }

  async getJob(jobId: string) {
    const job = await faucetQueue.getJob(jobId)
    if (!job) return null

    const state = await job.getState()

    return {
      id: job.id,
      name: job.name,
      data: job.data,
      state,
      progress: job.progress,
      attemptsMade: job.attemptsMade,
      timestamp: job.timestamp,
      processedOn: job.processedOn,
      finishedOn: job.finishedOn,
      failedReason: job.failedReason,
      returnValue: job.returnvalue,
    }
  }

  async getActiveJobs(): Promise<any[]> {
    const jobs: any[] = []
    for (const [id, job] of this.activeJobs) {
      const state = await job.getState()
      jobs.push({
        id: job.id,
        name: job.name,
        data: job.data,
        state,
        progress: job.progress,
      })
    }
    return jobs
  }

  async getMetrics(): Promise<{
    queueDepth: number
    activeJobs: number
    completed: number
    failed: number
    delayed: number
    circuitBreaker: CircuitBreaker
    avgDurationMs: number
    throughputPerMin: number
  }> {
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      faucetQueue.getWaitingCount(),
      faucetQueue.getActiveCount(),
      faucetQueue.getCompletedCount(),
      faucetQueue.getFailedCount(),
      faucetQueue.getDelayedCount(),
    ])

    const timings = await metrics.getMetrics('faucet.total')
    const timingData = timings['faucet.total'] as any
    const avgDurationMs = timingData?.avgMs || 0

    return {
      queueDepth: waiting,
      activeJobs: this.activeJobs.size,
      completed,
      failed,
      delayed,
      circuitBreaker: this.circuitBreaker,
      avgDurationMs,
      throughputPerMin: 0,
    }
  }

  async getHealthStatus(): Promise<{
    healthy: boolean
    checks: Record<string, boolean>
    circuitBreaker: CircuitBreaker
    queueDepth: number
    timestamp: number
  }> {
    const checks: Record<string, boolean> = {}
    const circuitBreaker = this.circuitBreaker

    try {
      checks.redis = await this.worker.client.ping()
    } catch {
      checks.redis = false
    }

    checks.circuitBreaker = circuitBreaker.state === 'closed'

    const metrics = await this.getMetrics()
    checks.queueDepth = metrics.queueDepth < 100
    checks.activeWorkers = this.worker.isReady()

    const healthy = Object.values(checks).every((v) => v === true)

    return {
      healthy,
      checks,
      circuitBreaker,
      queueDepth: metrics.queueDepth,
      timestamp: Date.now(),
    }
  }

  async drain(): Promise<void> {
    await this.worker.close()
  }
}
