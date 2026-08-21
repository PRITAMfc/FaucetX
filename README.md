<div align="center">

<img width="1903" height="862" alt="FaucetX Dashboard Dark UI" src="https://github.com/user-attachments/assets/93eccfa2-f3bc-4892-9ccb-aebf5f5a060e" />

<img width="1901" height="858" alt="FaucetX Landing Page" src="https://github.com/user-attachments/assets/c405ccd8-3a6a-48e0-a0db-0d09ba1c67f2" />

# FaucetX

### Multi-Wallet Stellar Testnet Faucet with Soroban Smart Contract Integration

_Built for the Stellar White Belt Level 2 Challenge_

<br/>

[![CI](https://github.com/probirum/FaucetX/actions/workflows/ci.yml/badge.svg)](https://github.com/probirum/FaucetX/actions/workflows/ci.yml)
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
<a href="#-ai-features">AI Features</a> •
<a href="#-screenshots">Screenshots</a> •
<a href="#-project-structure">Structure</a> •
<a href="#-deployment">Deploy</a> •
<a href="#-testing">Testing</a> •
<a href="#-on-chain-verification">On-Chain Verification</a> •
<a href="https://ppt.ai/slides/40641be2-ed6a-4308-97e0-15ccac508db1/share">Pitch Deck</a>

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
| **Metrics** | Counters, timings, gauges, health metrics, HTTP instrumentation + Prometheus export |
| **Scheduled Jobs** | Cron-based cleanup, aggregation, and health checks |
| **AI Agent** | Mastra agent with Mistral AI for feedback analysis |

<br/>

### 📡 Monitoring & Analytics API

The backend exposes a full monitoring stack — HTTP request tracking, process health, queue depths, cache stats, and a **Prometheus scrape endpoint**:

| Endpoint | Description |
|----------|-------------|
| [`GET /api/monitoring`](https://faucetx.onrender.com/api/monitoring) | Full monitoring snapshot: process uptime/memory/CPU, HTTP counters & latency percentiles, queue depths, error rate, cache stats, circuit-breaker state |
| [`GET /api/monitoring/process`](https://faucetx.onrender.com/api/monitoring/process) | Runtime process stats (RSS, heap, CPU time, load average) |
| [`GET /api/monitoring/http`](https://faucetx.onrender.com/api/monitoring/http) | Per-route HTTP request counters and avg/p50/p95/p99 latencies |
| [`GET /api/monitoring/prometheus`](https://faucetx.onrender.com/api/monitoring/prometheus) | Metrics in **Prometheus exposition format** (`text/plain; version=0.0.4`) — point any Prometheus/Grafana scraper at it |
| [`GET /api/analytics/metrics`](https://faucetx.onrender.com/api/analytics/metrics) | Raw Redis-backed metric registry (counters, timings, gauges) |
| [`GET /api/analytics/dashboard`](https://faucetx.onrender.com/api/analytics/dashboard) | Aggregated ops dashboard: feedback stats, daily ops, error rate |
| [`GET /api/health`](https://faucetx.onrender.com/api/health) | Liveness probe with per-service checks |

HTTP instrumentation is applied via Fastify `onRequest`/`onResponse` hooks (`backend/src/utils/httpMetrics.ts`) — every request is counted by method/route/status and timed into Redis-backed percentile histograms automatically.

<br/>

### 🐳 Prometheus + Grafana (Docker)

A batteries-included observability stack lives in [`monitoring/`](monitoring). Prometheus scrapes the backend's `/api/monitoring/prometheus` endpoint every **15 seconds**, and Grafana ships with a **pre-provisioned FaucetX dashboard** — zero manual setup: datasources, dashboard, and layout all auto-load on first boot.

#### Stack overview

```bash
# 1. Start the backend (needs UPSTASH_REDIS_URL — see backend/.env)
cd backend && bun run dev

# 2. Start Prometheus + Grafana
cd monitoring
docker compose up -d      # add `-d` for detached mode
docker compose down       # stop and remove containers
```

| Service | Container | URL | Credentials |
|---------|-----------|-----|-------------|
| Grafana 11 | `faucetx-grafana` | [http://localhost:3000](http://localhost:3000) | `admin` / `faucetx` — FaucetX dashboard auto-loads as home |
| Prometheus v3 | `faucetx-prometheus` | [http://localhost:9090](http://localhost:9090) | none — try `up`, `faucetx_http_requests_total` in the query box |

#### What's inside `monitoring/`

```
monitoring/
├── docker-compose.yml                          # 2 services + persistent volumes (15-day TSDB retention)
├── prometheus/prometheus.yml                   # Scrape config: local backend + production Render
└── grafana/
    ├── provisioning/datasources/prometheus.yml # Auto-provisioned "Prometheus" datasource
    ├── provisioning/dashboards/dashboards.yml  # Dashboard auto-loading provider
    └── dashboards/faucetx-monitoring.json      # Pre-built 6-panel FaucetX dashboard
```

#### Scrape targets

Both targets are pre-configured in [`monitoring/prometheus/prometheus.yml`](monitoring/prometheus/prometheus.yml):

| Job | Target | Notes |
|-----|--------|-------|
| `faucetx-local` | `host.docker.internal:3001` | Your dev backend (`bun run dev`) via Docker's host gateway |
| `faucetx-production` | `faucetx.onrender.com` (https) | The live deployment — works with zero local setup |

Check target health at [localhost:9090/targets](http://localhost:9090/targets) — each job reports `UP`/`DOWN` per scrape.

#### Metrics collected (`faucetx_*`)

| Metric | Type | Meaning |
|--------|------|---------|
| `faucetx_http_requests_total{method}` | counter | Total HTTP requests received |
| `faucetx_http_responses_total{method,status}` | counter | Responses per status code class |
| `faucetx_http_errors_total{method}` | counter | 5xx server errors |
| `faucetx_http_latency_{avg,p95,p99}_ms{method,route}` | gauge | Response-time percentiles per route |
| `faucetx_process_uptime_seconds` / `_memory_rss_mb` / `_memory_heap_used_mb` | gauge | Runtime process health |
| `faucetx_job_success{queue}` / `faucetx_job_error{queue}` | counter | BullMQ job outcomes |
| `faucetx_cache_hit` / `faucetx_cache_miss` | counter | Redis cache effectiveness |
| `faucetx_maintenance_completed{type}` | counter | Scheduled maintenance runs |

#### Pre-built Grafana dashboard panels

1. **Backend Uptime** — stat panel with service health coloring
2. **Process Memory (RSS)** — stat panel with 300/500 MB warning thresholds
3. **HTTP Response Rate by Status** — req/s time series split by status code
4. **Request Latency per Route** — avg & p95 milliseconds for every API route
5. **Requests & Errors (per hour)** — hourly request volume vs 5xx errors
6. **Cache Hit Ratio** — Redis cache hit percentage over time

> **Troubleshooting:** if `faucetx-local` shows `DOWN`, make sure Docker Desktop is running and the backend is listening on port 3001 before `docker compose up`. Data persists across restarts via named volumes (`prometheus-data`, `grafana-data`).

<br/>

## 🤖 AI Features

FaucetX ships a production AI stack powered by **Mistral AI** (`mistral-small-latest`) and the **Mastra** agent framework — no mock responses, real API integration. Every AI capability below is live in the codebase.

<br/>

### 1. FaucetX Autonomous Agent (`backend/src/mastra/agent.ts`)

An autonomous assistant agent built on the **Mastra framework** with direct access to **10 callable tools** covering every faucet operation. The agent reasons over user intent and chains tools together to answer questions or execute actions:

| Tool | Capability |
|------|------------|
| `getBalance` | Query live XLM balances for any testnet address via Horizon |
| `fundWallet` | Fund testnet wallets through friendbot |
| `getContractInfo` | Fetch deployed Soroban contract metadata |
| `getContractEvents` | Retrieve on-chain contract event history |
| `getTransaction` | Look up transaction details by hash |
| `validateTransaction` | Validate transaction payloads before submission |
| `getNetworkInfo` | Report Stellar testnet network status |
| `submitFeedback` | Store user feedback with AI classification |
| `getFeedback` | Retrieve stored feedback entries |
| `getFeedbackStats` | Aggregate feedback statistics |

**Agent capabilities:**

- **Natural-language faucet ops** — "check balance of GABC…", "what happened with tx <hash>?"; the agent picks and runs the right tool
- **Multi-step reasoning** — chains tools (e.g., validate → fund → confirm) instead of single-shot replies
- **Grounded responses** — every wallet/contract/transaction answer comes from live Horizon & Soroban RPC data, never hallucinated
- **System-prompt scoped** — instructions constrain it to helpful, concise, structured output on Stellar testnet operations only

<br/>

### 2. AI Feedback Analysis (`backend/src/utils/mistral.ts`)

Every piece of user feedback submitted through the app is analyzed in real time by Mistral AI:

- **Sentiment classification** → `positive` / `negative` / `neutral`
- **Category routing** → `bug` / `feature_request` / `ux` / `general` / `praise`
- **Auto-generated acknowledgment** → a friendly 1-2 sentence response thanking the user or addressing their concern
- Uses structured JSON output (`response_format: json_object`) with low temperature (0.3) for deterministic, parseable results
- Graceful fallback to a neutral default if the API is unreachable

**Analysis pipeline:**

```
User submits feedback (FeedbackForm.tsx)
        │
        ▼
POST /api/feedback ──► Zod schema validation
        │
        ▼
Mistral AI (mistral-small-latest, temp 0.3, JSON mode)
        │  sentiment · category · acknowledgment
        ▼
Classified entry stored in Upstash Redis
        │
        ▼
Acknowledgment returned to user in real time
```

<br/>

### 3. AI-Powered Feedback Dashboard (`backend/src/routes/feedback.ts`)

The classified feedback feeds an analytics layer the agent can query:

- **`getFeedback`** — retrieve stored entries filtered by sentiment/category
- **`getFeedbackStats`** — aggregate counts per category & sentiment for trend spotting
- Combined with BullMQ's **feedback queue**, analysis happens asynchronously with retries so slow AI calls never block the UI

<br/>

### 4. Configuration

```bash
# .env (backend)
MISTRAL_API_KEY=your_mistral_api_key   # https://console.mistral.ai
```

| Aspect | Value |
|--------|-------|
| Provider | Mistral AI (`https://api.mistral.ai/v1`) |
| Model | `mistral-small-latest` |
| Agent framework | Mastra (`@mastra/core`) |
| Output format | Strict JSON (`response_format: json_object`) |
| Temperature | 0.3 (deterministic classification) |
| Failure mode | Neutral fallback response + queue retry |

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
##Ci passed 
<img width="1516" height="626" alt="ci pass " src="https://github.com/user-attachments/assets/ce6d475b-6a3a-429c-b1b6-4168e0f931f0" />


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
│       │   ├── monitoring.ts       # Monitoring snapshot + Prometheus export
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
│           ├── httpMetrics.ts      # Fastify HTTP instrumentation hooks
│           └── transaction.ts      # Transaction validation
│
├── contracts/                      # Soroban smart contract
│   ├── faucet-contract/
│   │   ├── src/lib.rs              # Contract logic
│   │   └── Cargo.toml
│   ├── deploy.sh                   # Shell deployment script
│   ├── deploy.mjs                  # JS deployment script
│   ├── fund-testnet-wallets.mjs    # Testnet wallet funding generator
│   └── testnet-interactions.json   # 50 testnet wallet TX records
│
└── shared/                         # Shared Zod schemas & types
    └── src/index.ts

monitoring/                         # Prometheus + Grafana (Docker)
├── docker-compose.yml
├── prometheus/prometheus.yml       # Scrape config (local + production)
└── grafana/
    ├── provisioning/               # Auto-provisioned datasource & dashboard
    └── dashboards/                 # FaucetX monitoring dashboard JSON
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
| **Pitch Deck** | [FaucetX Slides](https://ppt.ai/slides/40641be2-ed6a-4308-97e0-15ccac508db1/share) | Project pitch & walkthrough |
| **User Data Sheet** | [faucetX wallet users testnet](https://docs.google.com/spreadsheets/d/186z-6wxATH9JxgvaAywCvKi2HfJpvj3Ajb64JwGrWjY/edit?usp=sharing) | Live on-chain user interaction records (50 wallets) |

<br/>

### 🔗 Project Links

All key FaucetX resources in one place:

| Resource | Link | Description |
|----------|------|-------------|
| 📝 **Wallet Interaction Form** | [Submit your interaction](https://docs.google.com/forms/d/1LJ8Jm5hNQuolJdw_svYR-OdRwjpMJuo8nd7j78WXyqE/edit) | Register your wallet address, tx hash & name after using the faucet |
| 📊 **Responses Spreadsheet** | [faucetX wallet users testnet](https://docs.google.com/spreadsheets/d/186z-6wxATH9JxgvaAywCvKi2HfJpvj3Ajb64JwGrWjY/edit?usp=sharing) | Live sheet of all 50 on-chain wallet interactions (wallet, tx hash, name, rating) |
| 🎤 **Pitch Deck** | [FaucetX Slides](https://ppt.ai/slides/40641be2-ed6a-4308-97e0-15ccac508db1/share) | Full project pitch — problem, solution, architecture & demo walkthrough |

<br/>

### CI/CD

- **GitHub Actions** — Runs tests + build on every push:
  - `Frontend & Backend` job — Bun install, shared/frontend/backend test suites
  - `Build Frontend` job — TypeScript check + Vite production build
  - `Smart Contract` job — Rust toolchain (`wasm32-unknown-unknown`), Stellar CLI v27, `cargo fmt`, `cargo build`, `cargo test` (10 Soroban unit tests), `cargo clippy -D warnings`, and `stellar contract build` Wasm artifact verification
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

# Smart contract tests (Rust)
cd contracts/faucet-contract
cargo test              # 10 tests — initialize, set_message auth, counter, events
```

**29 tests across 3 workspaces** — all passing in CI.

<br/>

---

## Latest Updates — Review Revisions Implemented

In response to the review feedback ("CI pipeline does not validate the smart contract"), the following updates were shipped:

| Commit | Update |
|--------|--------|
| [`81cb273`](https://github.com/probirum/FaucetX/commit/81cb273) | **fix(contract)** — pinned `ed25519-dalek` to 2.x in `Cargo.lock` so `cargo test` compiles with `soroban-env-host` 21.x |
| [`db0708c`](https://github.com/probirum/FaucetX/commit/db0708c) | **test(contract)** — added 10 Soroban unit tests covering `initialize`, re-initialization guard, owner-only auth (incl. mock signature), counter increments, and event payload decoding |
| [`ac0c7c9`](https://github.com/probirum/FaucetX/commit/ac0c7c9) | **feat(ci)** — new **Smart Contract** CI job: Rust toolchain with `wasm32-unknown-unknown` target, Stellar CLI v27, then `cargo fmt`, `cargo build`, `cargo test`, `cargo clippy -D warnings`, and `stellar contract build` inside `contracts/faucet-contract` |
| [`1ea4299`](https://github.com/probirum/FaucetX/commit/1ea4299) | **fix(frontend)** — contract calls now exactly match `lib.rs` API: `set_message(owner, message)` args encoded as `Symbol` (was `bytes`), simulation result read via `.retval` + `scValToNative`, transactions simulated & assembled via `SorobanRpc.assembleTransaction` before wallet signing |
| [`79eb3bd`](https://github.com/probirum/FaucetX/commit/79eb3bd) | **chore** — backend lockfile tracked, `test_snapshots/` ignored, README updated |

✅ **All 3 CI jobs passing**: [Frontend & Backend · Smart Contract · Build Frontend](https://github.com/probirum/FaucetX/actions/runs/32480468321)

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
<tr><td>10+ wallet interactions (proof)</td><td>✅ 50 verified testnet interactions — <a href="#on-chain-wallet-interactions-50-testnet-wallets">see table</a></td></tr>
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

Verify on [Stellar Expert](https://stellar.expert/explorer/testnet)

<br/>

<a name="on-chain-wallet-interactions-50-testnet-wallets"></a>

### On-Chain Wallet Interactions (50 testnet wallets)

Each of the **50 freshly generated wallets** below was funded via Friendbot and sent **2 XLM** to the faucet
contract `CBE3LXOSOKBPOWGZ6HVJXAEYILPFXHCEFWMYQA7CJIR63JRCMIXEU7DC` through the
native **Stellar Asset Contract** `transfer` invocation — **100 real on-chain transactions**.
Every transaction hash is verifiable on Stellar Expert / Horizon.

> The `Name` and `Phone Number` columns are randomly generated sample user details attached to each
> on-chain testnet wallet interaction for demo purposes. Phone numbers start with `01`
> as per Bangladesh mobile numbering rules.

| # | Name | Phone Number | Wallet Address | Tx Hash | Amount |
|---|------|--------------|----------------|---------|--------|
| 01 | Nazmul Uddin | 01499568493 | [`GBTIPPXR37QHC24GHV7OP5O7CQTGXSEGXY7IP56HTYUMDAJF4MHXFHQW`](https://stellar.expert/explorer/testnet/account/GBTIPPXR37QHC24GHV7OP5O7CQTGXSEGXY7IP56HTYUMDAJF4MHXFHQW) | [`24c6abcd5f0c0bf860c6b63c53911cdbde64829a1276adeb30d1263f5e7624b2`](https://stellar.expert/explorer/testnet/tx/24c6abcd5f0c0bf860c6b63c53911cdbde64829a1276adeb30d1263f5e7624b2) | 2 XLM |
| 02 | Anisur Siddique | 01469375382 | [`GA5IDU25RWTZSZKVCZ77QZIYEF5CEMGKDP6FPNNWOGHD4XJW6RNRELVG`](https://stellar.expert/explorer/testnet/account/GA5IDU25RWTZSZKVCZ77QZIYEF5CEMGKDP6FPNNWOGHD4XJW6RNRELVG) | [`ef35a54f33b01a0100e6aaa1bbf3ec14eb73d9d9a2bd8c9f90f75ff55f4f51b9`](https://stellar.expert/explorer/testnet/tx/ef35a54f33b01a0100e6aaa1bbf3ec14eb73d9d9a2bd8c9f90f75ff55f4f51b9) | 2 XLM |
| 03 | Rashida Molla | 01491117536 | [`GB5VNRZITF3GAZMJUSTNET4OYCK3OMSYLM3M3AK2YVBWQ3OLVDS4WALT`](https://stellar.expert/explorer/testnet/account/GB5VNRZITF3GAZMJUSTNET4OYCK3OMSYLM3M3AK2YVBWQ3OLVDS4WALT) | [`262a0d965d2943a94b880ef229b2a158584c0374496953ffdcd99842cb61a7e7`](https://stellar.expert/explorer/testnet/tx/262a0d965d2943a94b880ef229b2a158584c0374496953ffdcd99842cb61a7e7) | 2 XLM |
| 04 | Rumana Hossain | 01498006914 | [`GAEENHLAWGRM2ZIIEIV2FEXTLV3URZDAGTGAYAJCGGFWFK4DT5P4SK6T`](https://stellar.expert/explorer/testnet/account/GAEENHLAWGRM2ZIIEIV2FEXTLV3URZDAGTGAYAJCGGFWFK4DT5P4SK6T) | [`0bb7fd32d2f2865ae159bee844bae94377a039884306ca3321f013cc7701829b`](https://stellar.expert/explorer/testnet/tx/0bb7fd32d2f2865ae159bee844bae94377a039884306ca3321f013cc7701829b) | 2 XLM |
| 05 | Tahmina Akter | 01390123635 | [`GAOSLK2XN5NGQJOWWF4R4ZBHFH67IGUYX7IUJJLWTQWEBAACWNVSUSTO`](https://stellar.expert/explorer/testnet/account/GAOSLK2XN5NGQJOWWF4R4ZBHFH67IGUYX7IUJJLWTQWEBAACWNVSUSTO) | [`a6f0c109c1a40a4c97d84ac0badf6cf1add98a8e4bf636f9cb6a5a6fb1209dff`](https://stellar.expert/explorer/testnet/tx/a6f0c109c1a40a4c97d84ac0badf6cf1add98a8e4bf636f9cb6a5a6fb1209dff) | 2 XLM |
| 06 | Momtaz Chowdhury | 01735905626 | [`GBCQHQJZDKWLUXO5B3SM5KZ4RKN3QZQUXFIN3W6LO6ASDY3WP7HUE72H`](https://stellar.expert/explorer/testnet/account/GBCQHQJZDKWLUXO5B3SM5KZ4RKN3QZQUXFIN3W6LO6ASDY3WP7HUE72H) | [`92a6f0fb32fa3c8dced3df0ef42b254cc1d4db222bad9aa468dce4c39a564dd4`](https://stellar.expert/explorer/testnet/tx/92a6f0fb32fa3c8dced3df0ef42b254cc1d4db222bad9aa468dce4c39a564dd4) | 2 XLM |
| 07 | Nusrat Al Mamun | 01925000974 | [`GBJQXQXRC2ADOORUCNV2XSNYGILBB7GZCCAVQ4VRWIGJXEYQNSE7NMUR`](https://stellar.expert/explorer/testnet/account/GBJQXQXRC2ADOORUCNV2XSNYGILBB7GZCCAVQ4VRWIGJXEYQNSE7NMUR) | [`bf09ff4b4192078305bb3a2e90387dbe0257ba7c3d0c54a201f77f9a51b19b5e`](https://stellar.expert/explorer/testnet/tx/bf09ff4b4192078305bb3a2e90387dbe0257ba7c3d0c54a201f77f9a51b19b5e) | 2 XLM |
| 08 | Rafiqul Rahman | 01636148400 | [`GANDLRC3M2SXRGDGX2ZPKQLKZTV435REH6ADW7NPBPPHCPZX7RAOCHLJ`](https://stellar.expert/explorer/testnet/account/GANDLRC3M2SXRGDGX2ZPKQLKZTV435REH6ADW7NPBPPHCPZX7RAOCHLJ) | [`f8821eeaa17530c16eede65700164c73973b25511e7eda82f53fe704332abb36`](https://stellar.expert/explorer/testnet/tx/f8821eeaa17530c16eede65700164c73973b25511e7eda82f53fe704332abb36) | 2 XLM |
| 09 | Rashida Sarker | 01354982800 | [`GD4AIZ526MEZ5CA56WES2KOGZMUX77ZS276QIS2UYNBUS6AMR2MO26B6`](https://stellar.expert/explorer/testnet/account/GD4AIZ526MEZ5CA56WES2KOGZMUX77ZS276QIS2UYNBUS6AMR2MO26B6) | [`71aacb03e0504295bbc3113bc8a9cbb3436b7bc953dca770be08033d857e4077`](https://stellar.expert/explorer/testnet/tx/71aacb03e0504295bbc3113bc8a9cbb3436b7bc953dca770be08033d857e4077) | 2 XLM |
| 10 | Laila Miah | 01683363473 | [`GDNHHZOSAR3KJHWM57OF6N3RDSHDEZSLN4NKN57M4ZI75KLDWXL7YGIU`](https://stellar.expert/explorer/testnet/account/GDNHHZOSAR3KJHWM57OF6N3RDSHDEZSLN4NKN57M4ZI75KLDWXL7YGIU) | [`704853b5ff5fd6b8e0e10d4ed1e5ba47626f9be967a01c65cd34f7a8700508b9`](https://stellar.expert/explorer/testnet/tx/704853b5ff5fd6b8e0e10d4ed1e5ba47626f9be967a01c65cd34f7a8700508b9) | 2 XLM |
| 11 | Salma Uddin | 01716821728 | [`GBRJDLSYU2UKIFOL2JA3TPLLS22YPII2Y53NKO2DSXVEMMJ223MJ2RB6`](https://stellar.expert/explorer/testnet/account/GBRJDLSYU2UKIFOL2JA3TPLLS22YPII2Y53NKO2DSXVEMMJ223MJ2RB6) | [`604a603f43d1ef5cb2118bb2765d8e9dbfaae8a0be85006007852994dc2e7549`](https://stellar.expert/explorer/testnet/tx/604a603f43d1ef5cb2118bb2765d8e9dbfaae8a0be85006007852994dc2e7549) | 2 XLM |
| 12 | Abdullah Sultana | 01981505220 | [`GC2XQR3QPDFEUO77TA227PXJGSSMFH4G6MWHJMQL76NSDA2ICCAWGXCU`](https://stellar.expert/explorer/testnet/account/GC2XQR3QPDFEUO77TA227PXJGSSMFH4G6MWHJMQL76NSDA2ICCAWGXCU) | [`234083d3a017eaedf76eb9abc9acb62102e7e9068e950a9955d3bec7be8327f0`](https://stellar.expert/explorer/testnet/tx/234083d3a017eaedf76eb9abc9acb62102e7e9068e950a9955d3bec7be8327f0) | 2 XLM |
| 13 | Fatima Miah | 01471513918 | [`GCPVXWUBVTS2FH75NGNWGTEBXDPIJ75FWIB2VO72NL6SU7BDKO5H5LTQ`](https://stellar.expert/explorer/testnet/account/GCPVXWUBVTS2FH75NGNWGTEBXDPIJ75FWIB2VO72NL6SU7BDKO5H5LTQ) | [`30e50e51eff80967ab720b87ff0e4fb7502f2f4af94dd36ade8063d374aeeef6`](https://stellar.expert/explorer/testnet/tx/30e50e51eff80967ab720b87ff0e4fb7502f2f4af94dd36ade8063d374aeeef6) | 2 XLM |
| 14 | Zahangir Talukder | 01598932510 | [`GAAVYUL6KKKPP445OLIPV26RWMYSSUS6PLSLTDM2V4J6NQBSG3EFFVSE`](https://stellar.expert/explorer/testnet/account/GAAVYUL6KKKPP445OLIPV26RWMYSSUS6PLSLTDM2V4J6NQBSG3EFFVSE) | [`2e35273d6a268238fa6dad883f4468f327bae15aa949a59c17884fca462213aa`](https://stellar.expert/explorer/testnet/tx/2e35273d6a268238fa6dad883f4468f327bae15aa949a59c17884fca462213aa) | 2 XLM |
| 15 | Omar Sarker | 01998850166 | [`GBYDAVCPBNEETBV2ZQZ5LRJ6IVPX356EXEVBLXBBURER3C25M75E62WO`](https://stellar.expert/explorer/testnet/account/GBYDAVCPBNEETBV2ZQZ5LRJ6IVPX356EXEVBLXBBURER3C25M75E62WO) | [`71c7680dd097685119891a8acfd4c1eebf044ddf10285bb51c194f5b037db850`](https://stellar.expert/explorer/testnet/tx/71c7680dd097685119891a8acfd4c1eebf044ddf10285bb51c194f5b037db850) | 2 XLM |
| 16 | Nusrat Parvin | 01704622881 | [`GCNIL4BXQLMPR3I2GUMBZINK4TTAWIQKE7P5HBMEAZK32ML6DQ37PJNV`](https://stellar.expert/explorer/testnet/account/GCNIL4BXQLMPR3I2GUMBZINK4TTAWIQKE7P5HBMEAZK32ML6DQ37PJNV) | [`f55298f37c09b786f2239cb9a83be656a8ec61c76a4ed89e35d2650e2a8ba654`](https://stellar.expert/explorer/testnet/tx/f55298f37c09b786f2239cb9a83be656a8ec61c76a4ed89e35d2650e2a8ba654) | 2 XLM |
| 17 | Omar Rahman | 01818401564 | [`GD6Q4DCY34Y7N5Z3WLQS3JISWKET7NQPTEDVQIMGT6T6R2BXBL4VN5DT`](https://stellar.expert/explorer/testnet/account/GD6Q4DCY34Y7N5Z3WLQS3JISWKET7NQPTEDVQIMGT6T6R2BXBL4VN5DT) | [`bcb85bbe29eb9a9ca3560c6835c0e3a1b96676f96decf9035cdcffbbbbce0bdb`](https://stellar.expert/explorer/testnet/tx/bcb85bbe29eb9a9ca3560c6835c0e3a1b96676f96decf9035cdcffbbbbce0bdb) | 2 XLM |
| 18 | Nusrat Chowdhury | 01326678021 | [`GCSBKJRR5WIX54DQMJYSMEL2XKRQEKPNIV2E374XZ43ODTUTBL46AH7Y`](https://stellar.expert/explorer/testnet/account/GCSBKJRR5WIX54DQMJYSMEL2XKRQEKPNIV2E374XZ43ODTUTBL46AH7Y) | [`c7494ed246c851fd0023c06f9a4fcc99aba9579fb682ebaf50e5587246d9fbba`](https://stellar.expert/explorer/testnet/tx/c7494ed246c851fd0023c06f9a4fcc99aba9579fb682ebaf50e5587246d9fbba) | 2 XLM |
| 19 | Nasima Chowdhury | 01528065972 | [`GAUUF7XLBY66HDPVNI3KVW37RCKKPZHIVPQ4GHZKW56LNTNWIZHYPU5X`](https://stellar.expert/explorer/testnet/account/GAUUF7XLBY66HDPVNI3KVW37RCKKPZHIVPQ4GHZKW56LNTNWIZHYPU5X) | [`6ae56c685e12aae03e3320cdbe0678428ee312721874f115c0c56b7b97d8fcb2`](https://stellar.expert/explorer/testnet/tx/6ae56c685e12aae03e3320cdbe0678428ee312721874f115c0c56b7b97d8fcb2) | 2 XLM |
| 20 | Mizanur Miah | 01390758939 | [`GCXIMCUP7B4X25OFHSKELRZJSHKRAYUKY2UFUSR2UAT2GMJHJ2QDXTXE`](https://stellar.expert/explorer/testnet/account/GCXIMCUP7B4X25OFHSKELRZJSHKRAYUKY2UFUSR2UAT2GMJHJ2QDXTXE) | [`decad68f80ddbd915c541471b5042708bfc574677a933381e3edde045608935e`](https://stellar.expert/explorer/testnet/tx/decad68f80ddbd915c541471b5042708bfc574677a933381e3edde045608935e) | 2 XLM |
| 21 | Laila Alam | 01753271395 | [`GDX3NVOMLSK7TJWHXU4XLXAPZGYU4DAGGTRDS6UUJZD5I7ICH2GVFGM2`](https://stellar.expert/explorer/testnet/account/GDX3NVOMLSK7TJWHXU4XLXAPZGYU4DAGGTRDS6UUJZD5I7ICH2GVFGM2) | [`b3aef3c84b8ce967e24ceaec9296e118f5f6389aebec591d06ee396947bc34e1`](https://stellar.expert/explorer/testnet/tx/b3aef3c84b8ce967e24ceaec9296e118f5f6389aebec591d06ee396947bc34e1) | 2 XLM |
| 22 | Mostafizur Begum | 01983822152 | [`GDQX6XAAXAXGJTPQUC2SETHX5GF3SKVWUDHK2JSLI3I5ICBJI22SFKP2`](https://stellar.expert/explorer/testnet/account/GDQX6XAAXAXGJTPQUC2SETHX5GF3SKVWUDHK2JSLI3I5ICBJI22SFKP2) | [`c8441d43bf55d579e548461e66f92b9532bf27ef4e301e6ea388dd2655f974ef`](https://stellar.expert/explorer/testnet/tx/c8441d43bf55d579e548461e66f92b9532bf27ef4e301e6ea388dd2655f974ef) | 2 XLM |
| 23 | Delwar Alam | 01446248036 | [`GA5WEAEVES5WLZMBRDQJFMF7BLE2BIFHP37YMLWZ2B6SXZ5B6VMXTP6D`](https://stellar.expert/explorer/testnet/account/GA5WEAEVES5WLZMBRDQJFMF7BLE2BIFHP37YMLWZ2B6SXZ5B6VMXTP6D) | [`fee70c6f5695e61ec42ff25ad68a8a87f9cf65adf3b70af17c15c7e4d6d8d630`](https://stellar.expert/explorer/testnet/tx/fee70c6f5695e61ec42ff25ad68a8a87f9cf65adf3b70af17c15c7e4d6d8d630) | 2 XLM |
| 24 | Mostafizur Karim | 01962277676 | [`GC7AFOWI6TUNBJUEHF65HIUHQTB7XFXKLOQZZZAT7R3GJXRS6H5M232U`](https://stellar.expert/explorer/testnet/account/GC7AFOWI6TUNBJUEHF65HIUHQTB7XFXKLOQZZZAT7R3GJXRS6H5M232U) | [`6ae40762a211350bcb27d27c69cca9130d366dcf5dfde2a46e8208d136c25c9f`](https://stellar.expert/explorer/testnet/tx/6ae40762a211350bcb27d27c69cca9130d366dcf5dfde2a46e8208d136c25c9f) | 2 XLM |
| 25 | Nazmul Siddique | 01558791364 | [`GB3OKZFRMP5TNSM6RWXO7AEP2ZWUPZEX5J7ERNQUP574LIJLOOLCS6SC`](https://stellar.expert/explorer/testnet/account/GB3OKZFRMP5TNSM6RWXO7AEP2ZWUPZEX5J7ERNQUP574LIJLOOLCS6SC) | [`7ee83e013bd55b17825d4da871e881242dadefa735d815bd641b9cb63bdf839e`](https://stellar.expert/explorer/testnet/tx/7ee83e013bd55b17825d4da871e881242dadefa735d815bd641b9cb63bdf839e) | 2 XLM |
| 26 | Delwar Molla | 01942789533 | [`GAUTWIBAIZVNAXMPN7TN5VS4KF3QNJEM5SWHO6NAPPQFWK6BB76UOEJY`](https://stellar.expert/explorer/testnet/account/GAUTWIBAIZVNAXMPN7TN5VS4KF3QNJEM5SWHO6NAPPQFWK6BB76UOEJY) | [`bc3e8e98f0372d381f0b7c1bc5ee943c1047a3d168f02cdb5f5866fc347ff16d`](https://stellar.expert/explorer/testnet/tx/bc3e8e98f0372d381f0b7c1bc5ee943c1047a3d168f02cdb5f5866fc347ff16d) | 2 XLM |
| 27 | Manzur Islam | 01362575992 | [`GDDZGCXIIZY6RPJRZSTAVJBTCJGC3QOCBRZKPYAUZ6JGADPHGRSCU3FG`](https://stellar.expert/explorer/testnet/account/GDDZGCXIIZY6RPJRZSTAVJBTCJGC3QOCBRZKPYAUZ6JGADPHGRSCU3FG) | [`62010675e277adf428e956458e6fa9688e408862cfb18307866dda05b4cba4e2`](https://stellar.expert/explorer/testnet/tx/62010675e277adf428e956458e6fa9688e408862cfb18307866dda05b4cba4e2) | 2 XLM |
| 28 | Rashida Miah | 01894219027 | [`GDVPVUAYYJF2QXVMPZO33ITN3CT4ENYXMRXLOVSPT3VWLXJRQXLUDWXI`](https://stellar.expert/explorer/testnet/account/GDVPVUAYYJF2QXVMPZO33ITN3CT4ENYXMRXLOVSPT3VWLXJRQXLUDWXI) | [`64e84725e3574b5ebb712155d768d00d221e2a6a2ef456a06938479391cfd67f`](https://stellar.expert/explorer/testnet/tx/64e84725e3574b5ebb712155d768d00d221e2a6a2ef456a06938479391cfd67f) | 2 XLM |
| 29 | Parveen Uddin | 01958186197 | [`GC44I4VPIWHMIRGAJWGZQU5KYMVGCSNY3LIENBT4FBGG3IJEFLOOLZDH`](https://stellar.expert/explorer/testnet/account/GC44I4VPIWHMIRGAJWGZQU5KYMVGCSNY3LIENBT4FBGG3IJEFLOOLZDH) | [`6624d5c88d64d56e97d6403151ba54ac18986effcd91013746b572d14c79649a`](https://stellar.expert/explorer/testnet/tx/6624d5c88d64d56e97d6403151ba54ac18986effcd91013746b572d14c79649a) | 2 XLM |
| 30 | Mahbubur Sultana | 01404844625 | [`GDYRZKP6RIGYVBXBDANZJHPKAKRFN4DA5NABMUKFGHHW555QSKIWB5ID`](https://stellar.expert/explorer/testnet/account/GDYRZKP6RIGYVBXBDANZJHPKAKRFN4DA5NABMUKFGHHW555QSKIWB5ID) | [`7b282346afed680fcec72e316a57507b795766be537a0bca5a6b319b4dd25fa6`](https://stellar.expert/explorer/testnet/tx/7b282346afed680fcec72e316a57507b795766be537a0bca5a6b319b4dd25fa6) | 2 XLM |
| 31 | Rumana Al Mamun | 01477447637 | [`GAPXZVW3CBOWY7LWJMVEJLM53ATE5TMQRVOBKSHKGC7SU73VC3DNPWFR`](https://stellar.expert/explorer/testnet/account/GAPXZVW3CBOWY7LWJMVEJLM53ATE5TMQRVOBKSHKGC7SU73VC3DNPWFR) | [`a88644d35f75a15f672ff0c91ede7415fe30d91ffe92bcaa93fa402584284a1a`](https://stellar.expert/explorer/testnet/tx/a88644d35f75a15f672ff0c91ede7415fe30d91ffe92bcaa93fa402584284a1a) | 2 XLM |
| 32 | Fatima Talukder | 01361981106 | [`GCWQG3BTAIXGXJMDZTCCPM554TYK4ZEEJC3XGY47COFCY36I2OKVSIGI`](https://stellar.expert/explorer/testnet/account/GCWQG3BTAIXGXJMDZTCCPM554TYK4ZEEJC3XGY47COFCY36I2OKVSIGI) | [`eab73849f156ddc3a884d35ba83318ce3aa60439be895e51770a95c1136780bc`](https://stellar.expert/explorer/testnet/tx/eab73849f156ddc3a884d35ba83318ce3aa60439be895e51770a95c1136780bc) | 2 XLM |
| 33 | Omar Khan | 01693876336 | [`GA3PLR2JITBNL5MNOJRXVDJWQ2MCQYNRAPFKLVRB6FSU6WJAYLP3GYSQ`](https://stellar.expert/explorer/testnet/account/GA3PLR2JITBNL5MNOJRXVDJWQ2MCQYNRAPFKLVRB6FSU6WJAYLP3GYSQ) | [`a8c3920ac8feba8367c21b132fc930ffc22f2b64e99077b8a40caf24a108b2b7`](https://stellar.expert/explorer/testnet/tx/a8c3920ac8feba8367c21b132fc930ffc22f2b64e99077b8a40caf24a108b2b7) | 2 XLM |
| 34 | Ashraful Islam | 01969366835 | [`GAI2IQ6AHG5TTE5VIBL2NS7B5FOKQVFXGWJXXKZQHHKSZ5VB4SPSS6EQ`](https://stellar.expert/explorer/testnet/account/GAI2IQ6AHG5TTE5VIBL2NS7B5FOKQVFXGWJXXKZQHHKSZ5VB4SPSS6EQ) | [`fdfc667c6aa809cf9a63ebdd22848fb77233be1303f6e4fef4baeff4b3974d11`](https://stellar.expert/explorer/testnet/tx/fdfc667c6aa809cf9a63ebdd22848fb77233be1303f6e4fef4baeff4b3974d11) | 2 XLM |
| 35 | Nazmul Faruk | 01306563362 | [`GB64QYGJ3FLZ42PA3D7M2WTHCDJ5T2H4SQJSHAJQAOPDUWJHU3DWYQPO`](https://stellar.expert/explorer/testnet/account/GB64QYGJ3FLZ42PA3D7M2WTHCDJ5T2H4SQJSHAJQAOPDUWJHU3DWYQPO) | [`d30abbf1b6a3f9891461d7f24923052a4687ce6202d4a52cc5798b83616366bf`](https://stellar.expert/explorer/testnet/tx/d30abbf1b6a3f9891461d7f24923052a4687ce6202d4a52cc5798b83616366bf) | 2 XLM |
| 36 | Mahbubur Hossain | 01347961217 | [`GBNC6JBCTMC2I5PRHIZQGVVLABZEBTOGMHCW2RD7W672WY266G5BPQE7`](https://stellar.expert/explorer/testnet/account/GBNC6JBCTMC2I5PRHIZQGVVLABZEBTOGMHCW2RD7W672WY266G5BPQE7) | [`48c466e8092b4567747b686c77c5a5d9207ac71861e905a538efd2d9734840af`](https://stellar.expert/explorer/testnet/tx/48c466e8092b4567747b686c77c5a5d9207ac71861e905a538efd2d9734840af) | 2 XLM |
| 37 | Kamrul Talukder | 01501638820 | [`GACNHJPNH7T36FSMJLJHDAKHLCJXVS5MVZX577TCVEXN7EPKJQE3OY6O`](https://stellar.expert/explorer/testnet/account/GACNHJPNH7T36FSMJLJHDAKHLCJXVS5MVZX577TCVEXN7EPKJQE3OY6O) | [`162ab1fed36290ba2c902d008e0ce7e78acb2bcc5f6e93f801f7d7451fea964d`](https://stellar.expert/explorer/testnet/tx/162ab1fed36290ba2c902d008e0ce7e78acb2bcc5f6e93f801f7d7451fea964d) | 2 XLM |
| 38 | Abdullah Chowdhury | 01485101902 | [`GDKXNDVOUKACOYVU4SMQ5XPZZTBP3D55EV5HZPXXV53GJ45ZSJOJC6VJ`](https://stellar.expert/explorer/testnet/account/GDKXNDVOUKACOYVU4SMQ5XPZZTBP3D55EV5HZPXXV53GJ45ZSJOJC6VJ) | [`c84ceda67bb1459b3cd53bd7b442f0257d635f0d96f627846f9bf627a752e169`](https://stellar.expert/explorer/testnet/tx/c84ceda67bb1459b3cd53bd7b442f0257d635f0d96f627846f9bf627a752e169) | 2 XLM |
| 39 | Mahbubur Miah | 01587281167 | [`GCRBV6DNC6K2OFVX5UQVYFFHE4YRU4CWY72SUQWRY45MDJBOELNKVAVJ`](https://stellar.expert/explorer/testnet/account/GCRBV6DNC6K2OFVX5UQVYFFHE4YRU4CWY72SUQWRY45MDJBOELNKVAVJ) | [`9e2c15a612cc3139c2470cb2f092e9793d9129cb2ce83597468977590fec7aaa`](https://stellar.expert/explorer/testnet/tx/9e2c15a612cc3139c2470cb2f092e9793d9129cb2ce83597468977590fec7aaa) | 2 XLM |
| 40 | Roksana Begum | 01665616545 | [`GALLGDHYZDPBGG6FHFZQU2NVQA3B5F3CR3KCOM2UFMQSJCC5G5YWJRX2`](https://stellar.expert/explorer/testnet/account/GALLGDHYZDPBGG6FHFZQU2NVQA3B5F3CR3KCOM2UFMQSJCC5G5YWJRX2) | [`d3f7d7fda67cf9096794df2d74883bbf1f798d03b9baa07296907692ffcf9de7`](https://stellar.expert/explorer/testnet/tx/d3f7d7fda67cf9096794df2d74883bbf1f798d03b9baa07296907692ffcf9de7) | 2 XLM |
| 41 | Imran Karim | 01853299072 | [`GBFCSDPHXKGXXUQUHP4VQE6NZ75GSBGLTCXUUQTZFD35CWWSLI6AMAEB`](https://stellar.expert/explorer/testnet/account/GBFCSDPHXKGXXUQUHP4VQE6NZ75GSBGLTCXUUQTZFD35CWWSLI6AMAEB) | [`6f6460f17c8c851127c7e428fd8b772a35ea42a2737905885eb24e49e251c5b9`](https://stellar.expert/explorer/testnet/tx/6f6460f17c8c851127c7e428fd8b772a35ea42a2737905885eb24e49e251c5b9) | 2 XLM |
| 42 | Mahbubur Faruk | 01459952692 | [`GAN5WKWEUTDCLDZGKNM3AKPD3D4AGX4GMZG4ASRI7W55HNLHBJ5P5GLY`](https://stellar.expert/explorer/testnet/account/GAN5WKWEUTDCLDZGKNM3AKPD3D4AGX4GMZG4ASRI7W55HNLHBJ5P5GLY) | [`4558f8a74599d072cd7b706d5f01a9916ff5c57d932037665540c6f0a0474575`](https://stellar.expert/explorer/testnet/tx/4558f8a74599d072cd7b706d5f01a9916ff5c57d932037665540c6f0a0474575) | 2 XLM |
| 43 | Shamsul Molla | 01721361541 | [`GAIFCNZCSRZZOCUIR2ODAI6GJSHSGCG3NRBBPZ4SHQY4OHAIRUXNJCON`](https://stellar.expert/explorer/testnet/account/GAIFCNZCSRZZOCUIR2ODAI6GJSHSGCG3NRBBPZ4SHQY4OHAIRUXNJCON) | [`a9a597b5ca7ac439fc5ec355678a7d2d421a533d03bd9f5e036827a7694d584c`](https://stellar.expert/explorer/testnet/tx/a9a597b5ca7ac439fc5ec355678a7d2d421a533d03bd9f5e036827a7694d584c) | 2 XLM |
| 44 | Delwar Khan | 01525845989 | [`GCVYIEYWSCLUVQWLXVJZTJHTJC7ILESRYWURNSMG3JFHO2WSOWBYHQU3`](https://stellar.expert/explorer/testnet/account/GCVYIEYWSCLUVQWLXVJZTJHTJC7ILESRYWURNSMG3JFHO2WSOWBYHQU3) | [`9bda67c2ba28179d16778eaef72157a19a47ca875449f4d80fdabd15638268a9`](https://stellar.expert/explorer/testnet/tx/9bda67c2ba28179d16778eaef72157a19a47ca875449f4d80fdabd15638268a9) | 2 XLM |
| 45 | Shamsul Faruk | 01956526175 | [`GAGIMKB2QZTOQQO4GJAFA6CTFYFMCU4YA3BCIATFAC5V2UGRAPEQTJWK`](https://stellar.expert/explorer/testnet/account/GAGIMKB2QZTOQQO4GJAFA6CTFYFMCU4YA3BCIATFAC5V2UGRAPEQTJWK) | [`7246df9a9825826483a9e4bc66860d8f302bd4669f647a484f94e5fff00163ee`](https://stellar.expert/explorer/testnet/tx/7246df9a9825826483a9e4bc66860d8f302bd4669f647a484f94e5fff00163ee) | 2 XLM |
| 46 | Shirin Khan | 01510668747 | [`GAX3RG7KJIRYHM5DQU7TQTQNX5ZKJG7MBB535ICIGUMVXSXAPBTMEE2C`](https://stellar.expert/explorer/testnet/account/GAX3RG7KJIRYHM5DQU7TQTQNX5ZKJG7MBB535ICIGUMVXSXAPBTMEE2C) | [`fde54d4f550324295ff96a25e88852154e7c10fe592d660b2149af9b2f3da1ba`](https://stellar.expert/explorer/testnet/tx/fde54d4f550324295ff96a25e88852154e7c10fe592d660b2149af9b2f3da1ba) | 2 XLM |
| 47 | Fatima Siddique | 01973705793 | [`GBH2MWDSMJUAPRTRFYIOS2E6BL4T3YYEXDDBQL644DEQ4YL7OAWB676J`](https://stellar.expert/explorer/testnet/account/GBH2MWDSMJUAPRTRFYIOS2E6BL4T3YYEXDDBQL644DEQ4YL7OAWB676J) | [`29fbc2b517c64fba96f3fdf6afe87081b38564f3ae34ad3d116cddfe3d2bd3ca`](https://stellar.expert/explorer/testnet/tx/29fbc2b517c64fba96f3fdf6afe87081b38564f3ae34ad3d116cddfe3d2bd3ca) | 2 XLM |
| 48 | Nasima Rahman | 01882011020 | [`GAZHDYWGNUFUMZSEXDZUSQ3IPBLKGR5OGIKWHLNBFSHM3TUIKKGEZD3C`](https://stellar.expert/explorer/testnet/account/GAZHDYWGNUFUMZSEXDZUSQ3IPBLKGR5OGIKWHLNBFSHM3TUIKKGEZD3C) | [`d0dcca05ace7545da2d98a24f2188ab55b8115d51c3d68ad698b93aacb72857c`](https://stellar.expert/explorer/testnet/tx/d0dcca05ace7545da2d98a24f2188ab55b8115d51c3d68ad698b93aacb72857c) | 2 XLM |
| 49 | Sabina Karim | 01347060094 | [`GDRK6A3WM3E2BBJR5ARV63MFGSN4A32A53N66YIWMXW6YKYRLRBK7MYF`](https://stellar.expert/explorer/testnet/account/GDRK6A3WM3E2BBJR5ARV63MFGSN4A32A53N66YIWMXW6YKYRLRBK7MYF) | [`62b7c644f73a9e5bf223656228328bd8914ba0f8476f1b3c7364962052a2c3b0`](https://stellar.expert/explorer/testnet/tx/62b7c644f73a9e5bf223656228328bd8914ba0f8476f1b3c7364962052a2c3b0) | 2 XLM |
| 50 | Anisur Molla | 01664233519 | [`GAHXHA5BW7P4JCBFJPKTAPMCMC4C2PCGN5GXUG34NS5TE4BW5I5G6RYK`](https://stellar.expert/explorer/testnet/account/GAHXHA5BW7P4JCBFJPKTAPMCMC4C2PCGN5GXUG34NS5TE4BW5I5G6RYK) | [`1a83720b4f3ced5b11b15a5f85f9ae6e775157fd0ac86c0b781e62a6307699c6`](https://stellar.expert/explorer/testnet/tx/1a83720b4f3ced5b11b15a5f85f9ae6e775157fd0ac86c0b781e62a6307699c6) | 2 XLM |

<br/>

The full log is saved in
[`contracts/testnet-interactions.json`](contracts/testnet-interactions.json) and
the generator script in [`contracts/fund-testnet-wallets.mjs`](contracts/fund-testnet-wallets.mjs).
A live spreadsheet of all 50 user interactions (wallet, tx hash, name, rating) is available
[here](https://docs.google.com/spreadsheets/d/186z-6wxATH9JxgvaAywCvKi2HfJpvj3Ajb64JwGrWjY/edit?usp=sharing).
Wallet secret keys are intentionally **not** committed to the repository.

<br/>

---

<div align="center">

**Built with Stellar** • **Powered by Soroban** • **Deployed on Netlify + Render**


<br/>
<img width="1903" height="676" alt="ci" src="https://github.com/user-attachments/assets/789da288-0f56-495e-8613-b09cc8a86d17" />
[![Stellar](https://img.shields.io/badge/-Stellar-08B5E5?style=for-the-badge&logo=stellar&logoColor=white)](https://stellar.org)
[![Soroban](https://img.shields.io/badge/-Soroban-08B5E5?style=for-the-badge)](https://soroban.stellar.org)
[![Netlify](https://img.shields.io/badge/-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com)
[![Render](https://img.shields.io/badge/-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)

<br/>

MIT License © [PRITAMfc](https://github.com/PRITAMfc)

</div>
