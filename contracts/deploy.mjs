import * as StellarSdk from '@stellar/stellar-sdk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SOROBAN_RPC_URL = 'https://soroban-testnet.stellar.org'
const HORIZON_URL = 'https://horizon-testnet.stellar.org'
const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET

const server = new StellarSdk.rpc.Server(SOROBAN_RPC_URL, { allowHttp: true })
const horizonServer = new StellarSdk.Horizon.Server(HORIZON_URL)

const WASM_PATH = path.join(__dirname, 'faucet-contract', 'target', 'wasm32-unknown-unknown', 'release', 'faucet_contract.wasm')

async function buildAndSendTransaction(keypair, operations) {
  const sourceAccount = await server.getAccount(keypair.publicKey())
  const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(operations)
    .setTimeout(60)
    .build()

  const preparedTx = await server.prepareTransaction(transaction)
  preparedTx.sign(keypair)

  const response = await server.sendTransaction(preparedTx)
  console.log(`  Tx hash: ${response.hash}`)

  let result = await server.getTransaction(response.hash)
  let attempts = 0
  while (result.status === 'NOT_FOUND' && attempts < 30) {
    await new Promise(r => setTimeout(r, 2000))
    result = await server.getTransaction(response.hash)
    attempts++
    process.stdout.write('.')
  }
  console.log('')

  if (result.status === 'SUCCESS') {
    console.log('  Confirmed!')
    return result
  } else {
    throw new Error(`Transaction failed: ${result.status}`)
  }
}

async function main() {
  console.log('=== FaucetX Contract Deployment ===\n')

  // Step 1: Use provided deployer keypair
  console.log('Step 1: Using deployer keypair...')
  const deployerSecret = 'SAYTYKCTHG27HPGOYMS2DMPY7IHE2LBFN5DIKIEBTMT5RY66M5BDNRP2'
  const deployerKeypair = StellarSdk.Keypair.fromSecret(deployerSecret)
  const deployerPublicKey = deployerKeypair.publicKey()
  console.log(`  Public: ${deployerPublicKey}`)

  // Step 2: Fund the deployer account (skip if already funded)
  console.log('\nStep 2: Funding deployer with testnet XLM...')
  try {
    const friendbotResponse = await fetch(`https://friendbot.stellar.org?addr=${deployerPublicKey}`)
    if (friendbotResponse.ok) {
      console.log('  Account funded!')
    } else {
      console.log('  Account may already be funded, continuing...')
    }
  } catch {
    console.log('  Friendbot unreachable, continuing with existing balance...')
  }

  await new Promise(r => setTimeout(r, 3000))

  // Step 3: Upload WASM
  console.log('\nStep 3: Uploading contract WASM...')
  const wasmBytecode = fs.readFileSync(WASM_PATH)
  console.log(`  WASM size: ${wasmBytecode.length} bytes`)

  const uploadResult = await buildAndSendTransaction(
    deployerKeypair,
    StellarSdk.Operation.uploadContractWasm({ wasm: wasmBytecode })
  )

  const wasmHashBuffer = Buffer.from(uploadResult.returnValue.bytes())
  const wasmHash = wasmHashBuffer.toString('hex')
  console.log(`  WASM hash: ${wasmHash}`)

  // Step 4: Deploy contract
  console.log('\nStep 4: Deploying contract...')
  const deployResult = await buildAndSendTransaction(
    deployerKeypair,
    StellarSdk.Operation.createCustomContract({
      wasmHash: wasmHashBuffer,
      address: StellarSdk.Address.fromString(deployerPublicKey),
      salt: StellarSdk.hash(Date.now().toString()),
    })
  )

  const contractAddress = StellarSdk.StrKey.encodeContract(
    StellarSdk.Address.fromScAddress(
      deployResult.returnValue.address()
    ).toBuffer()
  )
  console.log(`  Contract ID: ${contractAddress}`)

  // Step 5: Initialize contract
  console.log('\nStep 5: Initializing contract...')
  const contract = new StellarSdk.Contract(contractAddress)
  const sourceAccount = await server.getAccount(deployerPublicKey)

  const initTx = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(
      contract.call(
        'initialize',
        StellarSdk.Address.fromString(deployerPublicKey).toScVal(),
        StellarSdk.nativeToScVal('hello', { type: 'symbol' })
      )
    )
    .setTimeout(60)
    .build()

  const preparedInitTx = await server.prepareTransaction(initTx)
  preparedInitTx.sign(deployerKeypair)

  const initResponse = await server.sendTransaction(preparedInitTx)
  console.log(`  Init tx hash: ${initResponse.hash}`)

  let initResult = await server.getTransaction(initResponse.hash)
  let initAttempts = 0
  while (initResult.status === 'NOT_FOUND' && initAttempts < 30) {
    await new Promise(r => setTimeout(r, 2000))
    initResult = await server.getTransaction(initResponse.hash)
    initAttempts++
    process.stdout.write('.')
  }
  console.log('')

  if (initResult.status === 'SUCCESS') {
    console.log('  Contract initialized!')
  }

  // Step 6: Save results
  console.log('\n=== Deployment Complete! ===')
  console.log(`\nContract Address: ${contractAddress}`)
  console.log(`Deployer Secret: ${deployerSecret}`)
  console.log(`Deployer Public: ${deployerPublicKey}`)
  console.log(`Explorer: https://stellar.expert/explorer/testnet/contract/${contractAddress}`)

  const envContent = `# FaucetX Smart Contract (Soroban)
VITE_FAUCET_CONTRACT_ID=${contractAddress}
`
  const envPath = path.join(__dirname, '..', 'frontend', '.env')
  fs.writeFileSync(envPath, envContent)
  console.log(`\nfrontend/.env updated with contract ID`)

  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    deployerSecret,
    deployerPublicKey,
    wasmHash,
    network: 'testnet',
    deployedAt: new Date().toISOString(),
    explorerUrl: `https://stellar.expert/testnet/contract/${contractAddress}`,
  }
  const infoPath = path.join(__dirname, 'deployment.json')
  fs.writeFileSync(infoPath, JSON.stringify(deploymentInfo, null, 2))
  console.log(`deployment.json saved`)
}

main().catch(err => {
  console.error('Deployment failed:', err)
  process.exit(1)
})
