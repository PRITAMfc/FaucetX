export enum WalletErrorType {
  WALLET_NOT_FOUND = 'WALLET_NOT_FOUND',
  WALLET_REJECTED = 'WALLET_REJECTED',
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
}

export interface WalletError {
  type: WalletErrorType
  message: string
  details?: string
}

export function handleWalletError(error: unknown): WalletError {
  const err = error as { code?: string; message?: string; name?: string }

  if (
    err?.code === 'WALLET_NOT_FOUND' ||
    err?.message?.toLowerCase().includes('wallet not found') ||
    err?.message?.toLowerCase().includes('no wallet') ||
    err?.message?.toLowerCase().includes('not installed')
  ) {
    return {
      type: WalletErrorType.WALLET_NOT_FOUND,
      message: 'Wallet not found',
      details: 'Please install a Stellar wallet (Freighter, Albedo, LOBSTR) and try again.',
    }
  }

  if (
    err?.code === 'USER_REJECTED' ||
    err?.code === 'REQUEST_DECLINED' ||
    err?.message?.toLowerCase().includes('reject') ||
    err?.message?.toLowerCase().includes('decline') ||
    err?.message?.toLowerCase().includes('cancel') ||
    err?.name === 'TxAbortedError'
  ) {
    return {
      type: WalletErrorType.WALLET_REJECTED,
      message: 'Transaction rejected by user',
      details: 'You rejected the transaction in your wallet. No changes were made.',
    }
  }

  if (
    err?.message?.toLowerCase().includes('insufficient') ||
    err?.message?.toLowerCase().includes('not enough') ||
    err?.message?.includes('op_underfunded')
  ) {
    return {
      type: WalletErrorType.INSUFFICIENT_BALANCE,
      message: 'Insufficient balance',
      details: 'Your wallet does not have enough XLM to complete this transaction.',
    }
  }

  return {
    type: WalletErrorType.WALLET_NOT_FOUND,
    message: err?.message || 'Unknown wallet error',
    details: 'An unexpected error occurred. Please try again.',
  }
}
