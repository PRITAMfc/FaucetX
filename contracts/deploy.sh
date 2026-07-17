#!/bin/bash
# FaucetX Smart Contract Deployment Script
# This script deploys the FaucetContract to Stellar Testnet

set -e

echo "🚀 FaucetX Smart Contract Deployment"
echo "======================================"

# Check if stellar CLI is installed
if ! command -v stellar &> /dev/null; then
    echo "❌ stellar CLI not found. Install it:"
    echo "   cargo install --locked stellar-cli --features opt"
    exit 1
fi

# Check if wasm32 target is installed
if ! rustup target list --installed | grep -q "wasm32-unknown-unknown"; then
    echo "📦 Installing wasm32-unknown-unknown target..."
    rustup target add wasm32-unknown-unknown
fi

echo ""
echo "Step 1: Build the contract..."
cd contracts/faucet-contract
stellar contract build
echo "✅ Contract built successfully"

echo ""
echo "Step 2: Generate and fund deployer account..."
stellar keys generate faucet-deployer --network testnet --fund
echo "✅ Deployer account created and funded"

echo ""
echo "Step 3: Deploy contract to testnet..."
CONTRACT_ID=$(stellar contract deploy \
    --wasm target/wasm32-unknown-unknown/release/faucet_contract.wasm \
    --source-account faucet-deployer \
    --network testnet \
    --alias faucet_contract)

echo "✅ Contract deployed!"
echo "   Contract ID: $CONTRACT_ID"

echo ""
echo "Step 4: Initialize contract..."
stellar contract invoke \
    --id "$CONTRACT_ID" \
    --source-account faucet-deployer \
    --network testnet \
    -- \
    initialize \
    --owner faucet-deployer \
    --message HELLO

echo "✅ Contract initialized"

echo ""
echo "======================================"
echo "🎉 Deployment Complete!"
echo ""
echo "Add this to your frontend .env file:"
echo "VITE_FAUCET_CONTRACT_ID=$CONTRACT_ID"
echo ""
echo "Verify on Stellar Expert:"
echo "https://stellar.expert/testnet/contract/$CONTRACT_ID"
echo "======================================"
