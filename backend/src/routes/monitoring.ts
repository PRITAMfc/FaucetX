import { FastifyPluginAsync } from 'fastify'
import os from 'os'
import { metrics, cacheManager } from '../queues/index.js'
import { FaucetProcessor } from '../queues/processors/index.js'

const PROCESS_START = Date.now()

function processStats() {
  const mem = process.memoryUsage()
  const cpu = process.cpuUsage()
  return {
    pid: process.pid,
    uptimeSec: Math.round((Date.now() - PROCESS_START) / 1000),
    uptimeHuman: formatUptime((Date.now() - PROCESS_START) / 1000),
    memory: {
      rssMb: toMb(mem.rss),
      heapUsedMb: toMb(mem.heapUsed),
      heapTotalMb: toMb(mem.heapTotal),
      externalMb: toMb(mem.external),
    },
    cpu: {
      userMs: Math.round(cpu.user / 1000),
      systemMs: Math.round(cpu.system / 1000),
      loadAvg1m: Number(os.loadavg()[0].toFixed(2)),
    },
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  }
}

function toMb(bytes: number): number {
  return Math.round((bytes / 1024 / 1024) * 100) / 100
}

function formatUptime(sec: number): string {
  const d = Math.floor(sec / 86400)
  const h = Math.floor((sec % 86400) / 3600)
  const m = Math.floor((sec % 3600) / 60)
  return `${d}d ${h}h ${m}m`
}

function sanitizeMetricName(name: string): string {
  return name.replace(/\./g, '_').replace(/[^a-zA-Z0-9_:]/g, '_')
}

function splitNameTags(name: string): { base: string; tags: [string, string][] } {
  const braceIdx = name.indexOf('{')
  if (braceIdx === -1) return { base: sanitizeMetricName(name), tags: [] }

  const base = sanitizeMetricName(name.slice(0, braceIdx))
  const tags: [string, string][] = []
  for (const pair of name.slice(braceIdx + 1, name.lastIndexOf('}')).split(',')) {
    const eq = pair.indexOf('=')
    if (eq > 0) tags.push([sanitizeMetricName(pair.slice(0, eq).trim()), pair.slice(eq + 1).trim()])
  }
  return { base, tags }
}

function escapeLabelValue(v: string): string {
  return v.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')
}

function renderSeries(base: string, tags: [string, string][], value: number | string): string {
  const labels = tags
    .map(([k, v]) => `${k}="${escapeLabelValue(v)}"`)
    .join(',')
  return `faucetx_${base}${labels ? `{${labels}}` : ''} ${value}`
}

function toPrometheus(allMetrics: Record<string, any>, proc: ReturnType<typeof processStats>): string {
  const lines: string[] = []

  for (const [name, data] of Object.entries(allMetrics)) {
    if (!data || typeof data !== 'object') continue
    const { base, tags } = splitNameTags(name)

    if (data.type === 'counter') {
      lines.push(`# TYPE faucetx_${base} counter`)
      lines.push(renderSeries(base, tags, data.count))
    } else if (data.type === 'gauge') {
      lines.push(`# TYPE faucetx_${base} gauge`)
      lines.push(renderSeries(base, tags, data.value))
    } else if (data.type === 'timing') {
      lines.push(`# TYPE faucetx_${base}_avg_ms gauge`)
      lines.push(`# TYPE faucetx_${base}_p95_ms gauge`)
      lines.push(`# TYPE faucetx_${base}_p99_ms gauge`)
      lines.push(renderSeries(`${base}_avg_ms`, tags, data.avgMs))
      lines.push(renderSeries(`${base}_p95_ms`, tags, data.p95Ms))
      lines.push(renderSeries(`${base}_p99_ms`, tags, data.p99Ms))
    }
  }

  lines.push('# TYPE faucetx_process_uptime_seconds gauge')
  lines.push(`faucetx_process_uptime_seconds ${proc.uptimeSec}`)
  lines.push('# TYPE faucetx_process_memory_rss_mb gauge')
  lines.push(`faucetx_process_memory_rss_mb ${proc.memory.rssMb}`)
  lines.push('# TYPE faucetx_process_memory_heap_used_mb gauge')
  lines.push(`faucetx_process_memory_heap_used_mb ${proc.memory.heapUsedMb}`)

  return lines.join('\n') + '\n'
}

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async () => {
    try {
      const [httpMetrics, healthMetrics, cacheStats] = await Promise.all([
        metrics.getMetrics('http'),
        metrics.getHealthMetrics(),
        cacheManager.getStats(),
      ])

      let services: Record<string, any> = {}
      try {
        const faucetProcessor = new FaucetProcessor()
        const health = await faucetProcessor.getHealthStatus()
        services = {
          redis: health.checks.redis ?? 'unknown',
          circuitBreaker: health.circuitBreaker.state,
          queueDepth: health.queueDepth,
        }
      } catch {
        services = { status: 'unavailable' }
      }

      return {
        status: 'ok',
        process: processStats(),
        http: httpMetrics,
        queues: healthMetrics,
        cache: cacheStats,
        services,
        timestamp: Date.now(),
      }
    } catch (error: any) {
      throw Object.assign(new Error(error.message), { statusCode: 500 })
    }
  })

  fastify.get('/process', async () => processStats())

  fastify.get('/http', async () => {
    const httpMetrics = await metrics.getMetrics('http')
    return { http: httpMetrics, timestamp: Date.now() }
  })

  fastify.get('/prometheus', async (_request, reply) => {
    const allMetrics = await metrics.getMetrics()
    reply.type('text/plain; version=0.0.4; charset=utf-8')
    return toPrometheus(allMetrics, processStats())
  })
}

export { routes as monitoringRoutes }
