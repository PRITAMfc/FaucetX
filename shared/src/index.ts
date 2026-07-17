import { z } from 'zod'

export const walletAddressSchema = z.object({
  address: z.string().min(56, 'Invalid Stellar address').max(56, 'Invalid Stellar address'),
})

export const transactionSchema = z.object({
  destination: z.string().min(56, 'Invalid Stellar address').max(56, 'Invalid Stellar address'),
  amount: z.number().positive('Amount must be positive').max(100, 'Maximum 100 XLM per transaction'),
  memo: z.string().max(28, 'Memo must be 28 characters or less').optional(),
})

export const fundingSchema = z.object({
  address: z.string().min(56, 'Invalid Stellar address').max(56, 'Invalid Stellar address'),
})

export type WalletAddress = z.infer<typeof walletAddressSchema>
export type Transaction = z.infer<typeof transactionSchema>
export type Funding = z.infer<typeof fundingSchema>

export interface WalletInfo {
  address: string
  balance: string
  sequence: string
  subentryCount: number
}

export interface TransactionResult {
  hash: string
  ledger: number
  successful: boolean
  resultXdr: string
  createdAt: string
}

export interface FundingResult {
  success: boolean
  address: string
  funded: boolean
  hash?: string
  error?: string
}

export interface NetworkInfo {
  network: string
  networkPassphrase: string
  horizonUrl: string
}
