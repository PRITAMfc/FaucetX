import { FastifyPluginAsync } from 'fastify'
import {
  faucetQueue,
  feedbackQueue,
  analyticsQueue,
  maintenanceQueue,
  cacheQueue,
} from '../queues/queues.js'
import { FaucetProcessor, FeedbackProcessor, AnalyticsProcessor, MaintenanceProcessor } from '../queues/processors/index.js'
import { queueScheduler } from '../queues/schedulers/index.js'
import { metrics, eventBus, QueueEvents } from '../queues/index.js'
import { cacheManager, lockManager } from '../queues/index.js'

const routes: FastifyPluginAsync = async (fastify) => {
  const queues = {
    faucet: faucetQueue,
    feedback: feedbackQueue,
    analytics: analyticsQueue,
    maintenance: maintenanceQueue,
    cache: cacheQueue,
  }

  fastify.get('/queues', async () => {
    const queueInfo: Record<string, any> = {}

    for (const [name, queue] of Object.entries(queues)) {
      const counts = await queue.getJobCounts()
      queueInfo[name] = {
        waiting: counts.waiting,
        active: counts.active,
        completed: counts.completed,
        failed: counts.failed,
        delayed: counts.delayed,
      }
    }

    return {
      queues: queueInfo,
      timestamp: Date.now(),
    }
  })

  fastify.get('/queues/:queueName', async (request, reply) => {
    try {
      const { queueName } = request.params as { queueName: string }

      if (!queues[queueName as keyof typeof queues]) {
        return reply.status(404).send({ error: 'Queue not found', availableQueues: Object.keys(queues) })
      }

      const queue = queues[queueName as keyof typeof queues]
      const counts = await queue.getJobCounts()

      const jobs = await queue.getJobs(['waiting', 'active', 'completed', 'failed', 'delayed'], 0, 50)

      return {
        name: queueName,
        counts,
        jobs: jobs.map((job) => ({
          id: job.id,
          name: job.name,
          data: job.data,
          state: job.state,
          progress: job.progress,
          attemptsMade: job.attemptsMade,
          timestamp: job.timestamp,
          processedOn: job.processedOn,
          finishedOn: job.finishedOn,
          failedReason: job.failedReason,
        })),
      }
    } catch (error) {
      throw error
    }
  })

  fastify.post('/queues/:queueName/pause', async (request, reply) => {
    try {
      const { queueName } = request.params as { queueName: string }

      if (!queues[queueName as keyof typeof queues]) {
        return reply.status(404).send({ error: 'Queue not found' })
      }

      await queues[queueName as keyof typeof queues].pause()
      eventBus.emit('queue:paused', { queue: queueName })

      return { success: true, queue: queueName, status: 'paused' }
    } catch (error) {
      throw error
    }
  })

  fastify.post('/queues/:queueName/resume', async (request, reply) => {
    try {
      const { queueName } = request.params as { queueName: string }

      if (!queues[queueName as keyof typeof queues]) {
        return reply.status(404).send({ error: 'Queue not found' })
      }

      await queues[queueName as keyof typeof queues].resume()
      eventBus.emit('queue:resumed', { queue: queueName })

      return { success: true, queue: queueName, status: 'resumed' }
    } catch (error) {
      throw error
    }
  })

  fastify.post('/queues/:queueName/clean', async (request, reply) => {
    try {
      const { queueName } = request.params as { queueName: string }

      if (!queues[queueName as keyof typeof queues]) {
        return reply.status(404).send({ error: 'Queue not found' })
      }

      const queue = queues[queueName as keyof typeof queues]
      await queue.clean(0, 'completed')
      await queue.clean(0, 'failed')

      return { success: true, queue: queueName, status: 'cleaned' }
    } catch (error) {
      throw error
    }
  })

  fastify.get('/workers', async () => {
    return {
      workers: [
        { name: 'faucet', status: 'active', processor: 'FaucetProcessor' },
        { name: 'feedback', status: 'active', processor: 'FeedbackProcessor' },
        { name: 'analytics', status: 'active', processor: 'AnalyticsProcessor' },
        { name: 'maintenance', status: 'active', processor: 'MaintenanceProcessor' },
      ],
      timestamp: Date.now(),
    }
  })

  fastify.get('/scheduled', async () => {
    try {
      const scheduled = await queueScheduler.getScheduledJobs()
      return { scheduled, count: scheduled.length }
    } catch (error) {
      throw error
    }
  })

  fastify.post('/scheduled/pause', async () => {
    await queueScheduler.pauseAll()
    return { success: true, status: 'paused' }
  })

  fastify.post('/scheduled/resume', async () => {
    await queueScheduler.resumeAll()
    return { success: true, status: 'resumed' }
  })

  fastify.get('/events', async () => {
    const eventCounts: Record<string, number> = {}

    for (const event of Object.values(QueueEvents)) {
      eventCounts[event] = eventBus.listenerCount(event)
    }

    return {
      events: eventCounts,
      timestamp: Date.now(),
    }
  })

  fastify.get('/locks', async () => {
    try {
      const lockKeys = await cacheManager.scanKeys('faucetx:lock:*')
      const locks = []

      for (const key of lockKeys) {
        const lockKey = key.replace('faucetx:lock:', '')
        const owner = await lockManager.getLockOwner(lockKey)
        const ttl = await cacheManager.getTtl(key)

        locks.push({
          key: lockKey,
          owner,
          ttl,
        })
      }

      return { locks, count: locks.length }
    } catch (error) {
      throw error
    }
  })
}

export { routes as queueRoutes }
