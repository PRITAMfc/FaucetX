import { createRedisConnection } from '../redis.js'

const METRICS_PREFIX = 'faucetx:metrics:'

export class MetricsCollector {
  private redis: ReturnType<typeof createRedisConnection>
  private metrics: Map<string, number> = new Map()

  constructor() {
    this.redis = createRedisConnection()
  }

  async incrementCounter(name: string, tags?: Record<string, string>): Promise<void> {
    const metricKey = this.buildKey(name, tags)
    await this.redis.incr(`${METRICS_PREFIX}counter:${metricKey}`)
    this.metrics.set(metricKey, (this.metrics.get(metricKey) || 0) + 1)
  }

  async recordTiming(name: string, durationMs: number, tags?: Record<string, string>): Promise<void> {
    const metricKey = this.buildKey(name, tags)
    const timingKey = `${METRICS_PREFIX}timing:${metricKey}`

    await this.redis.lpush(timingKey, durationMs.toString())
    await this.redis.ltrim(timingKey, 0, 999)
    await this.redis.expire(timingKey, 3600)
  }

  async recordGauge(name: string, value: number, tags?: Record<string, string>): Promise<void> {
    const metricKey = this.buildKey(name, tags)
    await this.redis.set(`${METRICS_PREFIX}gauge:${metricKey}`, value.toString())
  }

  async getMetrics(namespace?: string): Promise<Record<string, any>> {
    const pattern = `${METRICS_PREFIX}*`
    const keys = await this.redis.keys(pattern)

    const result: Record<string, any> = {}

    for (const key of keys) {
      const metricName = key.replace(METRICS_PREFIX, '')
      const type = metricName.split(':')[0]
      const name = metricName.slice(type.length + 1)

      if (namespace && !name.startsWith(namespace)) continue

      if (type === 'counter') {
        const count = await this.redis.get(key)
        result[name] = { type: 'counter', count: parseInt(count || '0') }
      } else if (type === 'timing') {
        const timings = await this.redis.lrange(key, 0, -1)
        const values = timings.map((t) => parseFloat(t))

        if (values.length > 0) {
          const sum = values.reduce((a, b) => a + b, 0)
          const avg = sum / values.length
          const sorted = [...values].sort((a, b) => a - b)
          const p50 = sorted[Math.floor(sorted.length * 0.5)]
          const p95 = sorted[Math.floor(sorted.length * 0.95)]
          const p99 = sorted[Math.floor(sorted.length * 0.99)]

          result[name] = {
            type: 'timing',
            count: values.length,
            avgMs: Math.round(avg * 100) / 100,
            p50Ms: p50,
            p95Ms: p95,
            p99Ms: p99,
            minMs: Math.min(...values),
            maxMs: Math.max(...values),
          }
        }
      } else if (type === 'gauge') {
        const value = await this.redis.get(key)
        result[name] = { type: 'gauge', value: parseFloat(value || '0') }
      }
    }

    return result
  }

  async getHealthMetrics(): Promise<{
    queueDepth: Record<string, number>
    errorRate: number
    throughputPerMin: number
    avgJobDuration: number
  }> {
    try {
      const queueNames = ['faucet', 'feedback', 'analytics', 'maintenance', 'rate-limit', 'cache']
      const queueDepth: Record<string, number> = {}

      for (const name of queueNames) {
        const key = `bull:${name}:waiting`
        const count = await this.redis.llen(key)
        queueDepth[name] = count
      }

      const errorKey = `${METRICS_PREFIX}counter:job.errors`
      const successKey = `${METRICS_PREFIX}counter:job.success`
      const errors = parseInt((await this.redis.get(errorKey)) || '0')
      const success = parseInt((await this.redis.get(successKey)) || '0')
      const total = errors + success

      return {
        queueDepth,
        errorRate: total > 0 ? errors / total : 0,
        throughputPerMin: 0,
        avgJobDuration: 0,
      }
    } catch {
      return { queueDepth: {}, errorRate: 0, throughputPerMin: 0, avgJobDuration: 0 }
    }
  }

  async resetMetrics(): Promise<void> {
    const keys = await this.redis.keys(`${METRICS_PREFIX}*`)

    if (keys.length > 0) {
      await this.redis.del(...keys)
    }

    this.metrics.clear()
  }

  private buildKey(name: string, tags?: Record<string, string>): string {
    if (!tags || Object.keys(tags).length === 0) {
      return name
    }

    const tagString = Object.entries(tags)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join(',')

    return `${name}{${tagString}}`
  }
}

export const metrics = new MetricsCollector()
