import Redis from 'ioredis'

export const createRedisConnection = (): Redis => {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN
  const redisUrl = process.env.UPSTASH_REDIS_URL

  if (redisUrl) {
    return new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times: number) => {
        const delay = Math.min(100 * Math.pow(2, times), 5000)
        return delay
      },
      keepAlive: true,
      connectTimeout: 10000,
      lazyConnect: true,
    } as any)
  }

  if (upstashUrl && upstashToken) {
    const host = upstashUrl.replace('https://', '').replace('http://', '')

    return new Redis({
      host,
      port: 6379,
      password: upstashToken,
      tls: {} as any,
      maxRetriesPerRequest: 3,
      retryStrategy: (times: number) => {
        const delay = Math.min(100 * Math.pow(2, times), 5000)
        return delay
      },
      keepAlive: true,
      connectTimeout: 10000,
      lazyConnect: true,
    } as any)
  }

  throw new Error('UPSTASH_REDIS_URL or (UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN) must be set')
}
