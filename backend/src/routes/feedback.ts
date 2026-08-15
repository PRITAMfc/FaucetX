import { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { FeedbackProcessor } from '../queues/processors/feedback.processor.js'
import { cacheManager, metrics, feedbackQueue } from '../queues/index.js'

const routes: FastifyPluginAsync = async (fastify) => {
  const feedbackSchema = z.object({
    feedback: z.string().min(1).max(2000),
    walletAddress: z.string().optional(),
    sessionId: z.string().optional(),
  })

  fastify.post<{ Body: { feedback: string; walletAddress?: string; sessionId?: string } }>(
    '/',
    async (request, reply) => {
      try {
        const { feedback, walletAddress, sessionId } = feedbackSchema.parse(request.body)

        const feedbackProcessor = new FeedbackProcessor()
        const job = await feedbackProcessor.addJob(
          {
            feedback,
            walletAddress,
            sessionId,
            priority: 'normal',
          },
          { priority: 5 }
        )

        const result = await job.finished()

        return reply.status(202).send({
          success: true,
          jobId: job.id,
          status: 'queued',
          result,
        })
      } catch (err) {
        if (err instanceof z.ZodError) {
          return reply.status(400).send({ error: 'Invalid input', details: err.errors })
        }
        throw err
      }
    }
  )

  fastify.get('/', async (_request, reply) => {
    try {
      const cacheKey = 'feedback:recent'
      let result = await cacheManager.get<any>(cacheKey)

      if (!result) {
        const items = await cacheManager.scanKeys('faucetx:feedback:*')
        const feedback = []

        for (const key of items.slice(0, 50)) {
          const data = await cacheManager.get<any>(key)
          if (data) {
            feedback.push(data)
          }
        }

        result = {
          count: feedback.length,
          feedback: feedback.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
        }

        await cacheManager.set(cacheKey, result, 300)
      }

      return result
    } catch (err) {
      throw err
    }
  })

  fastify.get('/stats', async () => {
    try {
      const cacheKey = 'feedback:stats'
      let stats = await cacheManager.get<any>(cacheKey)

      if (!stats) {
        const items = await cacheManager.scanKeys('faucetx:feedback:*')
        const entries: any[] = []

        for (const key of items) {
          const data = await cacheManager.get<any>(key)
          if (data) {
            entries.push(data)
          }
        }

        const sentimentCounts = entries.reduce(
          (acc: Record<string, number>, e: any) => {
            acc[e.sentiment] = (acc[e.sentiment] || 0) + 1
            return acc
          },
          {} as Record<string, number>
        )

        const categoryCounts = entries.reduce(
          (acc: Record<string, number>, e: any) => {
            acc[e.category] = (acc[e.category] || 0) + 1
            return acc
          },
          {} as Record<string, number>
        )

        stats = {
          total: entries.length,
          sentiments: sentimentCounts,
          categories: categoryCounts,
        }

        await cacheManager.set(cacheKey, stats, 600)
      }

      return stats
    } catch (err) {
      throw err
    }
  })

  fastify.get('/jobs/:jobId', async (request, reply) => {
    try {
      const { jobId } = request.params as { jobId: string }
      const job = await feedbackQueue.getJob(jobId)

      if (!job) {
        return reply.status(404).send({ error: 'Job not found' })
      }

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
      }
    } catch (error) {
      throw error
    }
  })
}

export { routes as feedbackRoutes }
