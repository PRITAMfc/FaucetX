import { useState } from 'react'
import { useWallet, TxStatus } from '@/hooks/useWallet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { Send, AlertCircle, CheckCircle, Clock, XCircle, ArrowUpRight } from 'reicon-react'
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

  const statusConfig: Record<string, { icon: React.ReactNode; label: string; color: string } | null> = {
    [TxStatus.IDLE]: null,
    [TxStatus.PENDING]: { icon: <Clock className="w-3.5 h-3.5" />, label: 'Awaiting approval...', color: 'text-amber-500' },
    [TxStatus.SUBMITTED]: { icon: <Spinner size="sm" />, label: 'Confirming...', color: 'text-primary' },
    [TxStatus.SUCCESS]: { icon: <CheckCircle className="w-3.5 h-3.5" />, label: 'Confirmed!', color: 'text-kraken-green' },
    [TxStatus.FAILED]: { icon: <XCircle className="w-3.5 h-3.5" />, label: 'Failed', color: 'text-red-500' },
  }

  const currentStatus = statusConfig[txStatus]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <div className="h-full p-5 rounded-2xl bg-card border border-kraken-border-gray shadow-kraken flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-kraken-purple-subtle">
              <Send className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-semibold text-kraken-black">Send XLM</span>
          </div>
          {lastTransaction && txStatus === TxStatus.SUCCESS && (
            <a
              href={`https://stellar.expert/explorer/testnet/tx/${lastTransaction.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-kraken-gray">Destination</Label>
            <Input
              placeholder="G..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="font-mono text-xs h-9 border-kraken-border-gray"
              disabled={isSending}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-kraken-gray">Amount (XLM)</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-9 border-kraken-border-gray"
              disabled={isSending}
            />
            <p className="text-[10px] text-kraken-gray-light">
              Available: {balance ? `${parseFloat(balance).toFixed(2)} XLM` : '0.00 XLM'}
            </p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-kraken-gray">Memo</Label>
            <Input
              placeholder="Optional"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              maxLength={28}
              className="h-9 border-kraken-border-gray"
              disabled={isSending}
            />
          </div>

          {insufficientFunds && amountNum > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] text-amber-600">
              <AlertCircle className="w-3 h-3" />
              Insufficient balance
            </div>
          )}

          <div className="mt-auto pt-1">
            <Button
              type="submit"
              variant="stellar"
              size="sm"
              className="w-full"
              disabled={isSending || !destination || !amount || insufficientFunds}
            >
              {isSending ? (
                <><Spinner className="mr-1.5" size="sm" />Sending...</>
              ) : (
                <><Send className="w-3.5 h-3.5 mr-1.5" />Send XLM</>
              )}
            </Button>
          </div>
        </form>

        <AnimatePresence>
          {currentStatus && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className={`mt-3 flex items-center gap-2 text-xs ${currentStatus.color}`}
            >
              {currentStatus.icon}
              <span>{currentStatus.label}</span>
              <Badge variant={txStatus === TxStatus.SUCCESS ? 'success' : txStatus === TxStatus.FAILED ? 'destructive' : 'stellar'} className="text-[10px] ml-auto">
                {txStatus}
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>

        {txError && (
          <p className="mt-1.5 text-[11px] text-red-500 truncate">{txError}</p>
        )}
      </div>
    </motion.div>
  )
}
