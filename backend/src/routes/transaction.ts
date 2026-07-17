import { Router, Request, Response } from 'express'
import { z } from 'zod'
import * as StellarSdk from '@stellar/stellar-sdk'

const router = Router()

const transactionSchema = z.object({
  destination: z.string().min(56).max(56),
  amount: z.number().positive().max(100),
  memo: z.string().max(28).optional(),
})

router.post('/validate', async (req: Request, res: Response) => {
  try {
    const result = transactionSchema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        valid: false,
        errors: result.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      })
    }

    res.json({ valid: true, data: result.data })
  } catch (error) {
    throw error
  }
})

router.get('/network', async (req: Request, res: Response) => {
  res.json({
    network: 'testnet',
    networkPassphrase: StellarSdk.Networks.TESTNET,
    horizonUrl: 'https://horizon-testnet.stellar.org',
  })
})

export { router as transactionRoutes }
