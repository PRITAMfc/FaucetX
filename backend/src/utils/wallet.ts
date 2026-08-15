import * as StellarSdk from '@stellar/stellar-sdk'

export const getBalance = async (address: string) => {
  if (!address || address.length < 56) {
    throw new Error('Invalid Stellar address')
  }

  const horizonServer = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org')
  const account = await horizonServer.loadAccount(address)
  const xlmBalance = account.balances.find((b) => b.asset_type === 'native')

  return {
    address,
    balance: xlmBalance ? xlmBalance.balance : '0',
    sequence: account.sequence,
    subentryCount: account.subentry_count,
  }
}

export const fundWallet = async (address: string) => {
  if (!address || address.length < 56) {
    throw new Error('Invalid Stellar address')
  }

  const friendbotUrl = `https://friendbot.stellar.org?addr=${encodeURIComponent(address)}`
  const response = await fetch(friendbotUrl)

  if (!response.ok) throw new Error('Friendbot funding failed')
  const result = await response.json()

  return { success: true, address, hash: result.hash, funded: true }
}

export const getContractInfo = async (contractId: string) => {
  return {
    contractId,
    network: 'testnet',
    rpcUrl: 'https://soroban-testnet.stellar.org',
    explorerUrl: `https://stellar.expert/testnet/contract/${contractId}`,
  }
}

export const getContractEvents = async (contractId: string, limit = 10) => {
  const response = await fetch(
    `https://soroban-testnet.stellar.org/contracts/${contractId}/events?limit=${limit}`
  )
  const data = await response.json()
  return { events: data.events || [], contractId }
}

export const getTransaction = async (hash: string) => {
  const response = await fetch(`https://horizon-testnet.stellar.org/transactions/${hash}`)
  if (!response.ok) throw new Error('Transaction not found')
  const data = await response.json()

  return {
    hash: data.hash,
    successful: data.successful,
    ledger: data.ledger,
    createdAt: data.created_at,
    feeCharged: data.fee_charged,
    memo: data.memo,
  }
}
