import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { useWallet } from '@/hooks/useWallet'
import { Send, AlertCircle, CheckCircle, ExternalLink } from 'reicon-react'
import { motion, AnimatePresence } from 'framer-motion'
import { transactionSchema } from '@shared/index'
import toast from 'react-hot-toast'

export function SendTransaction() {
  const {
    address,
    balance,
    isSending,
    lastTransaction,
    sendTransaction,
  } = useWallet()

  const [destination, setDestination] = useState('')
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

  const validateForm = () => {
    try {
      transactionSchema.parse({
        destination,
        amount: parseFloat(amount),
        memo: memo || undefined,
      })
      setValidationError(null)
      return true
    } catch (error) {
      if (error instanceof Error) {
        const zodError = JSON.parse(error.message)
        setValidationError(zodError[0]?.message || 'Invalid input')
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      await sendTransaction(destination, parseFloat(amount).toString())
      toast.success('Transaction sent successfully!')
      setDestination('')
      setAmount('')
      setMemo('')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Transaction failed')
    }
  }

  if (!address) return null

  const balanceNum = balance ? parseFloat(balance) : 0
  const amountNum = amount ? parseFloat(amount) : 0
  const insufficientFunds = amountNum > balanceNum

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full"
    >
      <Card className="stellar-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20">
              <Send className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Send XLM</CardTitle>
              <CardDescription>Send testnet XLM to any Stellar address</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination Address</Label>
              <Input
                id="destination"
                placeholder="G..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="font-mono text-sm"
                disabled={isSending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (XLM)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isSending}
              />
              <p className="text-xs text-muted-foreground">
                Available: {balance ? `${parseFloat(balance).toFixed(2)} XLM` : '0.00 XLM'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="memo">Memo (Optional)</Label>
              <Input
                id="memo"
                placeholder="Optional memo"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                maxLength={28}
                disabled={isSending}
              />
            </div>

            {validationError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex items-center gap-2 text-sm text-destructive"
              >
                <AlertCircle className="w-4 h-4" />
                {validationError}
              </motion.div>
            )}

            {insufficientFunds && amountNum > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex items-center gap-2 text-sm text-amber-400"
              >
                <AlertCircle className="w-4 h-4" />
                Insufficient funds. Fund your wallet first.
              </motion.div>
            )}

            <Button
              type="submit"
              variant="stellar"
              size="xl"
              className="w-full"
              disabled={isSending || !destination || !amount || insufficientFunds}
            >
              {isSending ? (
                <>
                  <Spinner className="mr-2" size="sm" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send XLM
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <AnimatePresence>
        {lastTransaction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4"
          >
            <Card className="stellar-card border-emerald-500/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-emerald-400">
                      Transaction Successful
                    </CardTitle>
                    <CardDescription>
                      Your transaction has been submitted to the network
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-xl bg-white/5 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transaction Hash</span>
                    <code className="text-cyan-400 font-mono text-xs">
                      {lastTransaction.hash.slice(0, 16)}...
                    </code>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className={lastTransaction.successful ? 'text-emerald-400' : 'text-destructive'}>
                      {lastTransaction.successful ? 'Successful' : 'Failed'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time</span>
                    <span className="text-foreground">
                      {new Date(lastTransaction.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                <a
                  href={`https://stellar.expert/testnet/tx/${lastTransaction.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  View on Stellar Expert
                  <ExternalLink className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
