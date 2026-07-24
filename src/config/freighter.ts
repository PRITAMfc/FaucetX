import {
  isConnected,
  requestAccess,
  getAddress,
  signTransaction,
  getNetwork,
} from '@stellar/freighter-api'

/**
 * Stellar wallet integration using @stellar/freighter-api.
 *
 * Demonstrates:
 *  - Wallet permissions  -> requestAccess()
 *  - Address retrieval   -> getAddress()
 *  - Transaction signing -> signTransaction()
 */

export async function checkFreighterConnection(): Promise<boolean> {
  try {
    const result = await isConnected()
    return typeof result === 'boolean' ? result : result.isConnected
  } catch {
    return false
  }
}

export async function getFreighterAddress(): Promise<string> {
  const { address } = await getAddress()
  return address
}

export async function signWithFreighter(
  txXdr: string,
  networkPassphrase: string
): Promise<string> {
  const { signedTxXdr } = await signTransaction(txXdr, {
    networkPassphrase,
  })
  return signedTxXdr
}

export async function getFreighterNetwork(): Promise<string> {
  const { networkPassphrase } = await getNetwork()
  return networkPassphrase
}

export { isConnected, requestAccess, getAddress, signTransaction }
