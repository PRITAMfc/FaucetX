import { describe, test, expect } from 'bun:test'
import {
  walletAddressSchema,
  transactionSchema,
  fundingSchema,
} from './index'

describe('walletAddressSchema', () => {
  test('accepts a valid 56-char Stellar address', () => {
    const addr = 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF'
    const result = walletAddressSchema.safeParse({ address: addr })
    expect(result.success).toBe(true)
  })

  test('rejects address shorter than 56 chars', () => {
    const result = walletAddressSchema.safeParse({ address: 'GABC123' })
    expect(result.success).toBe(false)
  })

  test('rejects non-string input', () => {
    const result = walletAddressSchema.safeParse({ address: 12345 })
    expect(result.success).toBe(false)
  })
})

describe('transactionSchema', () => {
  test('accepts a valid transaction', () => {
    const dest = 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF'
    const result = transactionSchema.safeParse({ destination: dest, amount: 10 })
    expect(result.success).toBe(true)
    expect(result.data?.amount).toBe(10)
  })

  test('rejects amount exceeding 100 XLM', () => {
    const dest = 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF'
    const result = transactionSchema.safeParse({ destination: dest, amount: 101 })
    expect(result.success).toBe(false)
  })

  test('rejects negative amount', () => {
    const dest = 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF'
    const result = transactionSchema.safeParse({ destination: dest, amount: -5 })
    expect(result.success).toBe(false)
  })

  test('accepts optional memo within 28 chars', () => {
    const dest = 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF'
    const result = transactionSchema.safeParse({ destination: dest, amount: 1, memo: 'hello' })
    expect(result.success).toBe(true)
  })

  test('rejects memo exceeding 28 chars', () => {
    const dest = 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF'
    const result = transactionSchema.safeParse({ destination: dest, amount: 1, memo: 'a'.repeat(29) })
    expect(result.success).toBe(false)
  })
})

describe('fundingSchema', () => {
  test('accepts a valid address', () => {
    const addr = 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF'
    const result = fundingSchema.safeParse({ address: addr })
    expect(result.success).toBe(true)
  })

  test('rejects empty address', () => {
    const result = fundingSchema.safeParse({ address: '' })
    expect(result.success).toBe(false)
  })
})
