import { server } from '@/config/stellar'

export async function getWalletBalance(address: string): Promise<string> {
  try {
    const account = await server.loadAccount(address)
    const xlmBalance = account.balances.find((b) => b.asset_type === 'native')
    return xlmBalance ? xlmBalance.balance : '0'
  } catch (error) {
    console.error('Error fetching balance:', error)
    return '0'
  }
}

export async function fundAccount(address: string): Promise<boolean> {
  try {
    const friendbotUrl = `https://friendbot.stellar.org?addr=${encodeURIComponent(address)}`
    const response = await fetch(friendbotUrl)
    if (!response.ok) throw new Error('Friendbot funding failed')
    const result = await response.json()
    return result.successful || result.hash !== undefined
  } catch (error) {
    console.error('Error funding account:', error)
    throw new Error('Failed to fund account')
  }
}

export function isValidStellarAddress(address: string): boolean {
  return /^[G-ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz0-9]{55,56}$/.test(address)
}

export function formatXLM(amount: string): string {
  return parseFloat(amount).toFixed(2) + ' XLM'
}
