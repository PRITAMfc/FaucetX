import { describe, test, expect } from 'bun:test'
import { handleWalletError, WalletErrorType } from './errors'

describe('handleWalletError', () => {
  test('detects WALLET_NOT_FOUND by code', () => {
    const result = handleWalletError({ code: 'WALLET_NOT_FOUND' })
    expect(result.type).toBe(WalletErrorType.WALLET_NOT_FOUND)
    expect(result.message).toBe('Wallet not found')
  })

  test('detects WALLET_NOT_FOUND by message', () => {
    const result = handleWalletError(new Error('no wallet installed'))
    expect(result.type).toBe(WalletErrorType.WALLET_NOT_FOUND)
  })

  test('detects WALLET_REJECTED by code', () => {
    const result = handleWalletError({ code: 'USER_REJECTED' })
    expect(result.type).toBe(WalletErrorType.WALLET_REJECTED)
    expect(result.message).toBe('Transaction rejected by user')
  })

  test('detects WALLET_REJECTED by message', () => {
    const result = handleWalletError(new Error('User rejected the request'))
    expect(result.type).toBe(WalletErrorType.WALLET_REJECTED)
  })

  test('detects INSUFFICIENT_BALANCE by message', () => {
    const result = handleWalletError(new Error('insufficient funds'))
    expect(result.type).toBe(WalletErrorType.INSUFFICIENT_BALANCE)
    expect(result.message).toBe('Insufficient balance')
  })

  test('detects op_underfunded error', () => {
    const result = handleWalletError({ message: 'op_underfunded' })
    expect(result.type).toBe(WalletErrorType.INSUFFICIENT_BALANCE)
  })

  test('returns default for unknown errors', () => {
    const result = handleWalletError('random string')
    expect(result.type).toBe(WalletErrorType.WALLET_NOT_FOUND)
    expect(result.details).toContain('unexpected error')
  })
})
