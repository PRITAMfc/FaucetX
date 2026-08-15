// @ts-ignore
import { createTool } from '@mastra/core'
// @ts-ignore
import { z } from 'zod'
// @ts-ignore
import { submitFeedback } from '../utils/feedback.js'
// @ts-ignore
import { getFeedback } from '../utils/feedback.js'
// @ts-ignore
import { getFeedbackStats } from '../utils/feedback.js'

export const submitFeedbackTool = createTool({
  id: 'submit-feedback',
  description: 'Submit and analyze user feedback using Mistral AI',
  inputSchema: z.object({
    feedback: z.string().min(1).max(2000),
    walletAddress: z.string().optional(),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    id: z.string(),
    aiResponse: z.string(),
    sentiment: z.string(),
    category: z.string(),
  }),
  execute: async (context: any) => submitFeedback(context.input.feedback, context.input.walletAddress),
})

export const getFeedbackTool = createTool({
  id: 'get-feedback',
  description: 'Retrieve recent feedback entries',
  inputSchema: z.object({
    limit: z.number().optional(),
  }),
  outputSchema: z.object({
    count: z.number(),
    feedback: z.array(z.any()),
  }),
  execute: async (context: any) => getFeedback(context.input.limit),
})

export const getFeedbackStatsTool = createTool({
  id: 'get-feedback-stats',
  description: 'Get aggregated feedback statistics',
  inputSchema: z.object({}),
  outputSchema: z.object({
    total: z.number(),
    sentiments: z.record(z.number()),
    categories: z.record(z.number()),
  }),
  execute: async () => getFeedbackStats(),
})
