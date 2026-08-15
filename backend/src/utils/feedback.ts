import { redis } from './redis.js'
import { analyzeFeedback } from './mistral.js'

export const submitFeedback = async (feedback: string, walletAddress?: string) => {
  const analysis = await analyzeFeedback(feedback, walletAddress)

  const entry = {
    id: crypto.randomUUID(),
    feedback,
    walletAddress: walletAddress || 'anonymous',
    sentiment: analysis.sentiment,
    category: analysis.category,
    aiResponse: analysis.response,
    createdAt: new Date().toISOString(),
  }

  await redis.lpush('faucetx:feedback', JSON.stringify(entry))
  await redis.incr('faucetx:feedback:count')

  return {
    success: true,
    id: entry.id,
    aiResponse: analysis.response,
    sentiment: analysis.sentiment,
    category: analysis.category,
  }
}

export const getFeedback = async (limit = 50) => {
  const items = await redis.lrange('faucetx:feedback', 0, limit - 1)
  const count = await redis.get('faucetx:feedback:count') || 0

  return {
    count: Number(count),
    feedback: items.map((item: string) => JSON.parse(item)),
  }
}

export const getFeedbackStats = async () => {
  const items = await redis.lrange('faucetx:feedback', 0, -1)
  const entries = items.map((item: string) => JSON.parse(item))

  const sentimentCounts = entries.reduce(
    (acc: Record<string, number>, e: any) => {
      acc[e.sentiment] = (acc[e.sentiment] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const categoryCounts = entries.reduce(
    (acc: Record<string, number>, e: any) => {
      acc[e.category] = (acc[e.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return {
    total: entries.length,
    sentiments: sentimentCounts,
    categories: categoryCounts,
  }
}
