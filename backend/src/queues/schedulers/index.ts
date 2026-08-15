import { maintenanceQueue } from '../queues.js'
import { MaintenanceProcessor } from '../processors/maintenance.processor.js'
import { eventBus } from '../index.js'

export class QueueScheduler {
  private maintenanceProcessor: MaintenanceProcessor

  constructor() {
    this.maintenanceProcessor = new MaintenanceProcessor()
  }

  async scheduleAll(): Promise<void> {
    await this.maintenanceProcessor.scheduleRecurring('cleanup_feedback', '0 0 * * *')
    await this.maintenanceProcessor.scheduleRecurring('cleanup_sessions', '0 0 * * *')
    await this.maintenanceProcessor.scheduleRecurring('aggregate_stats', '*/5 * * * *')
    await this.maintenanceProcessor.scheduleRecurring('health_check', '*/10 * * * *')

    eventBus.emit('worker:ready', { component: 'scheduler', status: 'active' })
  }

  async scheduleCustom(job: {
    type: 'cleanup_feedback' | 'cleanup_sessions' | 'aggregate_stats' | 'health_check'
    cron: string
    params?: Record<string, any>
  }): Promise<void> {
    await this.maintenanceProcessor.scheduleRecurring(job.type, job.cron)
  }

  async getScheduledJobs(): Promise<any[]> {
    const jobs = await maintenanceQueue.getScheduled()

    return jobs.map((job: any) => ({
      id: job.id,
      name: job.name,
      data: job.data,
      opts: job.opts,
      timestamp: job.timestamp,
    }))
  }

  async pauseAll(): Promise<void> {
    await maintenanceQueue.pause()
    eventBus.emit('queue:paused', { queue: 'maintenance' })
  }

  async resumeAll(): Promise<void> {
    await maintenanceQueue.resume()
    eventBus.emit('queue:resumed', { queue: 'maintenance' })
  }
}

export const queueScheduler = new QueueScheduler()
