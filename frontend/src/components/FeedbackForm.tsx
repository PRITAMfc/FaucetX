import { useState } from 'react'
import { useWallet } from '@/hooks/useWallet'
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
    } catch {
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
      <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-purple-500/20">
            <MessageSquare className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-sm font-semibold text-white">Feedback</span>
          <span className="text-[10px] text-slate-500 ml-auto">Powered by Mistral AI</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            placeholder="Share your experience with FaucetX..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={2}
            className="bg-white/5 border-white/10 focus:border-purple-500/50 resize-none text-sm"
          />
          <Button
            type="submit"
            variant="stellar"
            size="sm"
            disabled={loading || !feedback.trim()}
            className="w-full"
          >
            {loading ? (
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                Submit
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
              className="mt-3 space-y-2"
            >
              <div className="flex gap-1.5">
                <Badge className={`${sentimentColor(result.sentiment)} text-[10px]`}>{result.sentiment}</Badge>
                <Badge variant="outline" className="text-[10px]">{result.category}</Badge>
              </div>
              <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-3 h-3 text-purple-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-purple-200">{result.aiResponse}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
