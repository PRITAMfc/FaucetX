import { z } from 'zod'

const transactionSchema = z.object({
  destination: z.string().min(56).max(56),
  amount: z.number().positive().max(100),
  memo: z.string().max(28).optional(),
})

export const validateTransaction = (data: unknown) => {
  const result = transactionSchema.safeParse(data)

  if (!result.success) {
    return {
      valid: false as const,
      errors: result.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    }
  }

  return { valid: true as const, data: result.data }
}

export const getNetworkInfo = () => {
  return {
    network: 'testnet',
    networkPassphrase: 'Test SDF Network ; September 2015',
    horizonUrl: 'https://horizon-testnet.stellar.org',
  }
}
