import { WalletConnect } from '@/components/WalletConnect'
import { BalanceDisplay } from '@/components/BalanceDisplay'
import { SendTransaction } from '@/components/SendTransaction'
import { useWallet } from '@/hooks/useWallet'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Wallet, Zap } from 'reicon-react'

function App() {
  const { isConnected } = useWallet()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'bg-slate-800 text-white border border-slate-700',
        }}
      />

      <div className="container mx-auto px-4 py-8">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-cyan-500/20">
              <Wallet className="w-10 h-10 text-cyan-400" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              Faucet<span className="text-cyan-400">X</span>
            </h1>
          </div>
          <p className="text-slate-400 max-w-md mx-auto">
            A Stellar testnet faucet and wallet dApp. Connect your wallet,
            fund it with testnet XLM, and send transactions.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-medium">
              Testnet
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Zap className="w-3 h-3 inline mr-1" />
              Powered by Stellar
            </span>
          </div>
        </motion.header>

        <div className="max-w-md mx-auto space-y-6">
          <WalletConnect />

          {isConnected && (
            <>
              <BalanceDisplay />
              <SendTransaction />
            </>
          )}

          {!isConnected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center gap-2 text-slate-500 text-sm">
                <Zap className="w-4 h-4" />
                Connect your wallet to get started
              </div>
            </motion.div>
          )}
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-slate-500 text-sm"
        >
          <p>
            Built for Stellar White Belt Level 1 Challenge
          </p>
          <p className="mt-1">
            Powered by{' '}
            <a
              href="https://stellar.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Stellar
            </a>{' '}
            •{' '}
            <a
              href="https://reicon.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Reicon
            </a>{' '}
            •{' '}
            <a
              href="https://uiable.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              UIAble
            </a>
          </p>
        </motion.footer>
      </div>
    </div>
  )
}

export default App
