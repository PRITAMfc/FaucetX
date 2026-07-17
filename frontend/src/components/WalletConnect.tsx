import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { useWallet } from '@/hooks/useWallet'
import { Wallet, Send, RefreshCw, Droplets, LogOut, Copy, Check, ExternalLink } from 'reicon-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

type WalletType = 'freighter' | 'albedo'

export function WalletConnect() {
  const {
    isConnected,
    address,
    balance,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
  } = useWallet()

  const [copied, setCopied] = useState(false)

  const handleConnect = async (walletType: WalletType) => {
    try {
      await connectWallet(walletType)
      toast.success('Wallet connected successfully!')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to connect wallet')
    }
  }

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      toast.success('Address copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (isConnected && address) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <Card className="stellar-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/20">
                  <Wallet className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Connected Wallet</CardTitle>
                  <CardDescription>Freighter Wallet</CardDescription>
                </div>
              </div>
              <Badge variant="success">Connected</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <span className="text-sm text-muted-foreground">Address</span>
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono text-cyan-400">
                  {address.slice(0, 8)}...{address.slice(-8)}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={copyAddress}
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <span className="text-sm text-muted-foreground">Balance</span>
              <span className="text-lg font-semibold text-cyan-400">
                {balance ? `${parseFloat(balance).toFixed(2)} XLM` : 'Loading...'}
              </span>
            </div>

            <Button
              variant="ghost"
              className="w-full"
              onClick={disconnectWallet}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="stellar-card">
        <CardHeader className="text-center">
          <div className="mx-auto p-3 rounded-2xl bg-cyan-500/20 w-fit">
            <Wallet className="w-8 h-8 text-cyan-400" />
          </div>
          <CardTitle className="text-2xl mt-4">Connect Your Wallet</CardTitle>
          <CardDescription>
            Choose a Stellar wallet to connect to FaucetX
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="stellar"
            size="xl"
            className="w-full"
            onClick={() => handleConnect('freighter')}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <Spinner className="mr-2" size="sm" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="w-5 h-5 mr-2" />
                Connect with Freighter
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="xl"
            className="w-full"
            onClick={() => handleConnect('albedo')}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <Spinner className="mr-2" size="sm" />
                Connecting...
              </>
            ) : (
              <>
                <ExternalLink className="w-5 h-5 mr-2" />
                Connect with Albedo
              </>
            )}
          </Button>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-destructive text-center"
            >
              {error}
            </motion.p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
