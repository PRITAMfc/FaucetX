export interface FaucetJobData {
  address: string
  amount?: number
  memo?: string
  userId?: string
  sessionId?: string
  priority?: 'low' | 'normal' | 'high' | 'critical'
  metadata?: Record<string, any>
  phases?: FaucetJobPhase[]
  version?: string
}

export type FaucetJobPhase = 'validation' | 'balance_check' | 'circuit_breaker_check' | 'funding' | 'verification' | 'updating_metrics' | 'finalizing' | 'initializing' | 'completed'

export type CircuitBreakerState = 'closed' | 'open' | 'half-open'

export interface FeedbackJobData {
  feedback: string
  walletAddress?: string
  sessionId?: string
  priority?: 'low' | 'normal' | 'high' | 'critical'
  metadata?: Record<string, any>
}

export interface AnalyticsJobData {
  type: 'balance_check' | 'funding' | 'feedback' | 'error' | 'custom'
  data: Record<string, any>
  timestamp?: number
  userId?: string
  sessionId?: string
}

export interface MaintenanceJobData {
  type: 'cleanup_feedback' | 'cleanup_sessions' | 'aggregate_stats' | 'health_check'
  params?: Record<string, any>
  priority?: 'low' | 'normal' | 'high' | 'critical'
}

export interface RateLimitJobData {
  key: string
  limit: number
  windowMs: number
  identifier?: string
}

export interface LockJobData {
  lockKey: string
  ttlMs: number
  owner: string
  metadata?: Record<string, any>
}

export interface CacheJobData {
  action: 'set' | 'get' | 'del' | 'invalidate' | 'warm'
  key: string
  value?: any
  ttlSeconds?: number
  pattern?: string
}

export interface JobResult<T = any> {
  success: boolean
  data?: T
  error?: string
  durationMs: number
  retries: number
  timestamp: number
}

export interface QueueMetrics {
  waiting: number
  active: number
  completed: number
  failed: number
  delayed: number
  avgDurationMs: number
  throughputPerMin: number
}

export type JobPriority = 'low' | 'normal' | 'high' | 'critical'
export type JobStatus = 'waiting' | 'active' | 'completed' | 'failed' | 'delayed'
