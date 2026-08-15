import { Worker } from 'bullmq'
import { createRedisConnection } from '../redis.js'
import { feedbackQueue } from '../queues.js'
import { cacheManager, metrics, eventBus } from '../index.js'
import { FeedbackJobData, JobResult } from '../types.js'

export class FeedbackProcessor {
  private worker: Worker<FeedbackJobData>

  constructor() {
    this.worker = new Worker(
      'feedback',
      async (job) => {
        const startTime = Date.now()
        const { feedback, walletAddress, sessionId, priority, metadata } = job.data

        await job.updateProgress(10)

        try {
          await job.updateProgress(30)

          const analysis = await submitFeedback(feedback, walletAddress)

          await job.updateProgress(70)

          const sentiment = analysis.sentiment
          const category = analysis.category

          const cacheKey = `feedback:stats:${category}`
          const cachedStats = await cacheManager.get<Record<string, number>>(cacheKey)

          if (cachedStats) {
            cachedStats[sentiment] = (cachedStats[sentiment] || 0) + 1
            await cacheManager.set(cacheKey, cachedStats, 600)
          }

          await metrics.recordTiming('feedback.analysis', Date.now() - startTime, { category, sentiment })
          await metrics.incrementCounter('feedback.submitted', { category, sentiment })

          if (sessionId) {
            await metrics.incrementCounter('session.activity', { sessionId, type: 'feedback' })
          }

          const result: JobResult = {
            success: true,
            data: analysis,
            durationMs: Date.now() - startTime,
            retries: job.attemptsMade,
            timestamp: Date.now(),
          }

          await metrics.incrementCounter('job.success', { queue: 'feedback' })

          eventBus.emit('job:completed', { jobId: job.id, queue: 'feedback', result })
          eventBus.emit('feedback:analyzed', { feedback, sentiment, category })

          await job.updateProgress(100)

          return result
        } catch (error: any) {
          await metrics.incrementCounter('job.error', { queue: 'feedback', error: error.message })
          eventBus.emit('job:failed', { jobId: job.id, queue: 'feedback', error: error.message })

          throw error
        }
      },
      {
        connection: createRedisConnection(),
        concurrency: 5,
        limiter: {
          max: 50,
          duration: 1000,
        },
      }
    )

    this.worker.on('completed', (job) => {
      console.log(`[FeedbackProcessor] Job ${job.id} completed`)
    })

    this.worker.on('failed', (job, err) => {
      console.error(`[FeedbackProcessor] Job ${job?.id} failed:`, err.message)
    })

    this.worker.on('error', (err) => {
      console.error('[FeedbackProcessor] Worker error:', err)
    })
  }

  async addJob(data: FeedbackJobData, options?: { priority?: number; delay?: number }) {
    const priorityMap = { low: 1, normal: 5, high: 8, critical: 10 }
    const jobPriority = priorityMap[data.priority || 'normal'] || 5

    return feedbackQueue.add(
      'analyze-feedback',
      data,
      {
        priority: jobPriority,
        ...options,
      }
    )
  }

  async drain(): Promise<void> {
    await this.worker.close()
  }
}
