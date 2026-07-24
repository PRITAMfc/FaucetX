import { useCallback } from 'react'
import { useWallet } from './useWallet'
import { useWalletStore, TxStatus } from '@/stores/walletStore'
import { FAUCET_CONTRACT_ID, TESTNET_NETWORK_PASSPHRASE, server, sorobanServer } from '@/config/stellar'
import { initWalletKit, StellarWalletsKit } from '@/config/walletKit'
import { handleWalletError } from '@/utils/errors'
import * as StellarSdk from '@stellar/stellar-sdk'

export function useContract() {
  const { address, refreshBalance } = useWallet()
  const {
    setTxStatus, setTxError, setLastTransaction,
    setError,
  } = useWalletStore()

  const hasContract = Boolean(FAUCET_CONTRACT_ID)

  const readContract = useCallback(async (method: string, args?: StellarSdk.xdr.ScVal[]) => {
    if (!FAUCET_CONTRACT_ID) throw new Error('Contract not configured')
    if (!address) throw new Error('Wallet not connected')

    try {
      const contract = new StellarSdk.Contract(FAUCET_CONTRACT_ID)
      const sourceAccount = await server.loadAccount(address)

      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: String(await server.fetchBaseFee()),
        networkPassphrase: TESTNET_NETWORK_PASSPHRASE,
      })
        .addOperation(contract.call(method, ...(args || [])))
        .setTimeout(30)
        .build()

      const response = await sorobanServer.simulateTransaction(transaction)

      if ('result' in response) {
        return response.result
      }

      throw new Error('Simulation failed')
    } catch (err) {
      const walletError = handleWalletError(err)
      setError(walletError.message)
      throw err
    }
  }, [address, setError])

  const writeContract = useCallback(async (
    method: string,
    args: StellarSdk.xdr.ScVal[]
  ) => {
    if (!address) throw new Error('Wallet not connected')
    if (!FAUCET_CONTRACT_ID) throw new Error('Contract not configured')

    setTxStatus(TxStatus.PENDING)
    setTxError(null)

    try {
      initWalletKit()
      const contract = new StellarSdk.Contract(FAUCET_CONTRACT_ID)
      const sourceAccount = await server.loadAccount(address)

      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: String(await server.fetchBaseFee()),
        networkPassphrase: TESTNET_NETWORK_PASSPHRASE,
      })
        .addOperation(contract.call(method, ...args))
        .setTimeout(180)
        .build()

      setTxStatus(TxStatus.SUBMITTED)

      const { signedTxXdr } = await StellarWalletsKit.signTransaction(transaction.toXDR(), {
        networkPassphrase: TESTNET_NETWORK_PASSPHRASE,
        address,
      })

      const signedTx = StellarSdk.TransactionBuilder.fromXDR(
        signedTxXdr,
        TESTNET_NETWORK_PASSPHRASE
      )

      const result = await server.submitTransaction(signedTx)

      setTxStatus(TxStatus.SUCCESS)
      setLastTransaction({
        hash: result.hash,
        ledger: result.ledger || 0,
        successful: true,
        resultXdr: result.result_xdr || '',
        createdAt: new Date().toISOString(),
      })

      await refreshBalance()
      return result
    } catch (err) {
      const walletError = handleWalletError(err)
      setTxStatus(TxStatus.FAILED)
      setTxError(`${walletError.message}: ${walletError.details}`)
      throw err
    }
  }, [address, refreshBalance, setTxStatus, setTxError, setLastTransaction])

  const getContractEvents = useCallback(async (contractId?: string) => {
    const targetContract = contractId || FAUCET_CONTRACT_ID
    if (!targetContract) return []

    try {
      const response = await fetch(
        `https://soroban-testnet.stellar.org/contracts/${targetContract}/events?limit=10`
      )
      const data = await response.json()
      return data.events || []
    } catch {
      return []
    }
  }, [])

  const subscribeToEvents = useCallback((
    contractId: string,
    callback: (event: unknown) => void
  ) => {
    const pollInterval = setInterval(async () => {
      try {
        const events = await getContractEvents(contractId)
        if (events.length > 0) {
          callback(events[0])
        }
      } catch {
        // ignore polling errors
      }
    }, 5000)

    return () => clearInterval(pollInterval)
  }, [getContractEvents])

  return {
    hasContract,
    readContract,
    writeContract,
    getContractEvents,
    subscribeToEvents,
  }
}
