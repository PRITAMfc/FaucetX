import { create } from 'zustand'
import type { WalletInfo, TransactionResult } from '@shared/index'

interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string | null
  walletInfo: WalletInfo | null
  isConnecting: boolean
  isFunding: boolean
  isSending: boolean
  lastTransaction: TransactionResult | null
  error: string | null

  setConnected: (connected: boolean) => void
  setAddress: (address: string) => void
  setBalance: (balance: string) => void
  setWalletInfo: (info: WalletInfo) => void
  setConnecting: (connecting: boolean) => void
  setFunding: (funding: boolean) => void
  setSending: (sending: boolean) => void
  setLastTransaction: (tx: TransactionResult | null) => void
  setError: (error: string | null) => void
  disconnect: () => void
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: null,
  balance: null,
  walletInfo: null,
  isConnecting: false,
  isFunding: false,
  isSending: false,
  lastTransaction: null,
  error: null,

  setConnected: (connected) => set({ isConnected: connected }),
  setAddress: (address) => set({ address }),
  setBalance: (balance) => set({ balance }),
  setWalletInfo: (info) => set({ walletInfo: info }),
  setConnecting: (connecting) => set({ isConnecting: connecting }),
  setFunding: (funding) => set({ isFunding: funding }),
  setSending: (sending) => set({ isSending: sending }),
  setLastTransaction: (tx) => set({ lastTransaction: tx }),
  setError: (error) => set({ error }),
  disconnect: () => set({
    isConnected: false,
    address: null,
    balance: null,
    walletInfo: null,
    lastTransaction: null,
    error: null,
  }),
}))
