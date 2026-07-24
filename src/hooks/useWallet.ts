import { useCallback, useEffect } from 'react'
import { useWalletStore, TxStatus } from '@/stores/walletStore'

export { TxStatus }
import { initWalletKit, StellarWalletsKit } from '@/config/walletKit'
import { server, TESTNET_NETWORK_PASSPHRASE } from '@/config/stellar'
import { handleWalletError, WalletErrorType } from '@/utils/errors'
import * as StellarSdk from '@stellar/stellar-sdk'
import {
  checkFreighterConnection,
  signWithFreighter,
  requestAccess as freighterRequestAccess,
} from '@/config/freighter'

export function useWallet() {
  const {
    isConnected, address, walletName, balance,
    isConnecting, isFunding, isSending, txStatus, txError,
    lastTransaction, error,
    setAddress, setWalletName, setBalance, setConnected,
    setConnecting, setFunding, setSending,
    setTxStatus, setTxError, setLastTransaction,
    setError, disconnect,
  } = useWalletStore()

  const connectFreighter = useCallback(async () => {
    setConnecting(true)
    setError(null)

    try {
      // Request wallet permissions + public key (address)
      const { address: walletAddress } = await freighterRequestAccess()
      if (!walletAddress) {
        throw new Error('Freighter wallet did not return an address')
      }

      setAddress(walletAddress)
      setConnected(true)
      setWalletName('Freighter')

      const walletBalance = await fetchBalance(walletAddress)
      setBalance(walletBalance)
    } catch (err) {
      const walletError = handleWalletError(err)
      setError(`${walletError.message}: ${walletError.details}`)
    } finally {
      setConnecting(false)
    }
  }, [setAddress, setWalletName, setBalance, setConnected, setConnecting, setError])

  const connectWallet = useCallback(async () => {
    setConnecting(true)
    setError(null)

    try {
      const freighterAvailable = await checkFreighterConnection()
      if (freighterAvailable) {
        // Request wallet permissions + public key (address)
        const { address: walletAddress } = await freighterRequestAccess()
        setAddress(walletAddress)
        setConnected(true)
        setWalletName('Freighter')

        const walletBalance = await fetchBalance(walletAddress)
        setBalance(walletBalance)
        return
      }

      initWalletKit()

      const { address: walletAddress } = await StellarWalletsKit.authModal()

      setAddress(walletAddress)

      const { address: storedAddress } = await StellarWalletsKit.getAddress()
      setAddress(storedAddress || walletAddress)

      setConnected(true)

      const walletBalance = await fetchBalance(storedAddress || walletAddress)
      setBalance(walletBalance)
      setWalletName('Wallet')
    } catch (err) {
      const walletError = handleWalletError(err)
      setError(`${walletError.message}: ${walletError.details}`)
    } finally {
      setConnecting(false)
    }
  }, [setAddress, setWalletName, setBalance, setConnected, setConnecting, setError])

  const fetchBalance = useCallback(async (addr: string): Promise<string> => {
    try {
      const account = await server.loadAccount(addr)
      const xlmBalance = account.balances.find((b) => b.asset_type === 'native')
      return xlmBalance ? xlmBalance.balance : '0'
    } catch {
      return '0'
    }
  }, [])

  const refreshBalance = useCallback(async () => {
    if (!address) return
    try {
      const walletBalance = await fetchBalance(address)
      setBalance(walletBalance)
    } catch (err) {
      const walletError = handleWalletError(err)
      setError(walletError.message)
    }
  }, [address, fetchBalance, setBalance, setError])

  const fundWallet = useCallback(async () => {
    if (!address) return
    setFunding(true)
    setError(null)

    try {
      const friendbotUrl = `https://friendbot.stellar.org?addr=${encodeURIComponent(address)}`
      const response = await fetch(friendbotUrl)

      if (!response.ok) {
        const walletError = handleWalletError({ message: 'Friendbot funding failed' })
        setError(`${walletError.message}: ${walletError.details}`)
        return
      }

      await response.json()

      await new Promise((resolve) => setTimeout(resolve, 2000))
      await refreshBalance()
    } catch (err) {
      const walletError = handleWalletError(err)
      setError(`${walletError.message}: ${walletError.details}`)
    } finally {
      setFunding(false)
    }
  }, [address, refreshBalance, setFunding, setError])

  const sendTransaction = useCallback(async (destination: string, amount: string, memo?: string) => {
    if (!address) return

    setSending(true)
    setTxStatus(TxStatus.PENDING)
    setTxError(null)
    setError(null)

    try {
      const sourceAccount = await server.loadAccount(address)

      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: String(await server.fetchBaseFee()),
        networkPassphrase: TESTNET_NETWORK_PASSPHRASE,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination,
            asset: StellarSdk.Asset.native(),
            amount: amount.toString(),
          })
        )

      if (memo) {
        transaction.addMemo(StellarSdk.Memo.text(memo))
      }

      const builtTx = transaction.setTimeout(180).build()

      setTxStatus(TxStatus.SUBMITTED)

      let signedTxXdr: string
      if (walletName === 'Freighter') {
        signedTxXdr = await signWithFreighter(builtTx.toXDR(), TESTNET_NETWORK_PASSPHRASE)
      } else {
        const result = await StellarWalletsKit.signTransaction(builtTx.toXDR(), {
          networkPassphrase: TESTNET_NETWORK_PASSPHRASE,
          address,
        })
        signedTxXdr = result.signedTxXdr
      }

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
      setError(walletError.message)
      throw err
    } finally {
      setSending(false)
    }
  }, [address, walletName, refreshBalance, setSending, setTxStatus, setTxError, setLastTransaction, setError])

  const invokeContract = useCallback(async (
    contractId: string,
    method: string,
    args: StellarSdk.xdr.ScVal[],
    sourceAddress?: string
  ) => {
    const signerAddress = sourceAddress || address
    if (!signerAddress) throw new Error('Wallet not connected')

    setTxStatus(TxStatus.PENDING)

    try {
      const contract = new StellarSdk.Contract(contractId)
      const sourceAccount = await server.loadAccount(signerAddress)

      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: String(await server.fetchBaseFee()),
        networkPassphrase: TESTNET_NETWORK_PASSPHRASE,
      })
        .addOperation(contract.call(method, ...args))
        .setTimeout(180)
        .build()

      setTxStatus(TxStatus.SUBMITTED)

      let signedTxXdr: string
      if (walletName === 'Freighter') {
        signedTxXdr = await signWithFreighter(transaction.toXDR(), TESTNET_NETWORK_PASSPHRASE)
      } else {
        const result = await StellarWalletsKit.signTransaction(transaction.toXDR(), {
          networkPassphrase: TESTNET_NETWORK_PASSPHRASE,
          address: signerAddress,
        })
        signedTxXdr = result.signedTxXdr
      }

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
  }, [address, walletName, refreshBalance, setTxStatus, setTxError, setLastTransaction])

  const disconnectWallet = useCallback(async () => {
    try {
      initWalletKit()
      await StellarWalletsKit.disconnect()
    } catch {
      // Ignore disconnect errors
    }
    disconnect()
  }, [disconnect])

  useEffect(() => {
    const checkAutoConnect = async () => {
      try {
        const storedAddress = localStorage.getItem('faucetx_address')
        const storedName = localStorage.getItem('faucetx_walletName')

        if (storedAddress && storedName) {
          setAddress(storedAddress)
          setWalletName(storedName)
          setConnected(true)

          const walletBalance = await fetchBalance(storedAddress)
          setBalance(walletBalance)
        }
      } catch {
        // Ignore auto-connect errors
      }
    }
    checkAutoConnect()
  }, [])

  useEffect(() => {
    if (address && walletName) {
      localStorage.setItem('faucetx_address', address)
      localStorage.setItem('faucetx_walletName', walletName)
    } else {
      localStorage.removeItem('faucetx_address')
      localStorage.removeItem('faucetx_walletName')
    }
  }, [address, walletName])

  return {
    isConnected, address, walletName, balance,
    isConnecting, isFunding, isSending, txStatus, txError,
    lastTransaction, error,
    connectWallet, connectFreighter, refreshBalance, fundWallet,
    sendTransaction, invokeContract, disconnectWallet,
    WalletErrorType,
  }
}
