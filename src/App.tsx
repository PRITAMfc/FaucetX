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
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Shield, Lightning, Globe, ArrowRight, Wallet } from 'reicon-react'

function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-kraken-border-gray"
      >
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <KrakenLogo className="w-7 h-7 sm:w-8 sm:h-8" />
          <span className="font-brand text-lg sm:text-xl font-bold text-kraken-black tracking-tight">
            Faucet<span className="text-primary">X</span>
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <SignInButton mode="modal">
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-kraken-black hover:text-primary transition-colors rounded-xl">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="px-3 sm:px-5 py-1.5 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
              Get Started
            </button>
          </SignUpButton>
        </div>
      </motion.header>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-10 md:pt-20 md:pb-16 text-center"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-kraken-purple-subtle text-primary text-xs font-medium mb-5 sm:mb-6">
          <Lightning className="w-3 h-3" />
          Stellar Testnet Faucet
        </div>
        <h1 className="font-brand text-3xl sm:text-4xl md:text-6xl font-bold text-kraken-black leading-[1.17] tracking-[-1px] mb-4 sm:mb-5">
          Free Testnet XLM<br />
          <span className="text-primary">Instantly</span>
        </h1>
        <p className="text-base sm:text-lg text-kraken-gray-light max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
          Connect any Stellar wallet, fund your testnet account, send transactions,
          and interact with Soroban smart contracts — all in one place.
        </p>
        <SignUpButton mode="modal">
          <button className="inline-flex items-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-base font-semibold text-white bg-primary rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 active:scale-[0.98]">
            Start Building
            <ArrowRight className="w-4 h-4" />
          </button>
        </SignUpButton>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          <div className="p-4 sm:p-6 rounded-2xl border border-kraken-border-gray bg-card shadow-kraken hover:shadow-lg transition-shadow">
            <div className="p-2 rounded-xl bg-kraken-purple-subtle w-fit mb-3 sm:mb-4">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-brand text-base sm:text-lg font-bold text-kraken-black mb-2">Multi-Wallet</h3>
            <p className="text-sm text-kraken-gray leading-relaxed">
              Freighter, Albedo, LOBSTR, xBull, Ledger, Trezor, WalletConnect and more.
            </p>
          </div>
          <div className="p-4 sm:p-6 rounded-2xl border border-kraken-border-gray bg-card shadow-kraken hover:shadow-lg transition-shadow">
            <div className="p-2 rounded-xl bg-kraken-purple-subtle w-fit mb-3 sm:mb-4">
              <Lightning className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-brand text-base sm:text-lg font-bold text-kraken-black mb-2">Instant Funding</h3>
            <p className="text-sm text-kraken-gray leading-relaxed">
              Get free testnet XLM via Stellar Friendbot with one click. No waiting.
            </p>
          </div>
          <div className="p-4 sm:p-6 rounded-2xl border border-kraken-border-gray bg-card shadow-kraken hover:shadow-lg transition-shadow">
            <div className="p-2 rounded-xl bg-kraken-purple-subtle w-fit mb-3 sm:mb-4">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-brand text-base sm:text-lg font-bold text-kraken-black mb-2">Smart Contracts</h3>
            <p className="text-sm text-kraken-gray leading-relaxed">
              Deploy and interact with Soroban contracts. Read state, write data, listen to events.
            </p>
          </div>
        </div>
      </motion.section>

      <footer className="border-t border-kraken-border-gray py-5 sm:py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 text-xs text-kraken-gray-light text-center">
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
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'bg-card text-kraken-black border border-kraken-border-gray shadow-kraken dark:text-kraken-black',
        }}
      />

      <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-card border-b border-kraken-border-gray">
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <KrakenLogo className="w-7 h-7 sm:w-8 sm:h-8" />
          <span className="font-brand text-lg sm:text-xl font-bold text-kraken-black tracking-tight">
            Faucet<span className="text-primary">X</span>
          </span>
          <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 rounded-md bg-kraken-purple-subtle text-primary text-[9px] sm:text-[10px] font-semibold">
            TESTNET
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md bg-[rgba(20,158,97,0.16)] text-kraken-green-dark text-[10px] sm:text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-kraken-green" />
            Connected
          </span>
          <ThemeToggle />
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-8 h-8 sm:w-9 sm:h-9 rounded-xl',
              },
            }}
          />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6">
          <WalletConnect />
        </div>

        {!isConnected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12 sm:py-20"
          >
            <div className="p-4 rounded-2xl bg-kraken-purple-subtle w-fit mx-auto mb-4">
              <KrakenLogo className="w-10 h-10" />
            </div>
            <h2 className="font-brand text-xl sm:text-2xl font-bold text-kraken-black mb-2">Connect Your Wallet</h2>
            <p className="text-sm text-kraken-gray max-w-sm mx-auto px-4">
              Choose your preferred Stellar wallet to start using the testnet faucet.
            </p>
          </motion.div>
        )}

        {isConnected && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <BalanceDisplay />
            <SendTransaction />
            <ContractPanel />
          </div>
        )}

        {isConnected && (
          <div className="mt-4 sm:mt-5">
            <FeedbackForm />
          </div>
        )}
      </div>

      <footer className="border-t border-kraken-border-gray py-3 sm:py-4 mt-6 sm:mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 text-xs text-kraken-gray-light text-center">
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
