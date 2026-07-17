import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import { WalletConnect } from '@/components/WalletConnect'
import { BalanceDisplay } from '@/components/BalanceDisplay'
import { SendTransaction } from '@/components/SendTransaction'
import { ContractPanel } from '@/components/ContractPanel'
import { FeedbackForm } from '@/components/FeedbackForm'
import { useWallet } from '@/hooks/useWallet'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { KrakenLogo } from '@/components/ui/kraken-logo'
import { Shield, Lightning, Globe, ArrowRight, Wallet } from 'reicon-react'

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-6 py-4 border-b border-kraken-border-gray"
      >
        <div className="flex items-center gap-2.5">
          <KrakenLogo className="w-8 h-8" />
          <span className="font-brand text-xl font-bold text-kraken-black tracking-tight">
            Faucet<span className="text-primary">X</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <SignInButton mode="modal">
            <button className="px-4 py-2 text-sm font-medium text-kraken-black hover:text-primary transition-colors rounded-xl">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
              Get Started
            </button>
          </SignUpButton>
        </div>
      </motion.header>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-kraken-purple-subtle text-primary text-xs font-medium mb-6">
          <Lightning className="w-3 h-3" />
          Stellar Testnet Faucet
        </div>
        <h1 className="font-brand text-5xl md:text-6xl font-bold text-kraken-black leading-[1.17] tracking-[-1px] mb-5">
          Free Testnet XLM<br />
          <span className="text-primary">Instantly</span>
        </h1>
        <p className="text-lg text-kraken-gray-light max-w-xl mx-auto mb-8 leading-relaxed">
          Connect any Stellar wallet, fund your testnet account, send transactions,
          and interact with Soroban smart contracts — all in one place.
        </p>
        <SignUpButton mode="modal">
          <button className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-primary rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 active:scale-[0.98]">
            Start Building
            <ArrowRight className="w-4 h-4" />
          </button>
        </SignUpButton>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-5xl mx-auto px-6 pb-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl border border-kraken-border-gray bg-white shadow-kraken hover:shadow-lg transition-shadow">
            <div className="p-2 rounded-xl bg-kraken-purple-subtle w-fit mb-4">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-brand text-lg font-bold text-kraken-black mb-2">Multi-Wallet</h3>
            <p className="text-sm text-kraken-gray leading-relaxed">
              Freighter, Albedo, LOBSTR, xBull, Ledger, Trezor, WalletConnect and more.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-kraken-border-gray bg-white shadow-kraken hover:shadow-lg transition-shadow">
            <div className="p-2 rounded-xl bg-kraken-purple-subtle w-fit mb-4">
              <Lightning className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-brand text-lg font-bold text-kraken-black mb-2">Instant Funding</h3>
            <p className="text-sm text-kraken-gray leading-relaxed">
              Get free testnet XLM via Stellar Friendbot with one click. No waiting.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-kraken-border-gray bg-white shadow-kraken hover:shadow-lg transition-shadow">
            <div className="p-2 rounded-xl bg-kraken-purple-subtle w-fit mb-4">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-brand text-lg font-bold text-kraken-black mb-2">Smart Contracts</h3>
            <p className="text-sm text-kraken-gray leading-relaxed">
              Deploy and interact with Soroban contracts. Read state, write data, listen to events.
            </p>
          </div>
        </div>
      </motion.section>

      <footer className="border-t border-kraken-border-gray py-6">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-xs text-kraken-gray-light">
          <span>Powered by <a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Stellar</a> & <a href="https://soroban.stellar.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Soroban</a></span>
          <span className="flex items-center gap-1">
            <Globe className="w-3 h-3" />
            Testnet
          </span>
        </div>
      </footer>
    </div>
  )
}

function Dashboard() {
  const { isConnected } = useWallet()

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'bg-white text-kraken-black border border-kraken-border-gray shadow-kraken',
        }}
      />

      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-kraken-border-gray">
        <div className="flex items-center gap-2.5">
          <KrakenLogo className="w-8 h-8" />
          <span className="font-brand text-xl font-bold text-kraken-black tracking-tight">
            Faucet<span className="text-primary">X</span>
          </span>
          <span className="ml-2 px-2 py-0.5 rounded-md bg-kraken-purple-subtle text-primary text-[10px] font-semibold">
            TESTNET
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[rgba(20,158,97,0.16)] text-kraken-green-dark text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-kraken-green" />
            Connected
          </span>
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-9 h-9 rounded-xl',
              },
            }}
          />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6">
          <WalletConnect />
        </div>

        {!isConnected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-20"
          >
            <div className="p-4 rounded-2xl bg-kraken-purple-subtle w-fit mx-auto mb-4">
              <KrakenLogo className="w-10 h-10" />
            </div>
            <h2 className="font-brand text-2xl font-bold text-kraken-black mb-2">Connect Your Wallet</h2>
            <p className="text-sm text-kraken-gray max-w-sm mx-auto">
              Choose your preferred Stellar wallet to start using the testnet faucet.
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
      </div>

      <footer className="border-t border-kraken-border-gray py-4 mt-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-kraken-gray-light">
          <span>
            Powered by{' '}
            <a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Stellar</a>
            {' '}&bull;{' '}
            <a href="https://stellarwalletskit.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WalletsKit</a>
            {' '}&bull;{' '}
            <a href="https://soroban.stellar.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Soroban</a>
          </span>
          <span className="flex items-center gap-1">
            <Globe className="w-3 h-3" />
            Testnet
          </span>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </>
  )
}

export default App
