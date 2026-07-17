import { useWallet } from '@/hooks/useWallet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { Wallet, Logout, Copy, Check } from 'reicon-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useState } from 'react'

export function WalletConnect() {
  const {
    isConnected, address, balance,
    isConnecting, error,
    connectWallet, disconnectWallet,
  } = useWallet()

  const [copied, setCopied] = useState(false)

  const handleConnect = async () => {
    try {
      await connectWallet()
      toast.success('Wallet connected!')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to connect')
    }
  }

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      toast.success('Address copied!')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (isConnected && address) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20">
              <Wallet className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-center gap-2">
              <code className="text-xs font-mono text-cyan-400">
                {address.slice(0, 6)}...{address.slice(-4)}
              </code>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyAddress}>
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-cyan-400">
              {balance ? `${parseFloat(balance).toFixed(2)} XLM` : '0.00 XLM'}
            </span>
            <Badge variant="success" className="text-[10px] px-1.5 py-0">Testnet</Badge>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={disconnectWallet}>
              <Logout className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm mx-auto">
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 text-center space-y-4">
        <div className="mx-auto p-3 rounded-2xl bg-cyan-500/20 w-fit">
          <Wallet className="w-8 h-8 text-cyan-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Connect Your Wallet</h2>
        <p className="text-sm text-slate-400">
          Freighter, Albedo, LOBSTR, xBull, Ledger & more
        </p>
        <Button
          variant="stellar"
          size="xl"
          className="w-full"
          onClick={handleConnect}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <>
              <Spinner className="mr-2" size="sm" />
              Opening Wallet Selector...
            </>
          ) : (
            <>
              <Wallet className="w-5 h-5 mr-2" />
              Connect Multi-Wallet
            </>
          )}
        </Button>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 rounded-xl bg-red-500/10 border border-red-500/20"
          >
            <p className="text-xs text-red-400">{error}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
