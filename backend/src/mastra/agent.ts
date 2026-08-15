import { Agent } from '@mastra/core'
import {
  getBalanceTool,
  fundWalletTool,
  getContractInfoTool,
  getContractEventsTool,
  getTransactionTool,
} from './tools/wallet.js'
import { validateTransactionTool, getNetworkInfoTool } from './tools/transaction.js'
import {
  submitFeedbackTool,
  getFeedbackTool,
  getFeedbackStatsTool,
} from './tools/feedback.js'

export const faucetAgent = new Agent({
  id: 'faucetx-agent',
  name: 'FaucetX Agent',
  description: 'Agent for managing Stellar testnet faucet operations including wallet management, transactions, and feedback analysis.',
  instructions: `You are the FaucetX assistant. You help users with:
1. Checking wallet balances on Stellar testnet
2. Funding testnet wallets via friendbot
3. Validating transaction data
4. Fetching contract and transaction information
5. Analyzing and storing user feedback

Always be helpful, concise, and return structured data when possible.
For wallet operations, use the Stellar testnet Horizon and Soroban RPC endpoints.
For feedback, use Mistral AI to analyze sentiment and category.`,
  model: 'mistral/mistral-small-latest',
  tools: {
    getBalance: getBalanceTool,
    fundWallet: fundWalletTool,
    getContractInfo: getContractInfoTool,
    getContractEvents: getContractEventsTool,
    getTransaction: getTransactionTool,
    validateTransaction: validateTransactionTool,
    getNetworkInfo: getNetworkInfoTool,
    submitFeedback: submitFeedbackTool,
    getFeedback: getFeedbackTool,
    getFeedbackStats: getFeedbackStatsTool,
  },
})
