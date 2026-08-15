// @ts-ignore
import { createTool } from '@mastra/core'
// @ts-ignore
import { z } from 'zod'
// @ts-ignore
import { validateTransaction } from '../utils/transaction.js'
// @ts-ignore
import { getNetworkInfo } from '../utils/transaction.js'

export const validateTransactionTool = createTool({
  id: 'validate-transaction',
  description: 'Validate a Stellar transaction payload',
  inputSchema: z.object({
    destination: z.string().min(56).max(56),
    amount: z.number().positive().max(100),
    memo: z.string().max(28).optional(),
  }),
  outputSchema: z.object({
    valid: z.boolean(),
    data: z.any().optional(),
    errors: z.array(z.object({ field: z.string(), message: z.string() })).optional(),
  }),
  execute: async (context: any) => validateTransaction(context.input),
})

export const getNetworkInfoTool = createTool({
  id: 'get-network-info',
  description: 'Get Stellar testnet network information',
  inputSchema: z.object({}),
  outputSchema: z.object({
    network: z.string(),
    networkPassphrase: z.string(),
    horizonUrl: z.string(),
  }),
  execute: async () => getNetworkInfo(),
})
