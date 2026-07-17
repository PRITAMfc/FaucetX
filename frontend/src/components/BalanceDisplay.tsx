import { useWallet } from '@/hooks/useWallet'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { Droplets, RefreshCw, TrendingUp } from 'reicon-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export function BalanceDisplay() {
  const { address, balance, isFunding, refreshBalance, fundWallet } = useWallet()

  const handleRefresh = async () => {
    await refreshBalance()
    toast.success('Balance refreshed!')
  }

  const handleFund = async () => {
    try {
      await fundWallet()
      toast.success('Wallet funded with testnet XLM!')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to fund')
    }
  }

  if (!address) return null

  const balanceNum = balance ? parseFloat(balance) : 0

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="w-full">
      <Card className="stellar-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Balance</CardTitle>
                <CardDescription>Your XLM on testnet</CardDescription>
              </div>
            </div>
            <Badge variant={balanceNum > 0 ? 'success' : 'warning'}>
              {balanceNum > 0 ? 'Funded' : 'Empty'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-6">
            <motion.div key={balance} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-5xl font-bold text-cyan-400">
              {balance ? (
                <>
                  {parseFloat(balance).toFixed(2)}
                  <span className="text-2xl text-muted-foreground ml-2">XLM</span>
                </>
              ) : (
                <Spinner size="lg" />
              )}
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleRefresh} disabled={!balance}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="stellar" onClick={handleFund} disabled={isFunding}>
              {isFunding ? (
                <><Spinner className="mr-2" size="sm" />Funding...</>
              ) : (
                <><Droplets className="w-4 h-4 mr-2" />Fund Wallet</>
              )}
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Get free testnet XLM from Stellar Friendbot
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
