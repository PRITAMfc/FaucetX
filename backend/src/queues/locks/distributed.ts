import { createRedisConnection } from '../redis.js'

type LockHandle = {
  key: string
  owner: string
  expiresAt: number
  released: boolean
}

const REDIS_LOCK_PREFIX = 'faucetx:lock:'
const LOCK_TTL_SECONDS = 30
const LOCK_EXTEND_INTERVAL_MS = 10000

export class DistributedLockManager {
  private redis: ReturnType<typeof createRedisConnection>
  private activeLocks: Map<string, NodeJS.Timeout> = new Map()

  constructor() {
    this.redis = createRedisConnection()
  }

  async acquire(key: string, ttlMs: number = LOCK_TTL_SECONDS * 1000, owner?: string): Promise<LockHandle | null> {
    const lockKey = `${REDIS_LOCK_PREFIX}${key}`
    const lockOwner = owner || `node-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const expiresAt = Date.now() + ttlMs

    try {
      const result = await this.redis.set(lockKey, lockOwner, 'PX', ttlMs, 'NX')

      if (result === 'OK') {
        const handle: LockHandle = {
          key,
          owner: lockOwner,
          expiresAt,
          released: false,
        }

        const extendInterval = setInterval(async () => {
          if (handle.released) {
            clearInterval(extendInterval)
            this.activeLocks.delete(key)
            return
          }

          try {
            const currentOwner = await this.redis.get(lockKey)
            if (currentOwner === lockOwner) {
              await this.redis.pexpire(lockKey, ttlMs)
              handle.expiresAt = Date.now() + ttlMs
            } else {
              clearInterval(extendInterval)
              this.activeLocks.delete(key)
            }
          } catch {
            clearInterval(extendInterval)
            this.activeLocks.delete(key)
          }
        }, LOCK_EXTEND_INTERVAL_MS)

        this.activeLocks.set(key, extendInterval)
        return handle
      }

      return null
    } catch (error) {
      console.error(`Failed to acquire lock ${key}:`, error)
      return null
    }
  }

  async release(handle: LockHandle): Promise<boolean> {
    if (handle.released) return true

    handle.released = true

    const lockKey = `${REDIS_LOCK_PREFIX}${handle.key}`
    const interval = this.activeLocks.get(handle.key)

    if (interval) {
      clearInterval(interval)
      this.activeLocks.delete(handle.key)
    }

    try {
      const currentOwner = await this.redis.get(lockKey)

      if (currentOwner === handle.owner) {
        const result = await this.redis.del(lockKey)
        return result === 1
      }

      return false
    } catch (error) {
      console.error(`Failed to release lock ${handle.key}:`, error)
      return false
    }
  }

  async extend(handle: LockHandle, additionalMs: number): Promise<boolean> {
    if (handle.released) return false

    const lockKey = `${REDIS_LOCK_PREFIX}${handle.key}`
    const newTtl = additionalMs + LOCK_TTL_SECONDS * 1000

    try {
      const currentOwner = await this.redis.get(lockKey)

      if (currentOwner === handle.owner) {
        const result = await this.redis.pexpire(lockKey, newTtl)
        handle.expiresAt = Date.now() + newTtl
        return result === 1
      }

      return false
    } catch (error) {
      console.error(`Failed to extend lock ${handle.key}:`, error)
      return false
    }
  }

  async isLocked(key: string): Promise<boolean> {
    const lockKey = `${REDIS_LOCK_PREFIX}${key}`
    try {
      const result = await this.redis.exists(lockKey)
      return result === 1
    } catch {
      return false
    }
  }

  async getLockOwner(key: string): Promise<string | null> {
    const lockKey = `${REDIS_LOCK_PREFIX}${key}`
    try {
      return await this.redis.get(lockKey)
    } catch {
      return null
    }
  }

  async forceRelease(key: string): Promise<boolean> {
    const lockKey = `${REDIS_LOCK_PREFIX}${key}`
    const interval = this.activeLocks.get(key)

    if (interval) {
      clearInterval(interval)
      this.activeLocks.delete(key)
    }

    try {
      const result = await this.redis.del(lockKey)
      return result === 1
    } catch {
      return false
    }
  }

  async withLock<T>(
    key: string,
    fn: () => Promise<T>,
    options?: { ttlMs?: number; retries?: number; retryDelayMs?: number }
  ): Promise<T> {
    const ttlMs = options?.ttlMs || LOCK_TTL_SECONDS * 1000
    const retries = options?.retries || 3
    const retryDelayMs = options?.retryDelayMs || 500

    for (let attempt = 0; attempt < retries; attempt++) {
      const handle = await this.acquire(key, ttlMs)

      if (handle) {
        try {
          return await fn()
        } finally {
          await this.release(handle)
        }
      }

      if (attempt < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs))
      }
    }

    throw new Error(`Failed to acquire lock ${key} after ${retries} attempts`)
  }
}

export const lockManager = new DistributedLockManager()
