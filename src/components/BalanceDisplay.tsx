import { useWallet } from '@/hooks/useWallet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { Droplet, Refresh, TrendUp } from 'reicon-react'
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
      toast.success('Wallet funded!')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to fund')
    }
  }

  if (!address) return null

  const balanceNum = balance ? parseFloat(balance) : 0

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <div className="h-full p-4 sm:p-5 rounded-2xl bg-card border border-kraken-border-gray shadow-kraken flex flex-col">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-kraken-purple-subtle">
              <TrendUp className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-kraken-black">Balance</span>
          </div>
          <Badge variant={balanceNum > 0 ? 'success' : 'warning'} className="text-[10px]">
            {balanceNum > 0 ? 'Funded' : 'Empty'}
          </Badge>
        </div>

        <div className="flex-1 flex items-center justify-center py-3 sm:py-4">
          <motion.div key={balance} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            {balance ? (
              <span className="text-3xl sm:text-4xl font-bold text-kraken-black">
                {parseFloat(balance).toFixed(2)}
                <span className="text-base sm:text-lg text-kraken-gray-light ml-1">XLM</span>
              </span>
            ) : (
              <Spinner size="lg" />
            )}
          </motion.div>
        </div>

        <div className="flex gap-2 mt-auto">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={!balance} className="flex-1">
            <Refresh className="w-3.5 h-3.5 mr-1.5" />
            Refresh
          </Button>
          <Button variant="stellar" size="sm" onClick={handleFund} disabled={isFunding} className="flex-1">
            {isFunding ? (
              <><Spinner className="mr-1.5" size="sm" />Funding...</>
            ) : (
              <><Droplet className="w-3.5 h-3.5 mr-1.5" />Fund</>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
