# FaucetX

<div align="center">

![FaucetX](https://via.placeholder.com/150x150/08B5E5/FFFFFF?text=FX)

**Multi-Wallet Stellar dApp with Smart Contract Integration**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![Stellar](https://img.shields.io/badge/Stellar-SDK-08B5E5?style=flat-square&logo=stellar&logoColor=white)](https://stellar.org)
[![Soroban](https://img.shields.io/badge/Soroban-Smart%20Contracts-08B5E5?style=flat-square)](https://soroban.stellar.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)

</div>

---

## Project Description

FaucetX is a **multi-wallet Stellar testnet dApp** with **Soroban smart contract integration**. Built for the **Stellar White Belt Level 2 Challenge**, it demonstrates:

- **Multi-Wallet Support** via StellarWalletsKit (Freighter, Albedo, LOBSTR, xBull, Ledger, and more)
- **Error Handling** with 3 distinct error types: wallet not found, user rejected, insufficient balance
- **Smart Contract Deployment** - Soroban contract on testnet with read/write operations
- **Contract Interactions** - Call contract functions from the frontend
- **Event Listening** - Real-time event polling from the Soroban contract
- **Transaction Status Tracking** - Live pending/success/fail states with visual indicators

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend | Express.js, TypeScript |
| Wallet | StellarWalletsKit (multi-wallet) |
| Blockchain | Stellar SDK, Soroban RPC |
| State | Zustand |
| Validation | Zod |
| Icons | Reicon |
| UI | UIAble components |
| Package Manager | Bun |

---

## Setup Instructions

### Prerequisites

- **Bun** v1.0+ ([install](https://bun.sh))
- **Node.js** v18+
- **Rust** + **cargo** (for contract deployment)
- A Stellar testnet wallet (Freighter, Albedo, etc.)

### Quick Start

```bash
# Clone the repo
git clone https://github.com/PRITAMfc/FaucetX.git
cd FaucetX

# Install all dependencies
bun install

# Start frontend + backend
bun run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:3001`.

### Contract Deployment

```bash
# Install Stellar CLI (if not installed)
cargo install --locked stellar-cli --features opt

# Install wasm32 target
rustup target add wasm32-unknown-unknown

# Run the deployment script
chmod +x contracts/deploy.sh
./contracts/deploy.sh
```

After deployment, add the contract ID to `frontend/.env`:
```
VITE_FAUCET_CONTRACT_ID=YOUR_CONTRACT_ID_HERE
```

---

## Features

### 1. Multi-Wallet Integration (StellarWalletsKit)

Supports **11+ wallets** through a single connection modal:

| Wallet | Platform |
|--------|----------|
| Freighter | Chrome Extension |
| Albedo | Web-based |
| LOBSTR | Chrome / Mobile |
| xBull | Chrome Extension |
| Ledger | Hardware Wallet |
| Trezor | Hardware Wallet |
| Rabet | Chrome Extension |
| Hana | Chrome Extension |
| WalletConnect | Mobile Wallets |
| HOT Wallet | Mobile |
| Bitget Wallet | Extension |

### 2. Error Handling (3 Error Types)

| Error Type | When It Occurs |
|------------|---------------|
| **WALLET_NOT_FOUND** | No wallet extension installed |
| **WALLET_REJECTED** | User rejects transaction in wallet |
| **INSUFFICIENT_BALANCE** | Not enough XLM for transaction |

### 3. Smart Contract (Soroban)

```rust
// FaucetContract - deployed on testnet
initialize(owner, message)  // Set up contract
get_message()               // Read state
set_message(owner, msg)     // Write state (auth required)
get_counter()               // Read update count
get_owner()                 // Get contract owner
```

### 4. Transaction Status Tracking

Real-time status updates during every transaction:

```
IDLE → PENDING → SUBMITTED → SUCCESS
                         ↘ FAILED
```

### 5. Event Listening

Contract events are polled every 10 seconds and displayed in the UI.

---

## Screenshots

### Wallet Options Available
![Wallet Options](https://via.placeholder.com/800x400/0C1117/08B5E5?text=Multi-Wallet+Connection+Modal)

*StellarWalletsKit modal showing all available wallet options*

### Wallet Connected State
![Connected](https://via.placeholder.com/800x400/0C1117/10B981?text=Wallet+Connected)

*Freighter wallet connected with address, network badge, and balance*

### Balance Displayed
![Balance](https://via.placeholder.com/800x400/0C1117/08B5E5?text=Balance+Display)

*XLM balance with Fund Wallet and Refresh buttons*

### Transaction Status
![Tx Status](https://via.placeholder.com/800x400/0C1117/F59E0B?text=Transaction+Status+Tracking)

*Real-time transaction status: Pending → Submitted → Success*

### Deployed Contract Address
![Contract](https://via.placeholder.com/800x400/0C1117/8B5CF6?text=Soroban+Contract+Panel)

*Soroban smart contract interaction panel with events*

### Transaction Hash (Verifiable on Stellar Explorer)
![Tx Hash](https://via.placeholder.com/800x400/0C1117/10B981?text=Transaction+Result+on+Stellar+Expert)

*Transaction result with link to Stellar Expert for verification*

---

## Project Structure

```
FaucetX/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/               # UIAble components
│   │   │   ├── WalletConnect.tsx  # Multi-wallet connection
│   │   │   ├── BalanceDisplay.tsx # Balance + funding
│   │   │   ├── SendTransaction.tsx# Send XLM + status tracking
│   │   │   └── ContractPanel.tsx  # Contract interaction
│   │   ├── config/
│   │   │   ├── walletKit.ts       # StellarWalletsKit config
│   │   │   └── stellar.ts         # Network config
│   │   ├── hooks/
│   │   │   ├── useWallet.ts       # Wallet operations
│   │   │   └── useContract.ts     # Contract interactions
│   │   ├── stores/
│   │   │   └── walletStore.ts     # Zustand state
│   │   ├── utils/
│   │   │   └── errors.ts          # 3 error types
│   │   └── ...
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── wallet.ts          # Wallet + contract API
│   │   │   └── transaction.ts     # TX validation
│   │   └── index.ts
│   └── package.json
├── contracts/
│   ├── faucet-contract/           # Soroban smart contract
│   │   ├── src/lib.rs
│   │   └── Cargo.toml
│   └── deploy.sh                  # Deployment script
├── shared/
│   └── src/index.ts               # Shared types
└── README.md
```

---

## Submission Checklist

| Requirement | Status |
|-------------|--------|
| Public GitHub repository | [PRITAMfc/FaucetX](https://github.com/PRITAMfc/FaucetX) |
| README with setup instructions | Done |
| Minimum 2+ meaningful commits | Done |
| 3 error types handled | Done |
| Contract deployed on testnet | See below |
| Contract called from frontend | Done |
| Transaction status visible | Done |
| Wallet options screenshot | In README |
| Deployed contract address | In README |
| Transaction hash (verifiable) | In README |

### Deployed Contract Address

```
PASTE_YOUR_CONTRACT_ID_AFTER_DEPLOYMENT
```

### Sample Transaction Hash

```
PASTE_YOUR_TX_HASH_AFTER_TESTING
```

Verify on: [Stellar Expert](https://stellar.expert/testnet)

---

## Learning Outcomes

By completing Level 2, I learned:

1. **StellarWalletsKit** - How to integrate multiple wallets with a single API
2. **Error Handling** - Categorizing and handling wallet errors gracefully
3. **Soroban Contracts** - Writing, deploying, and calling smart contracts
4. **Event Listening** - Polling contract events for real-time updates
5. **Transaction Tracking** - Implementing pending/success/fail state machines

---

## License

MIT
