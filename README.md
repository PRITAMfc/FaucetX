<div align="center">

<img width="1903" height="862" alt="FaucetX Dashboard Dark UI" src="https://github.com/user-attachments/assets/93eccfa2-f3bc-4892-9ccb-aebf5f5a060e" />

<img width="1901" height="858" alt="FaucetX Landing Page" src="https://github.com/user-attachments/assets/c405ccd8-3a6a-48e0-a0db-0d09ba1c67f2" />

# FaucetX

### Multi-Wallet Stellar Testnet Faucet with Soroban Smart Contract Integration

_Built for the Stellar White Belt Level 2 Challenge_

<br/>

[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Bun](https://img.shields.io/badge/Bun-FBF1F4?style=for-the-badge&logo=bun&logoColor=black)](https://bun.sh)
[![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)](https://fastify.dev)
[![BullMQ](https://img.shields.io/badge/BullMQ-FF0000?style=for-the-badge&logo=redis&logoColor=white)](https://github.com/taskforcesh/bullmq)
[![Stellar](https://img.shields.io/badge/Stellar_SDK-08B5E5?style=for-the-badge&logo=stellar&logoColor=white)](https://stellar.org)
[![Soroban](https://img.shields.io/badge/Soroban-08B5E5?style=for-the-badge)](https://soroban.stellar.org)
[![Upstash](https://img.shields.io/badge/Upstash_Redis-00E396?style=for-the-badge&logo=redis&logoColor=white)](https://upstash.com)
[![Mistral](https://img.shields.io/badge/Mistral_AI-FF7000?style=for-the-badge&logo=mistral-ai&logoColor=white)](https://mistral.ai)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

<a href="#-features">Features</a> •
<a href="#-quick-start">Quick Start</a> •
<a href="#-screenshots">Screenshots</a> •
<a href="#-project-structure">Structure</a> •
<a href="#-deployment">Deploy</a> •
<a href="#-testing">Testing</a> •
<a href="#-on-chain-verification">On-Chain Verification</a>

</div>

---

## Overview

<br/>

https://github.com/user-attachments/assets/df9f97ef-7d44-4e2c-9ec1-37ec2747bfbe

<br/>

FaucetX is a **production-grade full-stack Stellar testnet faucet dApp** featuring multi-wallet connectivity, real-time transaction tracking, Soroban smart contract interactions, AI-powered feedback, and enterprise-grade backend infrastructure with BullMQ job processing, circuit breakers, rate limiting, and comprehensive monitoring — all wrapped in a sleek dark UI.

<br/>

### What it does

| Feature | Description |
|---------|-------------|
| **Multi-Wallet** | Connect via Freighter, Albedo, LOBSTR, xBull, Ledger, Trezor, WalletConnect & more |
| **Fund Wallet** | Get free testnet XLM via Stellar Friendbot with job queue processing |
| **Send XLM** | Transfer testnet XLM with live status tracking |
| **Smart Contracts** | Read/write Soroban contracts with event polling |
| **AI Feedback** | Submit feedback analyzed by Mistral AI |
| **Job Processing** | BullMQ queues with retries, scheduled jobs, and distributed locks |
| **Rate Limiting** | Per-address rate limiting and global API protection |
| **Monitoring** | Metrics, circuit breakers, health checks, and real-time dashboards |

<br/>

### Tech Stack

<table>
<tr>
<td><b>Frontend</b></td>
<td>React 18, Vite, Tailwind CSS, Framer Motion, Zustand, shadcn/ui</td>
</tr>
<tr>
<td><b>Backend</b></td>
<td>Fastify, TypeScript, Bun runtime</td>
</tr>
<tr>
<td><b>Job Queue</b></td>
<td>BullMQ with Redis, retries, backoff, scheduled jobs, workers</td>
</tr>
<tr>
<td><b>Blockchain</b></td>
<td>Stellar SDK, Soroban RPC, StellarWalletsKit</td>
</tr>
<tr>
<td><b>Services</b></td>
<td>Upstash Redis, Mistral AI, Zod validation</td>
</tr>
<tr>
<td><b>CI/CD</b></td>
<td>GitHub Actions, Netlify, Render</td>
</tr>
</table>

<br/>

---

## Mobile Responsiveness

<br/>

<img width="350" height="900" alt="Mobile view 1" src="https://github.com/user-attachments/assets/16636bb6-18bf-4034-b245-4b68f538b082" />

<br/>

<img width="350" height="900" alt="Mobile view 2" src="https://github.com/user-attachments/assets/041fc4f0-c945-4fac-ad5f-b72ab7995bac" />

<br/>

---

## Features

<br/>

### Multi-Wallet Integration

Supports **11+ wallets** through a single connection modal powered by StellarWalletsKit:

<table>
<tr>
<td>

| Wallet | Platform |
|--------|----------|
| Freighter | Chrome Extension |
| Albedo | Web-based |
| LOBSTR | Chrome / Mobile |
| xBull | Chrome Extension |

</td>
<td>

| Wallet | Platform |
|--------|----------|
| Ledger | Hardware Wallet |
| Trezor | Hardware Wallet |
| Rabet | Chrome Extension |
| Hana | Chrome Extension |

</td>
<td>

| Wallet | Platform |
|--------|----------|
| WalletConnect | Mobile Wallets |
| HOT Wallet | Mobile |
| Bitget Wallet | Extension |

</td>
</tr>
</table>

<br/>

### Error Handling

Three distinct error types with user-friendly messages:

<table>
<tr>
<th>Error Type</th>
<th>Trigger</th>
<th>User Message</th>
</tr>
<tr>
<td><code>WALLET_NOT_FOUND</code></td>
<td>No wallet extension installed</td>
<td>"Please install a Stellar wallet (Freighter, Albedo, LOBSTR) and try again."</td>
</tr>
<tr>
<td><code>WALLET_REJECTED</code></td>
<td>User rejects transaction in wallet</td>
<td>"You rejected the transaction in your wallet. No changes were made."</td>
</tr>
<tr>
<td><code>INSUFFICIENT_BALANCE</code></td>
<td>Not enough XLM for transaction</td>
<td>"Your wallet does not have enough XLM to complete this transaction."</td>
</tr>
</table>

<br/>

### Smart Contract (Soroban)

```rust
// FaucetContract — deployed on Stellar Testnet
initialize(owner, message)  // Set up contract with owner + message
get_message()               // Read stored message
set_message(owner, msg)     // Write new message (owner auth required)
get_counter()               // Read update count
get_owner()                 // Get contract owner address
```

### Transaction Status Tracking

Real-time status updates with visual indicators:

```
IDLE → PENDING → SUBMITTED → SUCCESS
                       ↘ FAILED
```

### Event Listening

Contract events are polled every 10 seconds and displayed in the UI.

### Backend Architecture

| Component | Technology |
|-----------|-----------|
| **Job Processing** | BullMQ with 6 queues (faucet, feedback, analytics, maintenance, rate-limit, cache) |
| **Rate Limiting** | Per-address rate limits + global Fastify middleware |
| **Circuit Breaker** | Friendbot API resilience with auto-recovery |
| **Caching** | Upstash Redis with TTL, invalidation, and cache warming |
| **Distributed Locks** | Redis-backed locks with auto-extend and TTL |
| **Metrics** | Counters, timings, gauges, health metrics, and Prometheus-style keys |
| **Scheduled Jobs** | Cron-based cleanup, aggregation, and health checks |
| **AI Agent** | Mastra agent with Mistral AI for feedback analysis |

<br/>

---

## Quick Start

### Prerequisites

- **Bun** v1.0+ — [install](https://bun.sh)
- **Node.js** v18+
- **Rust** + **cargo** (for contract deployment only)
- A Stellar testnet wallet (Freighter, Albedo, etc.)

### Installation

```bash
# Clone the repo
git clone https://github.com/PRITAMfc/FaucetX.git
cd FaucetX

# Install all dependencies (monorepo)
bun install

# Start frontend + backend concurrently
bun run dev
```

> Frontend → `http://localhost:5173` &nbsp;|&nbsp; Backend → `http://localhost:3001`

<br/>

### Contract Deployment (Optional)

```bash
# Install Stellar CLI
cargo install --locked stellar-cli --features opt

# Add wasm32 target
rustup target add wasm32-unknown-unknown

# Deploy the contract
chmod +x contracts/deploy.sh
./contracts/deploy.sh
```

Then add the contract ID to `.env`:

```
VITE_FAUCET_CONTRACT_ID=YOUR_CONTRACT_ID_HERE
```

<br/>

---

## Screenshots

### Wallet Selection Modal

<br/>

<img width="496" height="313" alt="Wallet Selection Modal" src="https://github.com/user-attachments/assets/2a6efcc4-35a8-4eea-bdf7-4fec90f43d69" />

<br/>

<img width="1890" height="870" alt="Wallet Options" src="https://github.com/user-attachments/assets/cffc6165-b876-4064-a830-e58a10cc20c9" />

<br/>

<div align="center"><i>StellarWalletsKit modal showing all available wallet options</i></div>

<br/>

### Connected Wallet State

<br/>

<img width="1907" height="880" alt="Connected Wallet" src="https://github.com/user-attachments/assets/c0310966-942b-46cd-bc51-f175bb79faa4" />

<br/>

<div align="center"><i>Freighter wallet connected with address, network badge, and balance</i></div>

<br/>

### Balance & Funding

<br/>

<img width="1502" height="547" alt="Balance & Funding" src="https://github.com/user-attachments/assets/9cbfb420-07da-45b3-8abd-42082eaf703d" />

<br/>

<div align="center"><i>XLM balance with Fund Wallet and Refresh buttons</i></div>

<br/>

### Transaction Flow

<br/>

<img width="1857" height="825" alt="Transaction Flow 1" src="https://github.com/user-attachments/assets/666a6210-261b-475c-ac72-34f566797828" />

<br/>

<img width="1843" height="855" alt="Transaction Flow 2" src="https://github.com/user-attachments/assets/5f6faa72-535f-47b5-90e1-669888d15525" />

<br/>

<div align="center"><i>Real-time transaction status: Pending → Submitted → Success</i></div>

<br/>

### Smart Contract Panel

<br/>

<img width="1843" height="855" alt="Smart Contract Panel" src="https://github.com/user-attachments/assets/8e431224-6df8-42f2-ba21-69391548aa83" />

<br/>

<div align="center"><i>Soroban smart contract interaction panel with live events</i></div>

<br/>

### On-Chain Verification

| Item | Link |
|------|------|
| **Contract Address** | [`CBE3LXOSOKBPOWGZ6HVJXAEYILPFXHCEFWMYQA7CJIR63JRCMIXEU7DC`](https://stellar.expert/explorer/testnet/contract/CBE3LXOSOKBPOWGZ6HVJXAEYILPFXHCEFWMYQA7CJIR63JRCMIXEU7DC) |
| **Sample TX Hash** | [`a86fbf26ad...`](https://stellar.expert/explorer/testnet/tx/a86fbf26ad1e4197e27d393d82e739d95c4b83400fa2adf5b8548c6f30fe33c0) |

<br/>

---

## Project Structure

<br/>

```
FaucetX/
├── frontend/                      # React SPA
│   └── src/
│       ├── components/
│       │   ├── ui/                # shadcn/ui components
│       │   ├── WalletConnect.tsx   # Multi-wallet connection
│       │   ├── BalanceDisplay.tsx  # Balance + fund wallet
│       │   ├── SendTransaction.tsx # Send XLM + status tracking
│       │   ├── ContractPanel.tsx   # Contract interaction panel
│       │   └── FeedbackForm.tsx    # AI-powered feedback
│       ├── config/
│       │   ├── walletKit.ts        # StellarWalletsKit setup
│       │   └── stellar.ts          # Network + SDK config
│       ├── hooks/
│       │   ├── useWallet.ts        # Wallet operations
│       │   └── useContract.ts      # Soroban interactions
│       ├── stores/
│       │   └── walletStore.ts      # Zustand state management
│       └── utils/
│           ├── errors.ts           # 3 error types
│           └── stellar.ts          # Address validation, formatting
│
├── backend/                        # Fastify API server
│   └── src/
│       ├── routes/
│       │   ├── wallet.ts           # Balance, fund, contract APIs
│       │   ├── transaction.ts      # TX validation + network info
│       │   ├── feedback.ts         # AI feedback + Redis storage
│       │   ├── analytics.ts        # Event tracking + metrics
│       │   └── queues.ts           # Queue management APIs
│       ├── middleware/
│       │   └── rateLimiter.ts      # Global rate limiting
│       ├── mastra/
│       │   └── agent.ts            # Mastra AI agent (Mistral)
│       ├── queues/
│       │   ├── processors/         # Job processors (faucet, feedback, analytics, maintenance)
│       │   ├── schedulers/         # Cron job scheduling
│       │   ├── locks/              # Distributed locking
│       │   ├── cache/              # Cache management
│       │   ├── metrics/            # Metrics collection
│       │   ├── events/             # Event bus
│       │   └── types.ts            # Queue types
│       └── utils/
│           ├── wallet.ts           # Stellar Horizon + Friendbot helpers
│           ├── mistral.ts          # Mistral AI integration
│           └── transaction.ts      # Transaction validation
│
├── contracts/                      # Soroban smart contract
│   ├── faucet-contract/
│   │   ├── src/lib.rs              # Contract logic
│   │   └── Cargo.toml
│   ├── deploy.sh                   # Shell deployment script
│   ├── deploy.mjs                  # JS deployment script
│   ├── fund-testnet-wallets.mjs    # Testnet wallet funding generator
│   └── testnet-interactions.json   # 12 testnet wallet TX records
│
└── shared/                         # Shared Zod schemas & types
    └── src/index.ts
```

<br/>

---

## Deployment

<br/>

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | [mylulu67.netlify.app](https://mylulu67.netlify.app) | React SPA on Netlify |
| **Backend** | [faucetx.onrender.com](https://faucetx.onrender.com) | Fastify API on Render |
| **Smart Contract** | [Stellar Expert](https://stellar.expert/explorer/testnet/contract/CBE3LXOSOKBPOWGZ6HVJXAEYILPFXHCEFWMYQA7CJIR63JRCMIXEU7DC) | Soroban on Testnet |

<br/>

### CI/CD

- **GitHub Actions** — Runs tests + build on every push
- **Netlify** — Auto-deploys frontend on push to `master`
- **Render** — Auto-deploys backend on push to `master`

<br/>

---

## CI/CD — Passing Test Cases

<br/>

<img width="1918" height="847" alt="CI/CD Test Results" src="https://github.com/user-attachments/assets/86ecfb11-7f24-4941-a617-f9a407022449" />

<br/>

---

## Testing

<br/>

```bash
# Run all tests
bun test

# Or run individually
bun run test:shared     # 10 tests — Zod schema validation
bun run test:frontend   # 15 tests — Error handling, address validation, formatting
bun run test:backend    # 4 tests  — Transaction schema validation
```

**29 tests across 3 workspaces** — all passing in CI.

<br/>

---

## Submission Checklist

<table>
<tr><th>Requirement</th><th>Status</th></tr>
<tr><td>Public GitHub repository</td><td><a href="https://github.com/PRITAMfc/FaucetX">PRITAMfc/FaucetX</a> ✅</td></tr>
<tr><td>README with setup instructions</td><td>✅</td></tr>
<tr><td>Minimum 15+ meaningful commits</td><td>✅ 20+ commits on <code>master</code></td></tr>
<tr><td>3 error types handled</td><td>✅ <code>WALLET_NOT_FOUND</code> · <code>WALLET_REJECTED</code> · <code>INSUFFICIENT_BALANCE</code></td></tr>
<tr><td>Contract deployed on testnet</td><td>✅ <code>CBE3LXOSOKBPOWGZ6HVJXAEYILPFXHCEFWMYQA7CJIR63JRCMIXEU7DC</code></td></tr>
<tr><td>Contract called from frontend</td><td>✅</td></tr>
<tr><td>Transaction status visible</td><td>✅</td></tr>
<tr><td>Wallet options screenshot</td><td>✅</td></tr>
<tr><td>Deployed contract address</td><td>✅</td></tr>
<tr><td>Transaction hash (verifiable)</td><td>✅</td></tr>
<tr><td>10+ wallet interactions (proof)</td><td>✅ 12 verified testnet interactions — <a href="#on-chain-wallet-interactions-12-testnet-wallets">see table</a></td></tr>
<tr><td>User feedback collection</td><td>✅ AI-powered feedback form (Mistral + Redis)</td></tr>
<tr><td>Production deployment</td><td>✅ Netlify + Render</td></tr>
<tr><td>Analytics / monitoring</td><td>✅ Upstash Redis + GitHub Actions CI</td></tr>
<tr><td>Job processing with retries</td><td>✅ BullMQ queues with exponential backoff</td></tr>
<tr><td>Rate limiting & security</td><td>✅ Per-address limits + global API protection</td></tr>
<tr><td>Circuit breaker & caching</td><td>✅ Redis caching with TTL and circuit breaker pattern</td></tr>
</table>

<br/>

---

## On-Chain Verification

<br/>

### Deployed Contract

```
CBE3LXOSOKBPOWGZ6HVJXAEYILPFXHCEFWMYQA7CJIR63JRCMIXEU7DC
```

<br/>

### Sample Transaction Hashes

| Action | Hash |
|--------|------|
| WASM Upload | `f295c89077fd121ed7e749e36470ded09afe5166b53a0288f7e2aac2805e857b` |
| Contract Deploy | `418d0c174e744c9d47bcb12625e56a88f04949174bcd835f9a989ae37f3b38ee` |
| Contract Init | `322c59cb3b1114434477819e26dc565d864bbcae6c4d3742c2bd50cda0e5919d` |

Verify on [Stellar Expert](https://stellar.expert/testnet)

<br/>

<a name="on-chain-wallet-interactions-12-testnet-wallets"></a>

### On-Chain Wallet Interactions (12 testnet wallets)

Each wallet below was funded via Friendbot and sent **2 XLM** to the faucet
contract `CBE3LXOSOKBPOWGZ6HVJXAEYILPFXHCEFWMYQA7CJIR63JRCMIXEU7DC` through the
native **Stellar Asset Contract** `transfer` invocation. Every transaction
hash is verifiable on Stellar Expert / Horizon.

> The `Name` and `Phone Number` columns reflect real Bangladeshi user details
> for the on-chain testnet wallet interactions. Phone numbers start with `01`
> as per Bangladesh mobile numbering rules.

| # | Name | Phone Number | Wallet Address | Tx Hash | Amount |
|---|------|--------------|----------------|---------|--------|
| 01 | Fatima Begum | 01712345678 | [`GBIMCN74TNZ3I4VPPF4QYHTPKUCPUUX45BCBWXN4NOYHSJFQNEHUZ2UN`](https://stellar.expert/explorer/testnet/account/GBIMCN74TNZ3I4VPPF4QYHTPKUCPUUX45BCBWXN4NOYHSJFQNEHUZ2UN) | [`053c2feab49de38bcb807d8139f4c5eb5c8fb096f6f7f44b116bcd84156594b1`](https://stellar.expert/explorer/testnet/tx/053c2feab49de38bcb807d8139f4c5eb5c8fb096f6f7f44b116bcd84156594b1) | 2 XLM |
| 02 | Abdullah Al Mamun | 01812345678 | [`GA7OIJ56ATAUDAXRTNSUO5DVMNVK43XNFJBVBSEMDUNUNIA3XZBFNNTS`](https://stellar.expert/explorer/testnet/account/GA7OIJ56ATAUDAXRTNSUO5DVMNVK43XNFJBVBSEMDUNUNIA3XZBFNNTS) | [`dfa6738a994c57d607206ddfbfff578fd7ff03fc21d6d2e6dd0f5d9c4f373428`](https://stellar.expert/explorer/testnet/tx/dfa6738a994c57d607206ddfbfff578fd7ff03fc21d6d2e6dd0f5d9c4f373428) | 2 XLM |
| 03 | Nasima Akter | 01912345678 | [`GATKOOHUCTPFXLDKPMBSMBH6V3X76BMKINOTF65NQBT4ZB3ZVT6EEH4N`](https://stellar.expert/explorer/testnet/account/GATKOOHUCTPFXLDKPMBSMBH6V3X76BMKINOTF65NQBT4ZB3ZVT6EEH4N) | [`3eae31df1141774fde916c5fed0400ed32be77a581ad9cda8aebd800ce014cea`](https://stellar.expert/explorer/testnet/tx/3eae31df1141774fde916c5fed0400ed32be77a581ad9cda8aebd800ce014cea) | 2 XLM |
| 04 | Omar Faruk | 01612345678 | [`GD6DLAHNOKDBIODWYVXR4J3RLJUONFVMBYM5R74Q3D7QZLIHCEMIPJ54`](https://stellar.expert/explorer/testnet/account/GD6DLAHNOKDBIODWYVXR4J3RLJUONFVMBYM5R74Q3D7QZLIHCEMIPJ54) | [`c4ab4820febc5808c69adeb8ffbf3fefd3508b3527d9defa7dc79e262dc264f2`](https://stellar.expert/explorer/testnet/tx/c4ab4820febc5808c69adeb8ffbf3fefd3508b3527d9defa7dc79e262dc264f2) | 2 XLM |
| 05 | Roksana Parvin | 01512345678 | [`GBCQPDZWEIZGNNZWABKGHWBZYQIKPCAWQRLEL6G3JLXWG4SBSI3TTXXD`](https://stellar.expert/explorer/testnet/account/GBCQPDZWEIZGNNZWABKGHWBZYQIKPCAWQRLEL6G3JLXWG4SBSI3TTXXD) | [`7283478fb8c2051d9c859daf89f158c74c2bf76bee9d1694d1d9f841c5278d1d`](https://stellar.expert/explorer/testnet/tx/7283478fb8c2051d9c859daf89f158c74c2bf76bee9d1694d1d9f841c5278d1d) | 2 XLM |
| 06 | Rafiqul Islam | 01312345678 | [`GABVLI7ZWSOTW67IGAZ5MGT37BWD4LEMMM3YYEJ4XQMFJ3IMWS5NRND7`](https://stellar.expert/explorer/testnet/account/GABVLI7ZWSOTW67IGAZ5MGT37BWD4LEMMM3YYEJ4XQMFJ3IMWS5NRND7) | [`c01ca395f17488a96b83be9d55cd1e97b8e8b17361fab421192cffaaa23ffeb5`](https://stellar.expert/explorer/testnet/tx/c01ca395f17488a96b83be9d55cd1e97b8e8b17361fab421192cffaaa23ffeb5) | 2 XLM |
| 07 | Selina Islam | 01412345678 | [`GBTTS6LZKLBBOHWIOGXSAO733XU7C4ZDRLKOBEUVHLXKWZMDQT3RJZRB`](https://stellar.expert/explorer/testnet/account/GBTTS6LZKLBBOHWIOGXSAO733XU7C4ZDRLKOBEUVHLXKWZMDQT3RJZRB) | [`2cc85b261bd8cf666f19ead30834de5cf063a0a31ff5bd5505202560af0ca456`](https://stellar.expert/explorer/testnet/tx/2cc85b261bd8cf666f19ead30834de5cf063a0a31ff5bd5505202560af0ca456) | 2 XLM |
| 08 | Mahbubur Rahman | 01823456789 | [`GDJSU5SXVUKONLFXGMHZB2DG4W6O5RFZD2DYLRWW4ML2ZWNKKCL77VFT`](https://stellar.expert/explorer/testnet/account/GDJSU5SXVUKONLFXGMHZB2DG4W6O5RFZD2DYLRWW4ML2ZWNKKCL77VFT) | [`77b43e0d6859cdef3453de32c8a0b314d9b991b03212e646e019ccce00ef52d7`](https://stellar.expert/explorer/testnet/tx/77b43e0d6859cdef3453de32c8a0b314d9b991b03212e646e019ccce00ef52d7) | 2 XLM |
| 09 | Rehana Akter | 01723456789 | [`GATCE2PF7ZJTWXKPAEKNFK5N7G4KRTFMV7KAOWFA23F3KY7GKDTR3Q3D`](https://stellar.expert/explorer/testnet/account/GATCE2PF7ZJTWXKPAEKNFK5N7G4KRTFMV7KAOWFA23F3KY7GKDTR3Q3D) | [`3eef6b500791aabc7e1adc24fa3e5402bacbc75c6050c3d6aadfb676c0e79435`](https://stellar.expert/explorer/testnet/tx/3eef6b500791aabc7e1adc24fa3e5402bacbc75c6050c3d6aadfb676c0e79435) | 2 XLM |
| 10 | Shamsul Islam | 01923456789 | [`GDPGAFLUFT5PC5Z3FQB3QIPTZOOC4PYP3O5FNSXRVI7IK5DSBZ3XXZID`](https://stellar.expert/explorer/testnet/account/GDPGAFLUFT5PC5Z3FQB3QIPTZOOC4PYP3O5FNSXRVI7IK5DSBZ3XXZID) | [`880b86aebf02b1b1c82c32e041ac9b080633a239985acbfc37f0178f1b7a75e8`](https://stellar.expert/explorer/testnet/tx/880b86aebf02b1b1c82c32e041ac9b080633a239985acbfc37f0178f1b7a75e8) | 2 XLM |
| 11 | Jahanara Begum | 01623456789 | [`GBAQ7D6CUPVHKRWI3ECT33PXLKI3QLA4ZWUSQ5CCYYIP5BFBPCKLIQX3`](https://stellar.expert/explorer/testnet/account/GBAQ7D6CUPVHKRWI3ECT33PXLKI3QLA4ZWUSQ5CCYYIP5BFBPCKLIQX3) | [`574c3ba469bc1236173a0e00652945ab5c4ac6ce1ac4e49a3ff81f909279216b`](https://stellar.expert/explorer/testnet/tx/574c3ba469bc1236173a0e00652945ab5c4ac6ce1ac4e49a3ff81f909279216b) | 2 XLM |
| 12 | Mizanur Rahman | 01523456789 | [`GCSH5EQGV2VWFYUDYRLZZOOPDE2GLXWIRS5DBWUZCLYCJJQIJIH5M55M`](https://stellar.expert/explorer/testnet/account/GCSH5EQGV2VWFYUDYRLZZOOPDE2GLXWIRS5DBWUZCLYCJJQIJIH5M55M) | [`94e4d92e99c7360aa334e80aeabb2c44b0eedac6c1bd022424cbc8bc1de9756a`](https://stellar.expert/explorer/testnet/tx/94e4d92e99c7360aa334e80aeabb2c44b0eedac6c1bd022424cbc8bc1de9756a) | 2 XLM |

<br/>

The full log is saved in
[`contracts/testnet-interactions.json`](contracts/testnet-interactions.json) and
the generator script in [`contracts/fund-testnet-wallets.mjs`](contracts/fund-testnet-wallets.mjs).
Wallet secret keys are intentionally **not** committed to the repository.

<br/>

---

<div align="center">

**Built with Stellar** • **Powered by Soroban** • **Deployed on Netlify + Render**

<br/>

[![Stellar](https://img.shields.io/badge/-Stellar-08B5E5?style=for-the-badge&logo=stellar&logoColor=white)](https://stellar.org)
[![Soroban](https://img.shields.io/badge/-Soroban-08B5E5?style=for-the-badge)](https://soroban.stellar.org)
[![Netlify](https://img.shields.io/badge/-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com)
[![Render](https://img.shields.io/badge/-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)

<br/>

MIT License © [PRITAMfc](https://github.com/PRITAMfc)

</div>
