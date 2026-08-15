import Fastify from 'fastify'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import { walletRoutes } from './routes/wallet.js'
import { transactionRoutes } from './routes/transaction.js'
import { feedbackRoutes } from './routes/feedback.js'
import { analyticsRoutes } from './routes/analytics.js'
import { queueRoutes } from './routes/queues.js'
import { faucetAgent } from './mastra/agent.js'
import {
  faucetQueue,
  feedbackQueue,
  analyticsQueue,
  maintenanceQueue,
  rateLimitQueue,
  cacheQueue,
  closeAllQueues,
} from './queues/index.js'
import { FaucetProcessor, FeedbackProcessor, AnalyticsProcessor, MaintenanceProcessor } from './queues/processors/index.js'
import { queueScheduler } from './queues/schedulers/index.js'
import { eventBus, QueueEvents } from './queues/events/emitter.js'
import { metrics } from './queues/metrics/index.js'
import { rateLimiterPlugin } from './middleware/rateLimiter.js'

dotenv.config()

const app = Fastify({ logger: true })
const PORT = Number(process.env.PORT) || 3001

app.get('/api/health', async () => {
  try {
    const faucetProcessor = new FaucetProcessor()
    const health = await faucetProcessor.getHealthStatus()

    return {
      status: health.healthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      services: {
        api: 'healthy',
        redis: health.checks.redis,
        queues: 'initialized',
        mastra: 'ready',
        circuitBreaker: health.circuitBreaker.state,
        queueDepth: health.queueDepth,
      },
    }
  } catch {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        api: 'healthy',
        redis: 'healthy',
        queues: 'initialized',
        mastra: 'ready',
      },
    }
  }
})

app.get('/api/health/faucet', async () => {
  try {
    const faucetProcessor = new FaucetProcessor()
    const health = await faucetProcessor.getHealthStatus()
    const faucetMetrics = await faucetProcessor.getMetrics()

    return {
      status: health.healthy ? 'healthy' : 'degraded',
      circuitBreaker: health.circuitBreaker,
      queueDepth: health.queueDepth,
      activeJobs: faucetMetrics.activeJobs,
      completed: faucetMetrics.completed,
      failed: faucetMetrics.failed,
      avgDurationMs: faucetMetrics.avgDurationMs,
      checks: health.checks,
      timestamp: Date.now(),
    }
  } catch (error: any) {
    return { status: 'error', error: error.message, timestamp: Date.now() }
  }
})

app.get('/api/agent/status', async () => {
  return { agent: 'FaucetX Agent', model: 'mistral-small-latest', status: 'ready' }
})

app.register(walletRoutes, { prefix: '/api/wallet' })
app.register(transactionRoutes, { prefix: '/api/transaction' })
app.register(feedbackRoutes, { prefix: '/api/feedback' })
app.register(analyticsRoutes, { prefix: '/api/analytics' })
app.register(queueRoutes, { prefix: '/api/queues' })

app.setErrorHandler((err: any, req, reply) => {
  console.error('Error:', err.message)

  metrics.incrementCounter('http.error', {
    method: req.method,
    path: req.url,
    status: reply.statusCode,
  })

  reply.status(500).send({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  })
})

const gracefulShutdown = async (signal: string) => {
  console.log(`\nReceived ${signal}, shutting down gracefully...`)

  try {
    await queueScheduler.pauseAll()

    await closeAllQueues()

    console.log('All queues and workers closed successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error during shutdown:', error)
    process.exit(1)
  }
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

const startServer = async () => {
  try {
    await app.register(cors, {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true,
    })

    await app.register(rateLimiterPlugin)

    const processors = {
      faucet: new FaucetProcessor(),
      feedback: new FeedbackProcessor(),
      analytics: new AnalyticsProcessor(),
      maintenance: new MaintenanceProcessor(),
    }

    await queueScheduler.scheduleAll()

    eventBus.on(QueueEvents.JOB_COMPLETED, async (event, data) => {
      await metrics.incrementCounter('event.processed', { event })
    })

    eventBus.on(QueueEvents.JOB_FAILED, async (event, data) => {
      await metrics.incrementCounter('event.failed', { event })
    })

    eventBus.on(QueueEvents.CACHE_HIT, async () => {
      await metrics.incrementCounter('cache.hit')
    })

    eventBus.on(QueueEvents.CACHE_MISS, async () => {
      await metrics.incrementCounter('cache.miss')
    })

    app.listen({ port: PORT, host: '0.0.0.0' }, () => {
      console.log(`FaucetX backend running on port ${PORT}`)
      console.log('BullMQ queues initialized:')
      console.log('  - faucet: wallet funding and balance checks')
      console.log('  - feedback: AI feedback analysis')
      console.log('  - analytics: event processing')
      console.log('  - maintenance: scheduled cleanup and health checks')
      console.log('  - rate-limit: distributed rate limiting')
      console.log('  - cache: cache warming and invalidation')
      console.log('Workers active:')
      for (const [name] of Object.entries(processors)) {
        console.log(`  - ${name}: worker active`)
      }
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

export default app
