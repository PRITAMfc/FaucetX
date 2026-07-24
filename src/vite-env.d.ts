/// <reference types="vite/client" />

interface Window {
  freighterApi?: {
    isConnected: () => Promise<boolean>
    getAddress: () => Promise<string>
    signTransaction: (xdr: string, opts?: { networkPassphrase?: string }) => Promise<string>
  }
  Albedo?: {
    publicKey: (opts?: { network?: string }) => Promise<string>
    pay: (opts: {
      destination: string
      amount: string
      asset?: string
      memo?: string
      network?: string
    }) => Promise<{ txhash: string }>
  }
}
