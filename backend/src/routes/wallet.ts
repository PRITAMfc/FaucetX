import { FastifyPluginAsync } from 'fastify'
import {
  getBalance,
  fundWallet,
  getContractInfo,
  getContractEvents,
  getTransaction,
} from '../utils/wallet.js'
import { FaucetProcessor } from '../queues/processors/faucet.processor.js'
import { lockManager, cacheManager, metrics } from '../queues/index.js'

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: { address: string } }>('/balance/:address', async (request, reply) => {
    try {
      const { address } = request.params
      if (!address || address.length < 56) {
        return reply.status(400).send({ error: 'Invalid Stellar address' })
      }

      const cacheKey = `balance:${address}`
      let balanceInfo = await cacheManager.get<any>(cacheKey)

      if (!balanceInfo) {
        balanceInfo = await getBalance(address)
        await cacheManager.set(cacheKey, balanceInfo, 120)
      }

      return balanceInfo
    } catch (error: any) {
      if (error.response?.status === 404) {
        return {
          address: request.params.address,
          balance: '0',
          sequence: '0',
          subentryCount: 0,
          isNew: true,
        }
      }
      throw error
    }
  })

  fastify.post<{ Body: { address: string; amount?: number; memo?: string; userId?: string; sessionId?: string } }>(
    '/fund',
    async (request, reply) => {
      try {
        const schema = fastify.withTypeProvider().typeProvider
        const { address, amount = 10, memo, userId, sessionId } = request.body as {
          address: string
          amount?: number
          memo?: string
          userId?: string
          sessionId?: string
        }

        const lockKey = `fund:${address}`
        const lock = await lockManager.acquire(lockKey, 30000)

        if (!lock) {
          await metrics.incrementCounter('rate.limited', { endpoint: '/fund', reason: 'lock_contention' })
          return reply.status(429).send({
            error: 'Rate limited',
            message: 'This wallet is already being processed. Please wait.',
            retryAfter: 30,
          })
        }

        try {
          const faucetProcessor = new FaucetProcessor()
          const job = await faucetProcessor.addJob(
            {
              address,
              amount,
              memo,
              userId,
              sessionId,
              priority: 'high',
            },
            { priority: 8 }
          )

          const result = await job.finished()

          return reply.status(202).send({
            success: true,
            jobId: job.id,
            address,
            status: 'queued',
            result,
          })
        } finally {
          await lockManager.release(lock)
        }
      } catch (error) {
        throw error
      }
    }
  )

  fastify.get<{ Params: { contractId: string } }>('/contract/:contractId', async (request) => {
    const { contractId } = request.params
    return getContractInfo(contractId)
  })

  fastify.get<{ Params: { contractId: string }; Querystring: { limit?: string } }>(
    '/contract/:contractId/events',
    async (request) => {
      const { contractId } = request.params
      const limit = parseInt(request.query.limit || '10')
      return getContractEvents(contractId, limit)
    }
  )

  fastify.get<{ Params: { hash: string } }>('/tx/:hash', async (request, reply) => {
    try {
      const { hash } = request.params
      return await getTransaction(hash)
    } catch (error) {
      return reply.status(404).send({ error: 'Transaction not found' })
    }
  })

  fastify.get('/jobs/:jobId', async (request, reply) => {
    try {
      const { jobId } = request.params as { jobId: string }
      const job = await faucetQueue.getJob(jobId)

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

export { routes as walletRoutes }
