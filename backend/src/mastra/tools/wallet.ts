// @ts-ignore
import { createTool } from '@mastra/core'
// @ts-ignore
import { z } from 'zod'
// @ts-ignore
import { getBalance } from '../utils/wallet.js'
// @ts-ignore
import { fundWallet } from '../utils/wallet.js'
// @ts-ignore
import { getContractInfo } from '../utils/wallet.js'
// @ts-ignore
import { getContractEvents } from '../utils/wallet.js'
// @ts-ignore
import { getTransaction } from '../utils/wallet.js'

export const getBalanceTool = createTool({
  id: 'get-balance',
  description: 'Get the balance of a Stellar testnet wallet address',
  inputSchema: z.object({ address: z.string().min(56).max(56) }),
  outputSchema: z.object({
    address: z.string(),
    balance: z.string(),
    sequence: z.string(),
    subentryCount: z.number(),
  }),
  execute: async (context: any) => getBalance(context.input.address),
})

export const fundWalletTool = createTool({
  id: 'fund-wallet',
  description: 'Fund a Stellar testnet wallet via friendbot',
  inputSchema: z.object({ address: z.string().min(56).max(56) }),
  outputSchema: z.object({
    success: z.boolean(),
    address: z.string(),
    hash: z.string(),
    funded: z.boolean(),
  }),
  execute: async (context: any) => fundWallet(context.input.address),
})

export const getContractInfoTool = createTool({
  id: 'get-contract-info',
  description: 'Get information about a Soroban smart contract',
  inputSchema: z.object({ contractId: z.string() }),
  outputSchema: z.object({
    contractId: z.string(),
    network: z.string(),
    rpcUrl: z.string(),
    explorerUrl: z.string(),
  }),
  execute: async (context: any) => getContractInfo(context.input.contractId),
})

export const getContractEventsTool = createTool({
  id: 'get-contract-events',
  description: 'Get events from a Soroban smart contract',
  inputSchema: z.object({
    contractId: z.string(),
    limit: z.number().optional(),
  }),
  outputSchema: z.object({
    events: z.array(z.any()),
    contractId: z.string(),
  }),
  execute: async (context: any) => getContractEvents(context.input.contractId, context.input.limit),
})

export const getTransactionTool = createTool({
  id: 'get-transaction',
  description: 'Get transaction details from Horizon',
  inputSchema: z.object({ hash: z.string() }),
  outputSchema: z.object({
    hash: z.string(),
    successful: z.boolean(),
    ledger: z.any(),
    createdAt: z.string(),
    feeCharged: z.any(),
    memo: z.any(),
  }),
  execute: async (context: any) => getTransaction(context.input.hash),
})
