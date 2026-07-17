import { create } from 'zustand'
import type { TransactionResult } from '@shared/index'

export enum TxStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  SUBMITTED = 'SUBMITTED',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

interface WalletState {
  isConnected: boolean
  address: string | null
  walletName: string | null
  balance: string | null
  isConnecting: boolean
  isFunding: boolean
  isSending: boolean
  txStatus: TxStatus
  txError: string | null
  lastTransaction: TransactionResult | null
  contractData: Record<string, string>
  error: string | null

  setAddress: (address: string) => void
  setWalletName: (name: string) => void
  setBalance: (balance: string) => void
  setConnected: (connected: boolean) => void
  setConnecting: (connecting: boolean) => void
  setFunding: (funding: boolean) => void
  setSending: (sending: boolean) => void
  setTxStatus: (status: TxStatus) => void
  setTxError: (error: string | null) => void
  setLastTransaction: (tx: TransactionResult | null) => void
  setContractData: (key: string, value: string) => void
  setError: (error: string | null) => void
  disconnect: () => void
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: null,
  walletName: null,
  balance: null,
  isConnecting: false,
  isFunding: false,
  isSending: false,
  txStatus: TxStatus.IDLE,
  txError: null,
  lastTransaction: null,
  contractData: {},
  error: null,

  setAddress: (address) => set({ address }),
  setWalletName: (name) => set({ walletName: name }),
  setBalance: (balance) => set({ balance }),
  setConnected: (connected) => set({ isConnected: connected }),
  setConnecting: (connecting) => set({ isConnecting: connecting }),
  setFunding: (funding) => set({ isFunding: funding }),
  setSending: (sending) => set({ isSending: sending }),
  setTxStatus: (status) => set({ txStatus: status }),
  setTxError: (error) => set({ txError: error }),
  setLastTransaction: (tx) => set({ lastTransaction: tx }),
  setContractData: (key, value) =>
    set((state) => ({ contractData: { ...state.contractData, [key]: value } })),
  setError: (error) => set({ error }),
  disconnect: () =>
    set({
      isConnected: false,
      address: null,
      walletName: null,
      balance: null,
      lastTransaction: null,
      txStatus: TxStatus.IDLE,
      txError: null,
      contractData: {},
      error: null,
    }),
}))
