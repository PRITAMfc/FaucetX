declare module '../utils/wallet.js' {
  export function getBalance(address: string): Promise<{
    address: string
    balance: string
    sequence: string
    subentryCount: number
  }>
  export function fundWallet(address: string): Promise<{
    success: boolean
    address: string
    hash: string
    funded: boolean
  }>
  export function getContractInfo(contractId: string): Promise<{
    contractId: string
    network: string
    rpcUrl: string
    explorerUrl: string
  }>
  export function getContractEvents(contractId: string, limit?: number): Promise<{
    events: any[]
    contractId: string
  }>
  export function getTransaction(hash: string): Promise<{
    hash: string
    successful: boolean
    ledger: any
    createdAt: string
    feeCharged: any
    memo: any
  }>
}

declare module '../utils/transaction.js' {
  export function validateTransaction(data: unknown): {
    valid: boolean
    data?: any
    errors?: { field: string; message: string }[]
  }
  export function getNetworkInfo(): {
    network: string
    networkPassphrase: string
    horizonUrl: string
  }
}

declare module '../utils/feedback.js' {
  export function submitFeedback(feedback: string, walletAddress?: string): Promise<{
    success: boolean
    id: string
    aiResponse: string
    sentiment: string
    category: string
  }>
  export function getFeedback(limit?: number): Promise<{
    count: number
    feedback: any[]
  }>
  export function getFeedbackStats(): Promise<{
    total: number
    sentiments: Record<string, number>
    categories: Record<string, number>
  }>
}
