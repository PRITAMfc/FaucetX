const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions'

export interface FeedbackAnalysis {
  sentiment: string
  category: string
  response: string
}

export async function analyzeFeedback(
  feedback: string,
  walletAddress?: string
): Promise<FeedbackAnalysis> {
  const res = await fetch(MISTRAL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'mistral-small-latest',
      messages: [
        {
          role: 'system',
          content: `You are FaucetX support assistant. Analyze user feedback about a Stellar testnet faucet dApp. 
Return a JSON object with exactly these fields:
- "sentiment": one of "positive", "negative", "neutral"
- "category": one of "bug", "feature_request", "ux", "general", "praise"
- "response": a friendly 1-2 sentence acknowledgment thanking the user or addressing their concern

Be concise and helpful. Only return valid JSON.`,
        },
        {
          role: 'user',
          content: `User${walletAddress ? ` (${walletAddress.slice(0, 8)}...)` : ''} feedback: "${feedback}"`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Mistral API error: ${res.status} - ${err}`)
  }

  const data = await res.json()
  const content = data.choices[0]?.message?.content

  try {
    return JSON.parse(content)
  } catch {
    return {
      sentiment: 'neutral',
      category: 'general',
      response: 'Thank you for your feedback!',
    }
  }
}
