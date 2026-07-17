import { useState } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Send, Sparkles } from 'reicon-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

interface FeedbackResult {
  id: string
  aiResponse: string
  sentiment: string
  category: string
}

export function FeedbackForm() {
  const { address } = useWallet()
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<FeedbackResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!feedback.trim()) return

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feedback: feedback.trim(),
          walletAddress: address,
        }),
      })

      if (!res.ok) throw new Error('Failed to submit feedback')

      const data = await res.json()
      setResult(data)
      setFeedback('')
      toast.success('Feedback submitted!')
    } catch (err) {
      toast.error('Failed to submit feedback')
    }
    setLoading(false)
  }

  const sentimentColor = (s: string) => {
    switch (s) {
      case 'positive': return 'bg-emerald-500/20 text-emerald-400'
      case 'negative': return 'bg-red-500/20 text-red-400'
      default: return 'bg-slate-500/20 text-slate-400'
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="w-full">
      <Card className="stellar-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20">
              <MessageSquare className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Feedback</CardTitle>
              <CardDescription>Powered by Mistral AI</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Textarea
              placeholder="Share your experience with FaucetX..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
              className="bg-white/5 border-white/10 focus:border-purple-500/50 resize-none"
            />
            <Button
              type="submit"
              variant="stellar"
              disabled={loading || !feedback.trim()}
              className="w-full"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </span>
              )}
            </Button>
          </form>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <div className="flex gap-2">
                  <Badge className={sentimentColor(result.sentiment)}>
                    {result.sentiment}
                  </Badge>
                  <Badge variant="outline">{result.category}</Badge>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-purple-200">{result.aiResponse}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}
