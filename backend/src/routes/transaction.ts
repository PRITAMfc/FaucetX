import { FastifyPluginAsync } from 'fastify'
import { validateTransaction, getNetworkInfo } from '../utils/transaction.js'

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: unknown }>('/validate', async (request, reply) => {
    try {
      const result = validateTransaction(request.body)
      if (!result.valid) {
        return reply.status(400).send({
          valid: false,
          errors: result.errors,
        })
      }
      return { valid: true, data: result.data }
    } catch (error) {
      throw error
    }
  })

  fastify.get('/network', async () => {
    return getNetworkInfo()
  })
}

export { routes as transactionRoutes }
