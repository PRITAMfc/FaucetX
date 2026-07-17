# FaucetX
<img width="1732" height="860" alt="image" src="https://github.com/user-attachments/assets/0983d352-b32d-4cd2-b6eb-56ad9e265622" />
<img width="1817" height="818" alt="image" src="https://github.com/user-attachments/assets/1afe785f-1d81-4ced-a0f5-6e9ac9d0356c" />

<div align="center">



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

< - -  DEMO VIDEO - - >


https://github.com/user-attachments/assets/5ea7799e-88c3-4a8d-91cc-9e9654e3b305


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
<img width="1560" height="832" alt="image" src="https://github.com/user-attachments/assets/42612903-0fde-45ec-8bab-6953e900c205" />


*StellarWalletsKit modal showing all available wallet options*

### Wallet Connected State
<img width="1573" height="751" alt="image" src="https://github.com/user-attachments/assets/8bd302f1-85de-4bb0-8f33-db194bad6627" />


*Freighter wallet connected with address, network badge, and balance*

### Balance Displayed
<img width="490" height="532" alt="image" src="https://github.com/user-attachments/assets/477e0fc8-f017-46c0-86f5-895631544314" />


*XLM balance with Fund Wallet and Refresh buttons*

### Transaction Status
<img width="1031" height="767" alt="image" src="https://github.com/user-attachments/assets/b1960cdf-9065-4266-88ca-ae1be0e2386c" />

<img width="1736" height="717" alt="image" src="https://github.com/user-attachments/assets/2f194dec-70c5-4243-ab0a-dac345ca32ec" />

*Real-time transaction status: Pending → Submitted → Success*

### Deployed Contract Address
<img width="1830" height="767" alt="image" src="https://github.com/user-attachments/assets/a5a46596-6cfb-49a6-80d0-9ec0ab1a6524" />
https://stellar.expert/explorer/testnet/contract/CBE3LXOSOKBPOWGZ6HVJXAEYILPFXHCEFWMYQA7CJIR63JRCMIXEU7DC
*Soroban smart contract interaction panel with events*

### Transaction Hash (Verifiable on Stellar Explorer)
Transaction a86fbf26ad1e4197e27d393d82e739d95c4b83400fa2adf5b8548c6f30fe33c0
https://stellar.expert/explorer/testnet/tx/a86fbf26ad1e4197e27d393d82e739d95c4b83400fa2adf5b8548c6f30fe33c0

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
CCF4DJQGX53OPL27F4HU66D4VKPVOT3D2D4PAY4PB4OGTN77SEJQ2I6B
```

Verify: [Stellar Expert](https://stellar.expert/testnet/contract/CCF4DJQGX53OPL27F4HU66D4VKPVOT3D2D4PAY4PB4OGTN77SEJQ2I6B)

### Sample Transaction Hashes

| Action | Hash |
|--------|------|
| WASM Upload | `f295c89077fd121ed7e749e36470ded09afe5166b53a0288f7e2aac2805e857b` |
| Contract Deploy | `418d0c174e744c9d47bcb12625e56a88f04949174bcd835f9a989ae37f3b38ee` |
| Contract Init | `322c59cb3b1114434477819e26dc565d864bbcae6c4d3742c2bd50cda0e5919d` |

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




##ci/cd passing test cases

<img width="1918" height="847" alt="image" src="https://github.com/user-attachments/assets/86ecfb11-7f24-4941-a617-f9a407022449" />









## License

MIT
