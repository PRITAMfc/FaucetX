import { Worker } from 'bullmq'
import { createRedisConnection } from '../redis.js'
import { analyticsQueue } from '../queues.js'
import { cacheManager, metrics, eventBus } from '../index.js'
import { AnalyticsJobData, JobResult } from '../types.js'

export class AnalyticsProcessor {
  private worker: Worker<AnalyticsJobData>

  constructor() {
    this.worker = new Worker(
      'analytics',
      async (job) => {
        const startTime = Date.now()
        const { type, data, timestamp, userId, sessionId } = job.data

        await job.updateProgress(10)

        try {
          await job.updateProgress(40)

          const analyticsData = {
            type,
            data,
            timestamp: timestamp || Date.now(),
            userId,
            sessionId,
            processedAt: new Date().toISOString(),
          }

          const analyticsKey = `analytics:${type}:${new Date().toISOString().slice(0, 10)}`
          const existing = await cacheManager.get<any[]>(analyticsKey) || []
          existing.push(analyticsData)

          await cacheManager.set(analyticsKey, existing.slice(-1000), 86400)

          await job.updateProgress(70)

          await metrics.recordTiming('analytics.processing', Date.now() - startTime, { type })
          await metrics.incrementCounter('analytics.processed', { type })

          if (userId) {
            await metrics.incrementCounter('user.activity', { userId, type: 'analytics' })
          }

          if (sessionId) {
            await metrics.incrementCounter('session.activity', { sessionId, type: 'analytics' })
          }

          const result: JobResult = {
            success: true,
            data: analyticsData,
            durationMs: Date.now() - startTime,
            retries: job.attemptsMade,
            timestamp: Date.now(),
          }

          await metrics.incrementCounter('job.success', { queue: 'analytics' })

          eventBus.emit('job:completed', { jobId: job.id, queue: 'analytics', result })
          eventBus.emit('analytics:processed', { type, data })

          await job.updateProgress(100)

          return result
        } catch (error: any) {
          await metrics.incrementCounter('job.error', { queue: 'analytics', error: error.message })
          eventBus.emit('job:failed', { jobId: job.id, queue: 'analytics', error: error.message })

          throw error
        }
      },
      {
        connection: createRedisConnection(),
        concurrency: 3,
        limiter: {
          max: 30,
          duration: 1000,
        },
      }
    )

    this.worker.on('completed', (job) => {
      console.log(`[AnalyticsProcessor] Job ${job.id} completed`)
    })

    this.worker.on('failed', (job, err) => {
      console.error(`[AnalyticsProcessor] Job ${job?.id} failed:`, err.message)
    })

    this.worker.on('error', (err) => {
      console.error('[AnalyticsProcessor] Worker error:', err)
    })
  }

  async addJob(data: AnalyticsJobData, options?: { priority?: number; delay?: number }) {
    return analyticsQueue.add(
      'process-analytics',
      data,
      {
        priority: data.timestamp ? 5 : 3,
        ...options,
      }
    )
  }

  async drain(): Promise<void> {
    await this.worker.close()
  }
}
