import { Worker } from 'bullmq'
import { createRedisConnection } from '../redis.js'
import { maintenanceQueue } from '../queues.js'
import { cacheManager, metrics, eventBus } from '../index.js'
import { MaintenanceJobData, JobResult } from '../types.js'

export class MaintenanceProcessor {
  private worker: Worker<MaintenanceJobData>
  private redis: ReturnType<typeof createRedisConnection>

  constructor() {
    this.redis = createRedisConnection()

    this.worker = new Worker(
      'maintenance',
      async (job) => {
        const startTime = Date.now()
        const { type, params, priority } = job.data

        await job.updateProgress(10)

        try {
          await job.updateProgress(30)

          let result: any

          switch (type) {
            case 'cleanup_feedback':
              result = await this.cleanupFeedback(params)
              break
            case 'cleanup_sessions':
              result = await this.cleanupSessions(params)
              break
            case 'aggregate_stats':
              result = await this.aggregateStats(params)
              break
            case 'health_check':
              result = await this.healthCheck(params)
              break
            default:
              throw new Error(`Unknown maintenance type: ${type}`)
          }

          await job.updateProgress(70)

          await metrics.recordTiming('maintenance', Date.now() - startTime, { type })
          await metrics.incrementCounter('maintenance.completed', { type })

          eventBus.emit('maintenance:completed', { type, result })

          const jobResult: JobResult = {
            success: true,
            data: result,
            durationMs: Date.now() - startTime,
            retries: job.attemptsMade,
            timestamp: Date.now(),
          }

          await metrics.incrementCounter('job.success', { queue: 'maintenance' })

          await job.updateProgress(100)

          return jobResult
        } catch (error: any) {
          await metrics.incrementCounter('job.error', { queue: 'maintenance', error: error.message })
          eventBus.emit('job:failed', { jobId: job.id, queue: 'maintenance', error: error.message })

          throw error
        }
      },
      {
        connection: this.redis,
        concurrency: 2,
        limiter: {
          max: 10,
          duration: 1000,
        },
      }
    )

    this.worker.on('completed', (job) => {
      console.log(`[MaintenanceProcessor] Job ${job.id} completed`)
    })

    this.worker.on('failed', (job, err) => {
      console.error(`[MaintenanceProcessor] Job ${job?.id} failed:`, err.message)
    })

    this.worker.on('error', (err) => {
      console.error('[MaintenanceProcessor] Worker error:', err)
    })
  }

  private async cleanupFeedback(params?: Record<string, any>): Promise<{ removed: number }> {
    const maxAge = params?.maxAge || 30 * 24 * 3600
    const cutoff = Date.now() - maxAge * 1000

    const keys = await cacheManager.scanKeys('faucetx:feedback:*')
    let removed = 0

    for (const key of keys) {
      const data = await this.redis.get(key)
      if (data) {
        try {
          const parsed = JSON.parse(data)
          if (parsed.createdAt && new Date(parsed.createdAt).getTime() < cutoff) {
            await this.redis.del(key)
            removed++
          }
        } catch {
          await this.redis.del(key)
          removed++
        }
      }
    }

    return { removed }
  }

  private async cleanupSessions(params?: Record<string, any>): Promise<{ removed: number }> {
    const keys = await cacheManager.scanKeys('faucetx:session:*')
    let removed = 0

    for (const key of keys) {
      const ttl = await this.redis.ttl(key)
      if (ttl < 0) {
        await this.redis.del(key)
        removed++
      }
    }

    return { removed }
  }

  private async aggregateStats(params?: Record<string, any>): Promise<{ aggregated: boolean }> {
    const stats = await cacheManager.get<any>('faucetx:stats:daily')
    const now = new Date().toISOString().slice(0, 10)

    if (!stats || stats.date !== now) {
      await cacheManager.set(
        'faucetx:stats:daily',
        {
          date: now,
          totalOperations: 0,
          totalFeedback: 0,
          errors: 0,
          updatedAt: Date.now(),
        },
        86400
      )
    }

    return { aggregated: true }
  }

  private async healthCheck(params?: Record<string, any>): Promise<{
    redis: boolean
    queues: Record<string, boolean>
    timestamp: number
  }> {
    let redisStatus = false
    try {
      redisStatus = (await this.redis.ping()) === 'PONG'
    } catch {
      redisStatus = false
    }

    const queues = ['faucet', 'feedback', 'analytics', 'maintenance', 'rate-limit', 'cache']
    const queueStatus: Record<string, boolean> = {}

    for (const queueName of queues) {
      try {
        const key = `bull:${queueName}:waiting`
        await this.redis.exists(key)
        queueStatus[queueName] = true
      } catch {
        queueStatus[queueName] = false
      }
    }

    return {
      redis: redisStatus,
      queues: queueStatus,
      timestamp: Date.now(),
    }
  }

  async addJob(data: MaintenanceJobData, options?: { priority?: number; delay?: number; cron?: string }) {
    return maintenanceQueue.add(
      `maintenance-${data.type}`,
      data,
      {
        priority: data.priority === 'high' ? 8 : data.priority === 'low' ? 1 : 5,
        ...options,
      }
    )
  }

  async scheduleRecurring(type: MaintenanceJobData['type'], cronPattern: string): Promise<void> {
    await maintenanceQueue.add(
      `scheduled-${type}`,
      { type, params: {} },
      {
        repeat: { cron: cronPattern },
        priority: 1,
      }
    )
  }

  async drain(): Promise<void> {
    await this.worker.close()
  }
}
