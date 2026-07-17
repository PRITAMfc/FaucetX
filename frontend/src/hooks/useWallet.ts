import { useState, useCallback, useEffect } from 'react'
import { useWalletStore } from '@/stores/walletStore'
import {
  getWalletBalance,
  fundAccount,
  sendXLM,
  getAccountInfo,
} from '@/utils/stellar'

declare global {
  interface Window {
    freighterApi?: {
      isConnected: () => Promise<boolean>
      getAddress: () => Promise<string>
      signTransaction: (xdr: string, opts?: { networkPassphrase?: string }) => Promise<string>
    }
    Albedo?: {
      publicKey: (opts?: { network?: string }) => Promise<string>
      pay: (opts: {
        destination: string
        amount: string
        asset?: string
        memo?: string
        network?: string
      }) => Promise<{ txhash: string }>
    }
  }
}

type WalletType = 'freighter' | 'albedo' | null

export function useWallet() {
  const {
    isConnected,
    address,
    balance,
    isConnecting,
    isFunding,
    isSending,
    lastTransaction,
    error,
    setConnected,
    setAddress,
    setBalance,
    setConnecting,
    setFunding,
    setSending,
    setLastTransaction,
    setError,
    disconnect,
  } = useWalletStore()

  const [selectedWallet, setSelectedWallet] = useState<WalletType>(null)

  const detectAvailableWallets = useCallback(async (): Promise<WalletType[]> => {
    const wallets: WalletType[] = []

    if (typeof window !== 'undefined') {
      if (window.freighterApi) {
        try {
          const connected = await window.freighterApi.isConnected()
          if (connected) wallets.push('freighter')
        } catch {
          // Freight not available
        }
      }

      if (window.Albedo) {
        wallets.push('albedo')
      }
    }

    return wallets
  }, [])

  const connectWallet = useCallback(async (walletType: WalletType = 'freighter') => {
    setConnecting(true)
    setError(null)

    try {
      let walletAddress: string

      if (walletType === 'freighter') {
        if (!window.freighterApi) {
          throw new Error('Freighter wallet not found. Please install the Freight browser extension.')
        }
        walletAddress = await window.freighterApi.getAddress()
      } else if (walletType === 'albedo') {
        if (!window.Albedo) {
          throw new Error('Albedo wallet not found. Please visit albedo.link to use Albedo.')
        }
        walletAddress = await window.Albedo.publicKey({ network: 'testnet' })
      } else {
        throw new Error('No wallet selected')
      }

      setAddress(walletAddress)
      setSelectedWallet(walletType)

      const walletBalance = await getWalletBalance(walletAddress)
      setBalance(walletBalance)

      setConnected(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect wallet'
      setError(errorMessage)
      throw err
    } finally {
      setConnecting(false)
    }
  }, [setAddress, setBalance, setConnected, setConnecting, setError])

  const refreshBalance = useCallback(async () => {
    if (!address) return

    try {
      const walletBalance = await getWalletBalance(address)
      setBalance(walletBalance)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh balance'
      setError(errorMessage)
    }
  }, [address, setBalance, setError])

  const fundWallet = useCallback(async () => {
    if (!address) return

    setFunding(true)
    setError(null)

    try {
      await fundAccount(address)
      await refreshBalance()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fund wallet'
      setError(errorMessage)
      throw err
    } finally {
      setFunding(false)
    }
  }, [address, refreshBalance, setFunding, setError])

  const sendTransaction = useCallback(async (destination: string, amount: string) => {
    if (!address || !selectedWallet) return

    setSending(true)
    setError(null)

    try {
      if (selectedWallet === 'freighter') {
        if (!window.freighterApi) {
          throw new Error('Freighter wallet not available')
        }

        const sourceAccount = await getAccountInfo(address)
        const { Server, TransactionBuilder, Operation, Networks, Asset } = await import('@stellar/stellar-sdk')

        const server = new Server('https://horizon-testnet.stellar.org')
        const sourceAccountData = await server.loadAccount(address)

        const transaction = new TransactionBuilder(sourceAccountData, {
          fee: await server.fetchBaseFee(),
          networkPassphrase: Networks.TESTNET,
        })
          .addOperation(
            Operation.payment({
              destination,
              asset: Asset.native(),
              amount: amount.toString(),
            })
          )
          .setTimeout(180)
          .build()

        const signedXdr = await window.freighterApi.signTransaction(
          transaction.toXDR(),
          { networkPassphrase: Networks.TESTNET }
        )

        const { Server: HorizonServer } = await import('@stellar/stellar-sdk')
        const horizonServer = new HorizonServer('https://horizon-testnet.stellar.org')
        const result = await horizonServer.submitTransaction(
          TransactionBuilder.fromXDR(signedXdr, Networks.TESTNET)
        )

        setLastTransaction({
          hash: result.hash,
          ledger: result.ledger,
          successful: result.successful,
          resultXdr: result.result_xdr || '',
          createdAt: new Date().toISOString(),
        })

        await refreshBalance()
        return result
      } else if (selectedWallet === 'albedo') {
        if (!window.Albedo) {
          throw new Error('Albedo wallet not available')
        }

        const result = await window.Albedo.pay({
          destination,
          amount: amount.toString(),
          asset: 'native',
          network: 'testnet',
        })

        setLastTransaction({
          hash: result.txhash,
          ledger: 0,
          successful: true,
          resultXdr: '',
          createdAt: new Date().toISOString(),
        })

        await refreshBalance()
        return result
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send transaction'
      setError(errorMessage)
      throw err
    } finally {
      setSending(false)
    }
  }, [address, selectedWallet, refreshBalance, setLastTransaction, setSending, setError])

  const disconnectWallet = useCallback(() => {
    disconnect()
    setSelectedWallet(null)
  }, [disconnect])

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && window.freighterApi) {
        try {
          const connected = await window.freighterApi.isConnected()
          if (connected) {
            const walletAddress = await window.freighterApi.getAddress()
            setAddress(walletAddress)
            setSelectedWallet('freighter')

            const walletBalance = await getWalletBalance(walletAddress)
            setBalance(walletBalance)
            setConnected(true)
          }
        } catch {
          // Not connected
        }
      }
    }

    checkConnection()
  }, [setAddress, setBalance, setConnected])

  return {
    isConnected,
    address,
    balance,
    isConnecting,
    isFunding,
    isSending,
    lastTransaction,
    error,
    selectedWallet,
    connectWallet,
    refreshBalance,
    fundWallet,
    sendTransaction,
    disconnectWallet,
    detectAvailableWallets,
  }
}
