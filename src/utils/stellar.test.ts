import { describe, test, expect } from 'bun:test'
import { isValidStellarAddress, formatXLM } from './stellar'

describe('isValidStellarAddress', () => {
  test('accepts a valid 56-char address', () => {
    const addr = 'G'.repeat(56)
    expect(isValidStellarAddress(addr)).toBe(true)
  })

  test('accepts a 55-char address', () => {
    const addr = 'G'.repeat(55)
    expect(isValidStellarAddress(addr)).toBe(true)
  })

  test('rejects short address', () => {
    expect(isValidStellarAddress('GABC123')).toBe(false)
  })

  test('rejects address with invalid chars', () => {
    expect(isValidStellarAddress('0OIl'.padEnd(56, 'G'))).toBe(false)
  })

  test('rejects empty string', () => {
    expect(isValidStellarAddress('')).toBe(false)
  })
})

describe('formatXLM', () => {
  test('formats a balance string to 2 decimal places', () => {
    expect(formatXLM('10.5')).toBe('10.50 XLM')
  })

  test('formats zero balance', () => {
    expect(formatXLM('0')).toBe('0.00 XLM')
  })

  test('rounds to 2 decimals', () => {
    expect(formatXLM('1.23456')).toBe('1.23 XLM')
  })
})
