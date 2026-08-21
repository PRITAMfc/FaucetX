import * as StellarSdk from '@stellar/stellar-sdk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SOROBAN_RPC_URL = 'https://soroban-testnet.stellar.org'
const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET
const FRIENDBOT_URL = 'https://friendbot.stellar.org'

// FaucetX contract receiving the testnet XLM
const FAUCET_CONTRACT = 'CBE3LXOSOKBPOWGZ6HVJXAEYILPFXHCEFWMYQA7CJIR63JRCMIXEU7DC'
// Native XLM Stellar Asset Contract on testnet
const XLM_SAC = 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC'

const server = new StellarSdk.rpc.Server(SOROBAN_RPC_URL, { allowHttp: true })

const XLM_TO_SEND = '2' // XLM per wallet
const AMOUNT_STROOPS = BigInt(Number(XLM_TO_SEND) * 10_000_000)

// Optional: provide a first wallet via env (never hardcode secrets in the repo)
const USER_SECRET = process.env.FAUCET_FIRST_SECRET

const TOTAL_WALLETS = Number(process.env.WALLET_COUNT ?? 50) // generated wallets
const MAX_RETRIES = 5
const RETRY_DELAY_MS = 5000

async function fundWithFriendbot(publicKey) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(`${FRIENDBOT_URL}?addr=${publicKey}`)
      if (res.ok) return
      const body = await res.text()
      throw new Error(`Friendbot failed for ${publicKey}: ${res.status} ${body.slice(0, 200)}`)
    } catch (err) {
      if (attempt === MAX_RETRIES) throw err
      console.log(`retry ${attempt}/${MAX_RETRIES - 1} after ${RETRY_DELAY_MS}ms (${err.message.slice(0, 80)})`)
      await new Promise(r => setTimeout(r, RETRY_DELAY_MS * attempt))
    }
  }
}

async function sendWithRetry(fn, label) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn()
    } catch (err) {
      if (attempt === MAX_RETRIES) throw err
      console.log(`  ${label} retry ${attempt}/${MAX_RETRIES - 1}: ${err.message.slice(0, 100)}`)
      await new Promise(r => setTimeout(r, RETRY_DELAY_MS))
    }
  }
}

async function sendXlmToContract(keypair) {
  const sourceAccount = await server.getAccount(keypair.publicKey())

  const xlmContract = new StellarSdk.Contract(XLM_SAC)
  const tx = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(
      xlmContract.call(
        'transfer',
        StellarSdk.nativeToScVal(keypair.publicKey(), { type: 'address' }),
        StellarSdk.nativeToScVal(FAUCET_CONTRACT, { type: 'address' }),
        StellarSdk.nativeToScVal(AMOUNT_STROOPS, { type: 'i128' })
      )
    )
    .setTimeout(60)
    .build()

  const preparedTx = await server.prepareTransaction(tx)
  preparedTx.sign(keypair)

  const sendResponse = await server.sendTransaction(preparedTx)
  if (sendResponse.status === 'ERROR') {
    throw new Error(`sendTransaction error: ${sendResponse.errorResult?.result?.code ?? 'unknown'}`)
  }

  const finalResult = await server.pollTransaction(sendResponse.hash)
  if (finalResult.status !== 'SUCCESS') {
    throw new Error(`Transaction not successful: ${finalResult.status}`)
  }

  return sendResponse.hash
}

async function main() {
  console.log('=== Funding testnet wallets and sending XLM to the FaucetX contract ===\n')
  console.log(`FaucetX contract: ${FAUCET_CONTRACT}`)
  console.log(`XLM SAC:          ${XLM_SAC}`)
  console.log(`Amount per wallet: ${XLM_TO_SEND} XLM (${AMOUNT_STROOPS} stroops)\n`)

  const wallets = []
  if (USER_SECRET) {
    const userKeypair = StellarSdk.Keypair.fromSecret(USER_SECRET)
    wallets.push({ public: userKeypair.publicKey(), secret: userKeypair.secret(), source: 'user-provided' })
  }
  for (let i = 0; i < TOTAL_WALLETS; i++) {
    const kp = StellarSdk.Keypair.random()
    wallets.push({ public: kp.publicKey(), secret: kp.secret(), source: 'generated' })
  }

  const rows = []

  for (let i = 0; i < wallets.length; i++) {
    const w = wallets[i]
    const keypair = StellarSdk.Keypair.fromSecret(w.secret)
    console.log(`\n[${i + 1}/${wallets.length}] ${w.public} (${w.source})`)

    process.stdout.write('  Funding via Friendbot... ')
    try {
      await sendWithRetry(() => fundWithFriendbot(w.public), 'fund')
      console.log('OK')
    } catch (err) {
      console.log(`FAILED → ${err.message}`)
      continue
    }

    await new Promise(r => setTimeout(r, 1500))

    process.stdout.write(`  Transferring ${XLM_TO_SEND} XLM → faucet contract... `)
    try {
      const txHash = await sendWithRetry(() => sendXlmToContract(keypair), 'transfer')
      console.log('SUCCESS')
      console.log(`  Tx hash: ${txHash}`)
      rows.push({
        wallet: w.public,
        hash: txHash,
        explorer: `https://stellar.expert/explorer/testnet/tx/${txHash}`,
      })
    } catch (err) {
      console.log(`FAILED → ${err.message}`)
    }

    // small pause between wallets to stay friendly to friendbot/rpc rate limits
    await new Promise(r => setTimeout(r, 1000))
  }

  const outputPath = path.join(__dirname, 'testnet-interactions.json')
  fs.writeFileSync(outputPath, JSON.stringify(rows, null, 2))
  console.log(`\n=== Complete! ${rows.length}/${wallets.length} successful interactions ===`)
  console.log(`Saved to ${outputPath}`)

  console.log('\nWALLET, TX HASH')
  for (const row of rows) {
    console.log(`${row.wallet}, ${row.hash}`)
  }
}

main().catch(err => {
  console.error('Script failed:', err)
  process.exit(1)
})
