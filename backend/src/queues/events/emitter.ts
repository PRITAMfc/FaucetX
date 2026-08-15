type EventCallback = (event: string, data: any) => void

class EventEmitter {
  private listeners: Map<string, Set<EventCallback>> = new Map()

  on(event: string, callback: EventCallback): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }

    this.listeners.get(event)!.add(callback)

    return () => {
      this.listeners.get(event)?.delete(callback)
    }
  }

  emit(event: string, data: any): void {
    const callbacks = this.listeners.get(event)

    if (callbacks) {
      for (const callback of callbacks) {
        try {
          callback(event, data)
        } catch (error) {
          console.error(`Event listener error for ${event}:`, error)
        }
      }
    }
  }

  once(event: string, callback: EventCallback): () => void {
    const wrapper: EventCallback = (e, d) => {
      this.off(event, wrapper)
      callback(e, d)
    }

    this.on(event, wrapper)
    return () => this.off(event, wrapper)
  }

  off(event: string, callback: EventCallback): void {
    this.listeners.get(event)?.delete(callback)
  }

  removeAllListeners(event?: string): void {
    if (event) {
      this.listeners.delete(event)
    } else {
      this.listeners.clear()
    }
  }

  listenerCount(event: string): number {
    return this.listeners.get(event)?.size || 0
  }
}

export const eventBus = new EventEmitter()

export const QueueEvents = {
  JOB_COMPLETED: 'job:completed',
  JOB_FAILED: 'job:failed',
  JOB_RETRY: 'job:retry',
  JOB_STALLED: 'job:stalled',
  JOB_PROGRESS: 'job:progress',
  QUEUE_PAUSED: 'queue:paused',
  QUEUE_RESUMED: 'queue:resumed',
  WORKER_READY: 'worker:ready',
  WORKER_ERROR: 'worker:error',
  LOCK_ACQUIRED: 'lock:acquired',
  LOCK_RELEASED: 'lock:released',
  CACHE_HIT: 'cache:hit',
  CACHE_MISS: 'cache:miss',
  RATE_LIMITED: 'rate:limited',
  MAINTENANCE_STARTED: 'maintenance:started',
  MAINTENANCE_COMPLETED: 'maintenance:completed',
} as const
