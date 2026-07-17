import {
  StellarWalletsKit,
  Networks,
} from '@creit.tech/stellar-wallets-kit'
import { defaultModules } from '@creit.tech/stellar-wallets-kit/modules/utils'

let initialized = false

export function initWalletKit() {
  if (initialized) return

  StellarWalletsKit.init({
    network: Networks.TESTNET,
    modules: defaultModules(),
  })

  initialized = true
}

export { StellarWalletsKit, Networks }
