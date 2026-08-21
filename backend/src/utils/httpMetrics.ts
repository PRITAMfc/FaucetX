import { FastifyInstance } from 'fastify'
import { metrics } from '../queues/index.js'

export async function registerHttpMonitoring(app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', async (request) => {
    ;(request as any)._monitorStart = process.hrtime.bigint()
    await metrics.incrementCounter('http.requests.total', { method: request.method })
  })

  app.addHook('onResponse', async (request, reply) => {
    const start = (request as any)._monitorStart as bigint | undefined
    const durationMs = start ? Number(process.hrtime.bigint() - start) / 1e6 : 0
    const route = request.routeOptions?.url || 'unmatched'

    await metrics.recordTiming(`http.latency{method=${request.method},route=${route}}`, Math.round(durationMs))
    await metrics.incrementCounter('http.responses.total', {
      method: request.method,
      status: String(reply.statusCode),
    })

    if (reply.statusCode >= 500) {
      await metrics.incrementCounter('http.errors.total', { method: request.method })
    }
  })
}
