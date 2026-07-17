import { Router } from 'express'
import { z } from 'zod'
import { redis } from '../utils/redis.js'
import { analyzeFeedback } from '../utils/mistral.js'

const router = Router()

const feedbackSchema = z.object({
  feedback: z.string().min(1).max(2000),
  walletAddress: z.string().optional(),
})

router.post('/', async (req, res, next) => {
  try {
    const { feedback, walletAddress } = feedbackSchema.parse(req.body)

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

    res.json({
      success: true,
      id: entry.id,
      aiResponse: analysis.response,
      sentiment: analysis.sentiment,
      category: analysis.category,
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: err.errors })
    }
    next(err)
  }
})

router.get('/', async (_req, res, next) => {
  try {
    const items = await redis.lrange('faucetx:feedback', 0, 49)
    const count = await redis.get('faucetx:feedback:count') || 0

    res.json({
      count,
      feedback: items.map((item) => JSON.parse(item as string)),
    })
  } catch (err) {
    next(err)
  }
})

router.get('/stats', async (_req, res, next) => {
  try {
    const items = await redis.lrange('faucetx:feedback', 0, -1)
    const entries = items.map((item) => JSON.parse(item as string))

    const sentimentCounts = entries.reduce(
      (acc, e) => {
        acc[e.sentiment] = (acc[e.sentiment] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const categoryCounts = entries.reduce(
      (acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    res.json({
      total: entries.length,
      sentiments: sentimentCounts,
      categories: categoryCounts,
    })
  } catch (err) {
    next(err)
  }
})

export { router as feedbackRoutes }
