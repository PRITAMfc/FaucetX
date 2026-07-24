import { useWallet } from '@/hooks/useWallet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { KrakenLogo } from '@/components/ui/kraken-logo'
import { Logout, Copy, Check, Wallet, Download } from 'reicon-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { checkFreighterConnection } from '@/config/freighter'

export function WalletConnect() {
  const {
    isConnected, address, balance, walletName,
    isConnecting, error,
    connectWallet, connectFreighter, disconnectWallet,
  } = useWallet()

  const [copied, setCopied] = useState(false)
  const [freighterInstalled, setFreighterInstalled] = useState<boolean | null>(null)

  useEffect(() => {
    checkFreighterConnection().then(setFreighterInstalled)
  }, [])

  const handleConnectFreighter = async () => {
    try {
      await connectFreighter()
      toast.success('Connected with Freighter!')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to connect')
    }
  }

  const handleConnectMultiWallet = async () => {
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
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-card border border-kraken-border-gray shadow-kraken">
          <div className="flex items-center gap-2 sm:gap-3">
            <KrakenLogo className="w-5 h-5 shrink-0" />
            <div className="flex items-center gap-2">
              <code className="text-xs font-mono text-kraken-black">
                {address.slice(0, 6)}...{address.slice(-4)}
              </code>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyAddress}>
                {copied ? <Check className="w-3 h-3 text-kraken-green" /> : <Copy className="w-3 h-3 text-kraken-gray" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Badge variant="success" className="text-[10px] px-1.5 py-0 hidden sm:inline-flex">
              {walletName || 'Wallet'}
            </Badge>
            <span className="text-xs sm:text-sm font-semibold text-kraken-black">
              {balance ? `${parseFloat(balance).toFixed(2)} XLM` : '0.00 XLM'}
            </span>
            <Badge variant="success" className="text-[10px] px-1.5 py-0 hidden sm:inline-flex">Testnet</Badge>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={disconnectWallet}>
              <Logout className="w-3.5 h-3.5 text-kraken-gray" />
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-auto">
      <div className="p-4 sm:p-6 rounded-2xl bg-card border border-kraken-border-gray shadow-kraken text-center space-y-4">
        <div className="mx-auto p-3 rounded-2xl bg-kraken-purple-subtle w-fit">
          <KrakenLogo className="w-10 h-10" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-kraken-black">Connect Your Wallet</h2>
        <p className="text-sm text-kraken-gray">
          Sign in with your preferred Stellar wallet to access the testnet faucet
        </p>

        <div className="space-y-3">
          <Button
            variant="stellar"
            size="xl"
            className="w-full"
            onClick={handleConnectFreighter}
            disabled={isConnecting || freighterInstalled === false}
          >
            {isConnecting ? (
              <>
                <Spinner className="mr-2" size="sm" />
                Connecting...
              </>
            ) : freighterInstalled === false ? (
              <>
                <Download className="w-5 h-5 mr-2" />
                Install Freighter
              </>
            ) : (
              <>
                <Wallet className="w-5 h-5 mr-2" />
                Connect with Freighter
              </>
            )}
          </Button>

          {freighterInstalled === false && (
            <a
              href="https://freighter.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs text-primary hover:underline"
            >
              Get Freighter →
            </a>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-kraken-border-gray" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-card text-kraken-gray">or</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleConnectMultiWallet}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <Spinner className="mr-2" size="sm" />
                Opening Wallet Selector...
              </>
            ) : (
              <>
                <KrakenLogo className="w-5 h-5 mr-2" />
                Multi-Wallet (Albedo, LOBSTR, xBull, Ledger & more)
              </>
            )}
          </Button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 rounded-xl bg-red-50 border border-red-200"
          >
            <p className="text-xs text-red-600">{error}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
