import {
  isConnected,
  getAddress,
  signTransaction,
  getNetwork,
} from '@stellar/freighter-api'

export async function checkFreighterConnection(): Promise<boolean> {
  try {
    const result = await isConnected()
    return typeof result === 'boolean' ? result : result.isConnected
  } catch {
    return false
  }
}

export async function getFreighterAddress(): Promise<string> {
  const address = await getAddress()
  return address.address
}

export async function signWithFreighter(
  txXdr: string,
  networkPassphrase: string
): Promise<string> {
  const result = await signTransaction(txXdr, {
    networkPassphrase,
  })
  return result.signedTxXdr
}

export async function getFreighterNetwork(): Promise<string> {
  const network = await getNetwork()
  return network.networkPassphrase
}

export { isConnected as freighterIsConnected } from '@stellar/freighter-api'
