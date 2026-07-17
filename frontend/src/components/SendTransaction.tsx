import { useState } from 'react'
import { useWallet, TxStatus } from '@/hooks/useWallet'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { Send, AlertCircle, CheckCircle, ExternalLink, Clock, XCircle } from 'reicon-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

export function SendTransaction() {
  const {
    address, balance, isSending, txStatus, txError, lastTransaction,
    sendTransaction,
  } = useWallet()

  const [destination, setDestination] = useState('')
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!destination || !amount) return

    const amountNum = parseFloat(amount)
    const balanceNum = balance ? parseFloat(balance) : 0

    if (amountNum > balanceNum) {
      toast.error('Insufficient balance!')
      return
    }

    if (amountNum <= 0) {
      toast.error('Amount must be positive!')
      return
    }

    try {
      await sendTransaction(destination, amount, memo || undefined)
      toast.success('Transaction sent!')
      setDestination('')
      setAmount('')
      setMemo('')
    } catch {
      // Error handled in hook
    }
  }

  if (!address) return null

  const balanceNum = balance ? parseFloat(balance) : 0
  const amountNum = amount ? parseFloat(amount) : 0
  const insufficientFunds = amountNum > balanceNum

  const statusConfig = {
    [TxStatus.IDLE]: null,
    [TxStatus.PENDING]: { icon: <Clock className="w-4 h-4" />, label: 'Awaiting wallet approval...', color: 'text-amber-400' },
    [TxStatus.SUBMITTED]: { icon: <Spinner size="sm" />, label: 'Transaction submitted, waiting for confirmation...', color: 'text-cyan-400' },
    [TxStatus.SUCCESS]: { icon: <CheckCircle className="w-4 h-4" />, label: 'Transaction confirmed!', color: 'text-emerald-400' },
    [TxStatus.FAILED]: { icon: <XCircle className="w-4 h-4" />, label: 'Transaction failed', color: 'text-destructive' },
  }

  const currentStatus = statusConfig[txStatus]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-full space-y-4">
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

            {insufficientFunds && amountNum > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-amber-400">
                <AlertCircle className="w-4 h-4" />
                Insufficient balance. Fund your wallet first.
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
                <><Spinner className="mr-2" size="sm" />Sending...</>
              ) : (
                <><Send className="w-5 h-5 mr-2" />Send XLM</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <AnimatePresence>
        {currentStatus && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card className="stellar-card">
              <CardContent className="pt-6">
                <div className={`flex items-center gap-2 ${currentStatus.color}`}>
                  {currentStatus.icon}
                  <span className="text-sm font-medium">{currentStatus.label}</span>
                  <Badge variant={txStatus === TxStatus.SUCCESS ? 'success' : txStatus === TxStatus.FAILED ? 'destructive' : 'stellar'}>
                    {txStatus}
                  </Badge>
                </div>
                {txError && (
                  <p className="mt-2 text-sm text-destructive">{txError}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lastTransaction && txStatus === TxStatus.SUCCESS && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Card className="stellar-card border-emerald-500/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-emerald-400">Transaction Successful</CardTitle>
                    <CardDescription>Confirmed on Stellar testnet</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-xl bg-white/5 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Hash</span>
                    <code className="text-cyan-400 font-mono text-xs">{lastTransaction.hash.slice(0, 16)}...</code>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-emerald-400">Successful</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time</span>
                    <span>{new Date(lastTransaction.createdAt).toLocaleTimeString()}</span>
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
