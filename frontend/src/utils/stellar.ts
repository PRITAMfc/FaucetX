import * as StellarSdk from '@stellar/stellar-sdk'

const HORIZON_URL = 'https://horizon-testnet.stellar.org'
const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET

const server = new StellarSdk.Horizon.Server(HORIZON_URL)

export async function getWalletBalance(address: string): Promise<string> {
  try {
    const account = await server.loadAccount(address)
    const xlmBalance = account.balances.find(
      (b) => b.asset_type === 'native'
    )
    return xlmBalance ? xlmBalance.balance : '0'
  } catch (error) {
    console.error('Error fetching balance:', error)
    throw new Error('Failed to fetch wallet balance')
  }
}

export async function fundAccount(address: string): Promise<boolean> {
  try {
    const response = await fetch(`${HORIZON_URL}/accounts/${address}`)
    const accountExists = response.ok

    if (!accountExists) {
      const friendbotUrl = `https://friendbot.stellar.org?addr=${encodeURIComponent(address)}`
      const friendbotResponse = await fetch(friendbotUrl)

      if (!friendbotResponse.ok) {
        throw new Error('Friendbot funding failed')
      }

      const result = await friendbotResponse.json()
      return result.successful || result.hash !== undefined
    }

    return true
  } catch (error) {
    console.error('Error funding account:', error)
    throw new Error('Failed to fund account')
  }
}

export async function sendXLM(
  destination: string,
  amount: string,
  sourceSecret: string
): Promise<StellarSdk.Horizon.Api.SubmitTransactionResponse> {
  try {
    const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecret)
    const sourcePublicKey = sourceKeypair.publicKey()

    const sourceAccount = await server.loadAccount(sourcePublicKey)

    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: await server.fetchBaseFee(),
      networkPassphrase: NETWORK_PASSPHRASE,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination,
          asset: StellarSdk.Asset.native(),
          amount: amount.toString(),
        })
      )
      .setTimeout(180)
      .build()

    transaction.sign(sourceKeypair)

    const result = await server.submitTransaction(transaction)
    return result
  } catch (error) {
    console.error('Error sending XLM:', error)
    throw new Error('Failed to send XLM')
  }
}

export async function getAccountInfo(address: string) {
  try {
    const account = await server.loadAccount(address)
    return {
      address,
      balance: account.balances.find((b) => b.asset_type === 'native')?.balance || '0',
      sequence: account.sequence,
      subentryCount: account.subentry_count,
    }
  } catch (error) {
    console.error('Error fetching account info:', error)
    throw new Error('Failed to fetch account info')
  }
}

export function isValidStellarAddress(address: string): boolean {
  return /^[G-ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz0-9]{55,56}$/.test(address)
}

export function formatXLM(amount: string): string {
  const num = parseFloat(amount)
  return num.toFixed(2) + ' XLM'
}
