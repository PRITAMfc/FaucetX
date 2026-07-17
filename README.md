<div align="center">

# <img src="https://github.com/user-attachments/assets/0983d352-b32d-4cd2-b6eb-56ad9e265622" width="100%" />

**Multi-Wallet Stellar Testnet Faucet with Soroban Smart Contract Integration**

_Built for the Stellar White Belt Level 2 Challenge_

<br/>

[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Express](https://img.shields.io/badge/Express_4-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![Stellar](https://img.shields.io/badge/Stellar_SDK-08B5E5?style=for-the-badge&logo=stellar&logoColor=white)](https://stellar.org)
[![Soroban](https://img.shields.io/badge/Soroban_Contracts-08B5E5?style=for-the-badge)](https://soroban.stellar.org)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Bun](https://img.shields.io/badge/Bun_Runtime-FBF1F4?style=for-the-badge&logo=bun&logoColor=black)](https://bun.sh)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

<a href="#-features">Features</a> • <a href="#-quick-start">Quick Start</a> • <a href="#-screenshots">Screenshots</a> • <a href="#-project-structure">Structure</a> • <a href="#-deployment">Deploy</a>

</div>

---

<br/>

## Overview

https://github.com/user-attachments/assets/5ea7799e-88c3-4a8d-91cc-9e9654e3b305

<br/>

FaucetX is a **full-stack Stellar testnet faucet dApp** featuring multi-wallet connectivity, real-time transaction tracking, and Soroban smart contract interactions — all wrapped in a sleek dark UI.

- **Multi-Wallet Support** via StellarWalletsKit (Freighter, Albedo, LOBSTR, xBull, Ledger, and more)
- **Error Handling** with 3 distinct error types: wallet not found, user rejected, insufficient balance
- **Smart Contract Deployment** - Soroban contract on testnet with read/write operations
- **Contract Interactions** - Call contract functions from the frontend
- **Event Listening** - Real-time event polling from the Soroban contract
- **Transaction Status Tracking** - Live pending/success/fail states with visual indicators

### What it does

| Feature | Description |
|---------|-------------|
| **Multi-Wallet** | Connect via Freighter, Albedo, LOBSTR, xBull, Ledger, Trezor, WalletConnect & more |
| **Fund Wallet** | Get free testnet XLM via Stellar Friendbot |
| **Send XLM** | Transfer testnet XLM with live status tracking |
| **Smart Contracts** | Read/write Soroban contracts with event polling |
| **AI Feedback** | Submit feedback analyzed by Mistral AI |

<br/>

### Tech Stack

<table>
<tr>
<td><b>Frontend</b></td>
<td>React 18, Vite, Tailwind CSS, Framer Motion, Zustand, shadcn/ui</td>
</tr>
<tr>
<td><b>Backend</b></td>
<td>Express.js, TypeScript, Bun runtime</td>
</tr>
<tr>
<td><b>Blockchain</b></td>
<td>Stellar SDK, Soroban RPC, StellarWalletsKit</td>
</tr>
<tr>
<td><b>Services</b></td>
<td>Upstash Redis, Mistral AI</td>
</tr>
<tr>
<td><b>Validation</b></td>
<td>Zod schemas (shared between frontend & backend)</td>
</tr>
<tr>
<td><b>Package Manager</b></td>
<td>Bun (monorepo workspaces)</td>
</tr>
</table>

<br/>

---

<br/>

## Features

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

<br/>

---

<br/>

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

Then add the contract ID to `frontend/.env`:

```
VITE_FAUCET_CONTRACT_ID=YOUR_CONTRACT_ID_HERE
```

<br/>

---

<br/>

## Screenshots

### Wallet Selection Modal

<img width="1560" height="832" alt="image" src="https://github.com/user-attachments/assets/42612903-0fde-45ec-8bab-6953e900c205" />

<div align="center"><i>StellarWalletsKit modal showing all available wallet options</i></div>

<br/>

### Connected Wallet State

<img width="1573" height="751" alt="image" src="https://github.com/user-attachments/assets/8bd302f1-85de-4bb0-8f33-db194bad6627" />

<div align="center"><i>Freighter wallet connected with address, network badge, and balance</i></div>

<br/>

### Balance & Funding

<img width="490" height="532" alt="image" src="https://github.com/user-attachments/assets/477e0fc8-f017-46c0-86f5-895631544314" />

<div align="center"><i>XLM balance with Fund Wallet and Refresh buttons</i></div>

<br/>

### Transaction Flow

<img width="1031" height="767" alt="image" src="https://github.com/user-attachments/assets/b1960cdf-9065-4266-88ca-ae1be0e2386c" />

<img width="1736" height="717" alt="image" src="https://github.com/user-attachments/assets/2f194dec-70c5-4243-ab0a-dac345ca32ec" />

<div align="center"><i>Real-time transaction status: Pending → Submitted → Success</i></div>

<br/>

### Smart Contract Panel

<img width="1830" height="767" alt="image" src="https://github.com/user-attachments/assets/a5a46596-6cfb-49a6-80d0-9ec0ab1a6524" />

<div align="center"><i>Soroban smart contract interaction panel with live events</i></div>

<br/>

### On-Chain Verification

| Item | Link |
|------|------|
| **Contract Address** | [`CBE3LXOSOKBPOWGZ6HVJXAEYILPFXHCEFWMYQA7CJIR63JRCMIXEU7DC`](https://stellar.expert/explorer/testnet/contract/CBE3LXOSOKBPOWGZ6HVJXAEYILPFXHCEFWMYQA7CJIR63JRCMIXEU7DC) |
| **Sample TX Hash** | [`a86fbf26ad...`](https://stellar.expert/explorer/testnet/tx/a86fbf26ad1e4197e27d393d82e739d95c4b83400fa2adf5b8548c6f30fe33c0) |

<br/>

---

<br/>

## Project Structure

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
├── backend/                        # Express API server
│   └── src/
│       ├── routes/
│       │   ├── wallet.ts           # Balance, fund, contract APIs
│       │   ├── transaction.ts      # TX validation + network info
│       │   └── feedback.ts         # AI feedback + Redis storage
│       ├── middleware/
│       │   └── errorHandler.ts     # Global error handler
│       └── utils/
│           ├── mistral.ts          # Mistral AI integration
│           └── redis.ts            # Upstash Redis client
│
├── contracts/                      # Soroban smart contract
│   ├── faucet-contract/
│   │   ├── src/lib.rs              # Contract logic
│   │   └── Cargo.toml
│   ├── deploy.sh                   # Shell deployment script
│   └── deploy.mjs                  # JS deployment script
│
└── shared/                         # Shared types & Zod schemas
    └── src/index.ts
```

<br/>

---

<br/>

## Deployment

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | [mylulu67.netlify.app](https://mylulu67.netlify.app) | React SPA on Netlify |
| **Backend** | [faucetx.onrender.com](https://faucetx.onrender.com) | Express API on Render |
| **Smart Contract** | [Stellar Expert](https://stellar.expert/explorer/testnet/contract/CBE3LXOSOKBPOWGZ6HVJXAEYILPFXHCEFWMYQA7CJIR63JRCMIXEU7DC) | Soroban on Testnet |

### CI/CD

- **GitHub Actions** — Runs tests + build on every push
- **Netlify** — Auto-deploys frontend on push to `master`
- **Render** — Auto-deploys backend on push to `master`

<br/>

---

<br/>

## CI/CD — Passing Test Cases

<img width="1918" height="847" alt="image" src="https://github.com/user-attachments/assets/86ecfb11-7f24-4941-a617-f9a407022449" />

<br/>

---

<br/>

## Testing

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

<br/>

## Submission Checklist

<table>
<tr><th>Requirement</th><th>Status</th></tr>
<tr><td>Public GitHub repository</td><td><a href="https://github.com/PRITAMfc/FaucetX">PRITAMfc/FaucetX</a> ✅</td></tr>
<tr><td>README with setup instructions</td><td>✅</td></tr>
<tr><td>Minimum 2+ meaningful commits</td><td>✅</td></tr>
<tr><td>3 error types handled</td><td>✅ <code>WALLET_NOT_FOUND</code> · <code>WALLET_REJECTED</code> · <code>INSUFFICIENT_BALANCE</code></td></tr>
<tr><td>Contract deployed on testnet</td><td>✅</td></tr>
<tr><td>Contract called from frontend</td><td>✅</td></tr>
<tr><td>Transaction status visible</td><td>✅</td></tr>
<tr><td>Wallet options screenshot</td><td>✅</td></tr>
<tr><td>Deployed contract address</td><td>✅</td></tr>
<tr><td>Transaction hash (verifiable)</td><td>✅</td></tr>
</table>

### Deployed Contract

```
CBE3LXOSOKBPOWGZ6HVJXAEYILPFXHCEFWMYQA7CJIR63JRCMIXEU7DC
```

### Sample Transaction Hashes

| Action | Hash |
|--------|------|
| WASM Upload | `f295c89077fd121ed7e749e36470ded09afe5166b53a0288f7e2aac2805e857b` |
| Contract Deploy | `418d0c174e744c9d47bcb12625e56a88f04949174bcd835f9a989ae37f3b38ee` |
| Contract Init | `322c59cb3b1114434477819e26dc565d864bbcae6c4d3742c2bd50cda0e5919d` |

Verify on [Stellar Expert](https://stellar.expert/testnet)

<br/>

---

<br/>

## Learning Outcomes

By completing Level 2, I learned:

1. **StellarWalletsKit** — Integrating multiple wallets with a single API
2. **Error Handling** — Categorizing and handling wallet errors gracefully
3. **Soroban Contracts** — Writing, deploying, and calling smart contracts from a dApp
4. **Event Listening** — Polling contract events for real-time UI updates
5. **Transaction Tracking** — Implementing pending/success/fail state machines with visual feedback

<br/>

---

<br/>

<div align="center">

**Built with Stellar** • **Powered by Soroban** • **Deployed on Netlify + Render**

[![Stellar](https://img.shields.io/badge/-Stellar-08B5E5?style=for-the-badge&logo=stellar&logoColor=white)](https://stellar.org)
[![Soroban](https://img.shields.io/badge/-Soroban-08B5E5?style=for-the-badge)](https://soroban.stellar.org)
[![Netlify](https://img.shields.io/badge/-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com)
[![Render](https://img.shields.io/badge/-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)

<br/>

MIT License © [PRITAMfc](https://github.com/PRITAMfc)

</div>
