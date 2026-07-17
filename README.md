# FaucetX

<div align="center">

![FaucetX Logo](https://via.placeholder.com/150x150/08B5E5/FFFFFF?text=FX)

**A Stellar Testnet Faucet & Wallet dApp**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![Stellar](https://img.shields.io/badge/Stellar-SDK-08B5E5?style=flat-square&logo=stellar&logoColor=white)](https://stellar.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## 📋 Project Description

FaucetX is a **Stellar testnet faucet and wallet dApp** built for the **Stellar White Belt Level 1 Challenge**. This application demonstrates the core fundamentals of Stellar development including:

- **Wallet Connection** - Connect your Stellar wallet (Freighter or Albedo)
- **Balance Display** - View your XLM balance in real-time
- **Testnet Funding** - Get free testnet XLM to experiment
- **XLM Transactions** - Send XLM to any Stellar address on testnet
- **Transaction Results** - View transaction details and verify on Stellar Expert

### Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend UI with hooks and modern React patterns |
| **Express.js** | Backend API server |
| **Stellar SDK** | Stellar blockchain integration |
| **Clerk Auth** | Authentication (optional) |
| **Zustand** | Lightweight state management |
| **Zod** | Runtime schema validation |
| **Bun** | Fast JavaScript runtime & package manager |
| **Reicon** | Beautiful SVG icon library |
| **UIAble** | Copy-paste UI component library |
| **Tailwind CSS** | Utility-first CSS framework |
| **Framer Motion** | Smooth animations |

---

## 🚀 Setup Instructions

### Prerequisites

- **Bun** (v1.0 or higher) - [Install Bun](https://bun.sh)
- **Node.js** (v18 or higher)
- **Freighter Browser Extension** - [Install Freighter](https://freighter.app)
- A GitHub account for repository access

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/faucetx.git
cd faucetx
```

2. **Install dependencies**

```bash
bun install
```

3. **Set up environment variables**

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

4. **Start development server**

```bash
bun run dev
```

This will start both the frontend (port 5173) and backend (port 3001) servers.

### Manual Setup

If you prefer to run frontend and backend separately:

```bash
# Terminal 1 - Backend
cd backend
bun install
bun run dev

# Terminal 2 - Frontend
cd frontend
bun install
bun run dev
```

---

## 🎯 Features

### 1. Connect a Stellar Wallet

- Supports **Freighter** browser extension
- Supports **Albedo** web wallet
- One-click connection with automatic detection

### 2. Fund Your Wallet

- Get **10,000 free testnet XLM** from Stellar Friendbot
- One-click funding button
- Instant balance update

### 3. View Balance

- Real-time XLM balance display
- Refresh button for manual updates
- Beautiful gradient UI with animations

### 4. Send XLM Transactions

- Send XLM to any valid Stellar address
- Add optional memo (up to 28 characters)
- Input validation with Zod schemas
- Real-time transaction status

### 5. Transaction Results

- Transaction hash display
- Success/failure status
- Link to Stellar Expert for verification
- Animated result cards

---

## 📸 Screenshots

### Wallet Connected State

![Wallet Connected](https://via.placeholder.com/800x400/0C1117/08B5E5?text=Wallet+Connected+State)

*Freighter wallet connected with address displayed*

### Balance Displayed

![Balance Displayed](https://via.placeholder.com/800x400/0C1117/08B5E5?text=Balance+Display)

*XLM balance showing with Fund Wallet and Refresh buttons*

### Successful Testnet Transaction

![Transaction Success](https://via.placeholder.com/800x400/0C1117/10B981?text=Transaction+Sent)

*XLM sent successfully with transaction hash*

### Transaction Result

![Transaction Result](https://via.placeholder.com/800x400/0C1117/10B981?text=Transaction+Result)

*Transaction details with Stellar Expert link*

---

## 🏗️ Project Structure

```
faucetx/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # UIAble components
│   │   │   ├── WalletConnect.tsx
│   │   │   ├── BalanceDisplay.tsx
│   │   │   └── SendTransaction.tsx
│   │   ├── hooks/
│   │   │   └── useWallet.ts
│   │   ├── stores/
│   │   │   └── walletStore.ts
│   │   ├── utils/
│   │   │   └── stellar.ts
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── wallet.ts
│   │   │   └── transaction.ts
│   │   ├── middleware/
│   │   │   └── errorHandler.ts
│   │   └── index.ts
│   ├── package.json
│   └── .env.example
├── shared/
│   ├── src/
│   │   └── index.ts          # Shared types & validation
│   └── package.json
├── package.json              # Root workspace
└── README.md
```

---

## 🔧 Configuration

### Freighter Wallet Setup

1. Install the [Freighter browser extension](https://freighter.app)
2. Create or import a Stellar wallet
3. Switch to **Testnet** in Freighter settings
4. Click "Connect" in FaucetX to connect your wallet

### Albedo Wallet Setup

1. Visit [albedo.link](https://albedo.link)
2. Create or import a Stellar wallet
3. Click "Connect with Albedo" in FaucetX

---

## 🧪 Testing the dApp

1. **Connect your wallet** using Freighter or Albedo
2. **Fund your wallet** by clicking "Fund Wallet" (gets 10,000 XLM)
3. **Check your balance** - it should update to show 10,000 XLM
4. **Send a transaction**:
   - Enter a destination address (you can use your own address for testing)
   - Enter an amount (e.g., 10 XLM)
   - Click "Send XLM"
5. **View the result** - transaction hash and status will be displayed
6. **Verify on Stellar Expert** - click the link to view on the blockchain explorer

---

## 🛠️ Development

### Available Scripts

```bash
# Run both frontend and backend
bun run dev

# Run only frontend
bun run dev:frontend

# Run only backend
bun run dev:backend

# Build for production
bun run build
```

### Key Technologies

- **Reicon** - Icon library used throughout the UI
  ```tsx
  import { Wallet, Send, RefreshCw } from 'reicon-react'
  <Wallet className="w-5 h-5" />
  ```

- **UIAble** - Component library for consistent UI
  ```tsx
  import { Button, Card, Input } from '@/components/ui'
  ```

- **Zustand** - State management for wallet state
  ```tsx
  const { isConnected, balance } = useWalletStore()
  ```

- **Zod** - Runtime validation
  ```tsx
  const result = transactionSchema.safeParse(data)
  ```

---

## 📚 Learning Resources

- [Stellar Documentation](https://developers.stellar.org)
- [Stellar SDK Documentation](https://www.npmjs.com/package/@stellar/stellar-sdk)
- [Freighter Documentation](https://docs.freighter.app)
- [Reicon Icons](https://reicon.dev/icons)
- [UIAble Components](https://uiable.com/components)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Stellar Development Foundation](https://stellar.org) - For the amazing blockchain platform
- [Freighter](https://freighter.app) - Browser wallet extension
- [Reicon](https://reicon.dev) - Beautiful icon library
- [UIAble](https://uiable.com) - Component library
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

<div align="center">

**Built with ❤️ for the Stellar White Belt Level 1 Challenge**

[Report Bug](https://github.com/yourusername/faucetx/issues) · [Request Feature](https://github.com/yourusername/faucetx/issues)

</div>
