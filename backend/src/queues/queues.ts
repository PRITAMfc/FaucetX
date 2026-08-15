import { Queue, Worker, JobType } from 'bullmq'
import { createRedisConnection } from './redis.js'
import { FaucetJobData, FeedbackJobData, AnalyticsJobData, MaintenanceJobData, RateLimitJobData, LockJobData, CacheJobData } from './types.js'

export const faucetQueue = new Queue<FaucetJobData>('faucet', {
  connection: createRedisConnection(),
  defaultJobOptions: {
    attempts: 5,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: {
      count: 1000,
      age: 24 * 3600,
    },
    removeOnFail: {
      count: 5000,
      age: 7 * 24 * 3600,
    },
  },
})

export const feedbackQueue = new Queue<FeedbackJobData>('feedback', {
  connection: createRedisConnection(),
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: {
      count: 500,
      age: 24 * 3600,
    },
    removeOnFail: {
      count: 1000,
      age: 7 * 24 * 3600,
    },
  },
})

export const analyticsQueue = new Queue<AnalyticsJobData>('analytics', {
  connection: createRedisConnection(),
  defaultJobOptions: {
    attempts: 2,
    backoff: {
      type: 'fixed',
      delay: 5000,
    },
    removeOnComplete: {
      count: 5000,
      age: 24 * 3600,
    },
    removeOnFail: {
      count: 1000,
      age: 24 * 3600,
    },
  },
})

export const maintenanceQueue = new Queue<MaintenanceJobData>('maintenance', {
  connection: createRedisConnection(),
  defaultJobOptions: {
    attempts: 1,
    removeOnComplete: {
      count: 100,
      age: 24 * 3600,
    },
    removeOnFail: {
      count: 100,
      age: 24 * 3600,
    },
  },
})

export const rateLimitQueue = new Queue<RateLimitJobData>('rate-limit', {
  connection: createRedisConnection(),
  defaultJobOptions: {
    attempts: 1,
    removeOnComplete: true,
    removeOnFail: true,
    delay: 0,
  },
})

export const lockQueue = new Queue<LockJobData>('distributed-locks', {
  connection: createRedisConnection(),
  defaultJobOptions: {
    attempts: 1,
    removeOnComplete: true,
    removeOnFail: true,
    delay: 0,
  },
})

export const cacheQueue = new Queue<CacheJobData>('cache', {
  connection: createRedisConnection(),
  defaultJobOptions: {
    attempts: 2,
    backoff: {
      type: 'fixed',
      delay: 1000,
    },
    removeOnComplete: {
      count: 2000,
      age: 24 * 3600,
    },
    removeOnFail: {
      count: 500,
      age: 24 * 3600,
    },
  },
})

export const workers: Worker[] = []

export const closeAllQueues = async (): Promise<void> => {
  await Promise.all([
    faucetQueue.close(),
    feedbackQueue.close(),
    analyticsQueue.close(),
    maintenanceQueue.close(),
    rateLimitQueue.close(),
    lockQueue.close(),
    cacheQueue.close(),
  ])
}

export const closeAllWorkers = async (): Promise<void> => {
  await Promise.all(workers.map((w) => w.close()))
}
