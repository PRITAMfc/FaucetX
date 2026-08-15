import { FastifyPluginAsync } from 'fastify'
import { createRedisConnection } from '../queues/redis.js'
import { metrics, eventBus, QueueEvents } from '../queues/index.js'

const RATE_LIMIT_PREFIX = 'faucetx:ratelimit:'
const WINDOW_MS = 60000
const MAX_REQUESTS = 100

const rateLimiterPlugin: FastifyPluginAsync = async (fastify) => {
  const redis = createRedisConnection()

  fastify.addHook('onRequest', async (request, reply) => {
    const ip = request.ip
    const key = `${RATE_LIMIT_PREFIX}${ip}`

    try {
      const current = await redis.get(key)
      const count = current ? parseInt(current) : 0

      if (count >= MAX_REQUESTS) {
        await metrics.incrementCounter('rate_limit.exceeded', { ip, path: request.url })
        eventBus.emit(QueueEvents.RATE_LIMITED, { ip, path: request.url })

        return reply.status(429).send({
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: Math.ceil(WINDOW_MS / 1000),
        })
      }

      await redis.setex(key, Math.ceil(WINDOW_MS / 1000), String(count + 1))
    } catch (error) {
      console.error('Rate limiter error:', error)
    }
  })
}

export { rateLimiterPlugin }
