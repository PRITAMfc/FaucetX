import * as StellarSdk from '@stellar/stellar-sdk'

export const TESTNET_NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET
export const SOROBAN_RPC_URL = 'https://soroban-testnet.stellar.org'
export const HORIZON_URL = 'https://horizon-testnet.stellar.org'

export const FAUCET_CONTRACT_ID = import.meta.env.VITE_FAUCET_CONTRACT_ID || ''

export const server = new StellarSdk.Horizon.Server(HORIZON_URL)
export const sorobanServer = new StellarSdk.SorobanRpc.Server(SOROBAN_RPC_URL)
