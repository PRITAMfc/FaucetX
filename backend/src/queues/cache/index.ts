import { createRedisConnection } from '../redis.js'
import { CacheJobData } from '../types.js'

const CACHE_PREFIX = 'faucetx:cache:'

export class CacheManager {
  private redis: ReturnType<typeof createRedisConnection>

  constructor() {
    this.redis = createRedisConnection()
  }

  private getKey(key: string): string {
    return `${CACHE_PREFIX}${key}`
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.redis.get(this.getKey(key))

      if (!data) return null

      return JSON.parse(data) as T
    } catch (error) {
      console.error(`Cache get error for key ${key}:`, error)
      return null
    }
  }

  async set<T>(key: string, value: T, ttlSeconds: number = 300): Promise<boolean> {
    try {
      const serialized = JSON.stringify(value)
      const result = await this.redis.setex(this.getKey(key), ttlSeconds, serialized)
      return result === 'OK'
    } catch (error) {
      console.error(`Cache set error for key ${key}:`, error)
      return false
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      const result = await this.redis.del(this.getKey(key))
      return result === 1
    } catch (error) {
      console.error(`Cache del error for key ${key}:`, error)
      return false
    }
  }

  async invalidate(pattern: string): Promise<number> {
    try {
      const keys = await this.redis.keys(this.getKey(pattern))

      if (keys.length === 0) return 0

      const result = await this.redis.del(...keys)
      return result
    } catch (error) {
      console.error(`Cache invalidate error for pattern ${pattern}:`, error)
      return 0
    }
  }

  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttlSeconds: number = 300
  ): Promise<T> {
    const cached = await this.get<T>(key)

    if (cached !== null) {
      return cached
    }

    const value = await factory()
    await this.set(key, value, ttlSeconds)

    return value
  }

  async warmUp(items: Array<{ key: string; value: any; ttl?: number }>): Promise<void> {
    const pipeline = this.redis.pipeline()

    for (const item of items) {
      const key = this.getKey(item.key)
      const ttl = item.ttl || 300
      pipeline.setex(key, ttl, JSON.stringify(item.value))
    }

    await pipeline.exec()
  }

  async getStats(): Promise<{ totalKeys: number; hitRate: number; memoryBytes: number }> {
    try {
      const keys = await this.redis.keys(`${CACHE_PREFIX}*`)
      const info = await this.redis.info('memory')
      const memoryMatch = info.match(/used_memory:(\d+)/)

      return {
        totalKeys: keys.length,
        hitRate: 0,
        memoryBytes: memoryMatch ? parseInt(memoryMatch[1]) : 0,
      }
    } catch {
      return { totalKeys: 0, hitRate: 0, memoryBytes: 0 }
    }
  }

  async scanKeys(pattern: string): Promise<string[]> {
    try {
      return await this.redis.keys(pattern)
    } catch {
      return []
    }
  }

  async getTtl(key: string): Promise<number> {
    try {
      return await this.redis.ttl(key)
    } catch {
      return -1
    }
  }

  async deleteKeys(keys: string[]): Promise<number> {
    if (keys.length === 0) return 0
    try {
      return await this.redis.del(...keys)
    } catch {
      return 0
    }
  }

  getRedisClient() {
    return this.redis
  }
}

export const cacheManager = new CacheManager()
