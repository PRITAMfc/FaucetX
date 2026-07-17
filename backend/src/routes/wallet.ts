import { Router, Request, Response } from 'express'
import * as StellarSdk from '@stellar/stellar-sdk'

const router = Router()
const SOROBAN_RPC_URL = 'https://soroban-testnet.stellar.org'
const HORIZON_URL = 'https://horizon-testnet.stellar.org'

const sorobanServer = new StellarSdk.SorobanRpc.Server(SOROBAN_RPC_URL)
const horizonServer = new StellarSdk.Horizon.Server(HORIZON_URL)

router.get('/balance/:address', async (req: Request, res: Response) => {
  try {
    const { address } = req.params
    if (!address || address.length < 56) {
      return res.status(400).json({ error: 'Invalid Stellar address' })
    }

    const account = await horizonServer.loadAccount(address)
    const xlmBalance = account.balances.find((b) => b.asset_type === 'native')

    res.json({
      address,
      balance: xlmBalance ? xlmBalance.balance : '0',
      sequence: account.sequence,
      subentryCount: account.subentry_count,
    })
  } catch (error) {
    if ((error as any).response?.status === 404) {
      return res.json({
        address: req.params.address,
        balance: '0',
        sequence: '0',
        subentryCount: 0,
        isNew: true,
      })
    }
    throw error
  }
})

router.post('/fund', async (req: Request, res: Response) => {
  try {
    const { address } = req.body
    if (!address || address.length < 56) {
      return res.status(400).json({ error: 'Invalid Stellar address' })
    }

    const friendbotUrl = `https://friendbot.stellar.org?addr=${encodeURIComponent(address)}`
    const response = await fetch(friendbotUrl)

    if (!response.ok) throw new Error('Friendbot funding failed')
    const result = await response.json()

    res.json({ success: true, address, hash: result.hash, funded: true })
  } catch (error) {
    throw error
  }
})

router.get('/contract/:contractId', async (req: Request, res: Response) => {
  try {
    const { contractId } = req.params
    res.json({
      contractId,
      network: 'testnet',
      rpcUrl: SOROBAN_RPC_URL,
      explorerUrl: `https://stellar.expert/testnet/contract/${contractId}`,
    })
  } catch (error) {
    throw error
  }
})

router.get('/contract/:contractId/events', async (req: Request, res: Response) => {
  try {
    const { contractId } = req.params
    const limit = parseInt(req.query.limit as string) || 10

    const response = await fetch(
      `${SOROBAN_RPC_URL}/contracts/${contractId}/events?limit=${limit}`
    )
    const data = await response.json()

    res.json({ events: data.events || [], contractId })
  } catch (error) {
    res.json({ events: [], contractId: req.params.contractId })
  }
})

router.get('/tx/:hash', async (req: Request, res: Response) => {
  try {
    const { hash } = req.params
    const response = await fetch(`${HORIZON_URL}/transactions/${hash}`)
    const data = await response.json()

    res.json({
      hash: data.hash,
      successful: data.successful,
      ledger: data.ledger,
      createdAt: data.created_at,
      feeCharged: data.fee_charged,
      memo: data.memo,
    })
  } catch (error) {
    res.status(404).json({ error: 'Transaction not found' })
  }
})

export { router as walletRoutes }
