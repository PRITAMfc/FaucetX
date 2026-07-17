import { Router, Request, Response } from 'express'
import * as StellarSdk from '@stellar/stellar-sdk'

const router = Router()
const HORIZON_URL = 'https://horizon-testnet.stellar.org'
const server = new StellarSdk.Horizon.Server(HORIZON_URL)

router.get('/balance/:address', async (req: Request, res: Response) => {
  try {
    const { address } = req.params

    if (!address || address.length < 56) {
      return res.status(400).json({ error: 'Invalid Stellar address' })
    }

    const account = await server.loadAccount(address)
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

    if (!response.ok) {
      throw new Error('Friendbot funding failed')
    }

    const result = await response.json()

    res.json({
      success: true,
      address,
      hash: result.hash,
      funded: true,
    })
  } catch (error) {
    throw error
  }
})

export { router as walletRoutes }
