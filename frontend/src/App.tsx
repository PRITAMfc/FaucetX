import { WalletConnect } from '@/components/WalletConnect'
import { BalanceDisplay } from '@/components/BalanceDisplay'
import { SendTransaction } from '@/components/SendTransaction'
import { ContractPanel } from '@/components/ContractPanel'
import { FeedbackForm } from '@/components/FeedbackForm'
import { useWallet } from '@/hooks/useWallet'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Wallet, Bolt } from 'reicon-react'

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

      <div className="max-w-6xl mx-auto px-4 py-6">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/20">
              <Wallet className="w-6 h-6 text-cyan-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              Faucet<span className="text-cyan-400">X</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-medium">Testnet</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-medium">
              <Bolt className="w-2.5 h-2.5 inline mr-0.5" />
              Multi-Wallet
            </span>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-[10px] font-medium">Soroban</span>
          </div>
        </motion.header>

        <div className="mb-6">
          <WalletConnect />
        </div>

        {!isConnected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16"
          >
            <p className="text-slate-500 text-sm">
              Connect your wallet to get started
            </p>
          </motion.div>
        )}

        {isConnected && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <BalanceDisplay />
            <SendTransaction />
            <ContractPanel />
          </div>
        )}

        {isConnected && (
          <div className="mt-5">
            <FeedbackForm />
          </div>
        )}

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 pb-6 text-slate-600 text-xs"
        >
          <p>
            Powered by{' '}
            <a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="text-cyan-400/60 hover:text-cyan-400">Stellar</a>
            {' '}&bull;{' '}
            <a href="https://stellarwalletskit.dev" target="_blank" rel="noopener noreferrer" className="text-cyan-400/60 hover:text-cyan-400">WalletsKit</a>
            {' '}&bull;{' '}
            <a href="https://reicon.dev" target="_blank" rel="noopener noreferrer" className="text-cyan-400/60 hover:text-cyan-400">Reicon</a>
            {' '}&bull;{' '}
            <a href="https://uiable.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400/60 hover:text-cyan-400">UIAble</a>
          </p>
        </motion.footer>
      </div>
    </div>
  )
}

export default App
