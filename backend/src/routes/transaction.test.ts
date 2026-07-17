import { describe, test, expect } from 'bun:test'
import { z } from 'zod'

const transactionSchema = z.object({
  destination: z.string().min(56).max(56),
  amount: z.number().positive().max(100),
  memo: z.string().max(28).optional(),
})

describe('transaction validation schema', () => {
  const validDest = 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF'

  test('accepts valid transaction data', () => {
    const result = transactionSchema.safeParse({ destination: validDest, amount: 50 })
    expect(result.success).toBe(true)
  })

  test('rejects destination shorter than 56 chars', () => {
    const result = transactionSchema.safeParse({ destination: 'GABC', amount: 10 })
    expect(result.success).toBe(false)
  })

  test('rejects amount over 100', () => {
    const result = transactionSchema.safeParse({ destination: validDest, amount: 100.01 })
    expect(result.success).toBe(false)
  })

  test('accepts optional memo', () => {
    const result = transactionSchema.safeParse({ destination: validDest, amount: 1, memo: 'test' })
    expect(result.success).toBe(true)
  })
})
