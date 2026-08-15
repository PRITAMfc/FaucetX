declare module '../utils/redis.js' {
  export const redis: import('@upstash/redis').Redis
}

declare module '../utils/mistral.js' {
  export interface FeedbackAnalysis {
    sentiment: string
    category: string
    response: string
  }

  export function analyzeFeedback(feedback: string, walletAddress?: string): Promise<FeedbackAnalysis>
}
