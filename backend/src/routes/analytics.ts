import { FastifyPluginAsync } from 'fastify'
import { analyticsQueue } from '../queues/queues.js'
import { cacheManager, metrics } from '../queues/index.js'

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/events', async (request) => {
    try {
      const query = request.query as { limit?: string; type?: string }
      const limit = parseInt(query.limit || '100')
      const type = query.type

      let analyticsKey = 'analytics:*'
      if (type) {
        analyticsKey = `analytics:${type}:*`
      }

      const keys = await cacheManager.scanKeys(analyticsKey)
      const events: any[] = []

      for (const key of keys.slice(0, limit)) {
        const data = await cacheManager.get<any[]>(key)
        if (data) {
          events.push(...data)
        }
      }

      events.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))

      return {
        total: events.length,
        events: events.slice(0, limit),
      }
    } catch (error) {
      throw error
    }
  })

  fastify.get('/events/types', async () => {
    const types = ['balance_check', 'funding', 'feedback', 'error', 'custom']
    const typeStats: Record<string, number> = {}

    for (const type of types) {
      const count = await analyticsQueue.getJobCounts()
      typeStats[type] = count.waiting + count.active + count.completed
    }

    return { types, stats: typeStats }
  })

  fastify.post<{ Body: { type: string; data: Record<string, any>; userId?: string; sessionId?: string } }>(
    '/track',
    async (request, reply) => {
      try {
        const { type, data, userId, sessionId } = request.body

        const validTypes = ['balance_check', 'funding', 'feedback', 'error', 'custom']
        if (!validTypes.includes(type)) {
          return reply.status(400).send({ error: 'Invalid event type', validTypes })
        }

        const job = await analyticsQueue.add(
          'track-event',
          {
            type: type as any,
            data,
            timestamp: Date.now(),
            userId,
            sessionId,
          },
          { priority: 3 }
        )

        return reply.status(202).send({
          success: true,
          eventId: job.id as string,
          type,
        })
      } catch (error) {
        throw error
      }
    }
  )

  fastify.get('/metrics', async () => {
    try {
      const allMetrics = await metrics.getMetrics()
      const healthMetrics = await metrics.getHealthMetrics()

      return {
        metrics: allMetrics,
        health: healthMetrics,
        timestamp: Date.now(),
      }
    } catch (error) {
      throw error
    }
  })

  fastify.get('/metrics/health', async () => {
    try {
      const health = await metrics.getHealthMetrics()
      return health
    } catch (error) {
      throw error
    }
  })

  fastify.get('/dashboard', async () => {
    try {
      const feedbackStats = await cacheManager.get<any>('feedback:stats')
      const dailyStats = await cacheManager.get<any>('faucetx:stats:daily')
      const healthMetrics = await metrics.getHealthMetrics()
      const cacheStats = await cacheManager.getStats()

      return {
        feedback: feedbackStats || { total: 0, sentiments: {}, categories: {} },
        daily: dailyStats || { date: new Date().toISOString().slice(0, 10), totalOperations: 0, errors: 0 },
        queues: healthMetrics.queueDepth,
        errorRate: healthMetrics.errorRate,
        cache: cacheStats,
        timestamp: Date.now(),
      }
    } catch (error) {
      throw error
    }
  })
}

export { routes as analyticsRoutes }
