import { useState, useEffect, useCallback } from 'react'
import { useContract } from '@/hooks/useContract'
import { useWallet, TxStatus } from '@/hooks/useWallet'
import { FAUCET_CONTRACT_ID } from '@/config/stellar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { FileText, Play, Refresh, ArrowUpRight, CheckCircle, XCircle, Clock } from 'reicon-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import * as StellarSdk from '@stellar/stellar-sdk'

export function ContractPanel() {
  const { address, txStatus, txError } = useWallet()
  const { hasContract, readContract, writeContract, getContractEvents } = useContract()
  const [contractValue, setContractValue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [events, setEvents] = useState<unknown[]>([])
  const [loading, setLoading] = useState(false)
  const [isWriting, setIsWriting] = useState(false)

  const fetchState = useCallback(async () => {
    if (!hasContract || !address) return
    try {
      const result = await readContract('get_message')
      if (result && 'val' in result) {
        const val = StellarSdk.xdr.ScVal.fromXDR(result.val as string, 'base64')
        if (val.switch().name === 'scvBytes') {
          setContractValue(Buffer.from(val.bytes()).toString('utf-8'))
        } else {
          setContractValue(JSON.stringify(val.toXDR().toString('base64')))
        }
      }
    } catch {
      setContractValue('(unreadable)')
    }
  }, [hasContract, address, readContract])

  const fetchEvents = useCallback(async () => {
    if (!hasContract) return
    setLoading(true)
    try {
      const evts = await getContractEvents()
      setEvents(evts)
    } catch {
      // ignore
    }
    setLoading(false)
  }, [hasContract, getContractEvents])

  useEffect(() => {
    if (hasContract && address) {
      fetchState()
      fetchEvents()
      const interval = setInterval(fetchEvents, 10000)
      return () => clearInterval(interval)
    }
  }, [hasContract, address, fetchState, fetchEvents])

  const handleSetValue = async () => {
    if (!inputValue || !address) return
    setIsWriting(true)
    try {
      const ownerScVal = new StellarSdk.Address(address).toScVal()
      const msgScVal = StellarSdk.nativeToScVal(inputValue, { type: 'bytes' })

      await writeContract('set_message', [ownerScVal, msgScVal])

      toast.success('Contract updated!')
      setInputValue('')
      await fetchState()
      await fetchEvents()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Contract call failed'
      toast.error(msg)
    } finally {
      setIsWriting(false)
    }
  }

  if (!hasContract) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="h-full p-4 sm:p-5 rounded-2xl bg-card border border-kraken-border-gray shadow-kraken flex flex-col items-center justify-center text-center">
          <div className="p-2 rounded-lg bg-amber-500/20 mb-3">
            <FileText className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-sm font-semibold text-kraken-black mb-1">Smart Contract</p>
          <p className="text-xs text-kraken-gray mb-3">Deploy a Soroban contract to enable on-chain interactions</p>
          <Badge variant="warning" className="text-[10px]">Not Configured</Badge>
        </div>
      </motion.div>
    )
  }

  const contractTxStatus: Record<string, { icon: React.ReactNode; label: string; color: string } | null> = {
    [TxStatus.IDLE]: null,
    [TxStatus.PENDING]: { icon: <Clock className="w-3.5 h-3.5" />, label: 'Awaiting approval...', color: 'text-amber-500' },
    [TxStatus.SUBMITTED]: { icon: <Spinner size="sm" />, label: 'Confirming on-chain...', color: 'text-primary' },
    [TxStatus.SUCCESS]: { icon: <CheckCircle className="w-3.5 h-3.5" />, label: 'Contract updated!', color: 'text-kraken-green' },
    [TxStatus.FAILED]: { icon: <XCircle className="w-3.5 h-3.5" />, label: 'Failed', color: 'text-red-500' },
  }

  const currentStatus = contractTxStatus[txStatus]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <div className="h-full p-4 sm:p-5 rounded-2xl bg-card border border-kraken-border-gray shadow-kraken flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-kraken-purple-subtle">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-semibold text-kraken-black">Contract</span>
          </div>
          <Badge variant="success" className="text-[10px]">Deployed</Badge>
        </div>

        <div className="space-y-3 flex-1">
          <div className="p-2.5 rounded-lg bg-muted border border-kraken-border-gray">
            <p className="text-[10px] text-kraken-gray mb-1">Contract ID</p>
            <code className="text-[11px] font-mono text-primary break-all">
              {FAUCET_CONTRACT_ID.slice(0, 16)}...{FAUCET_CONTRACT_ID.slice(-8)}
            </code>
          </div>

          {address && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-kraken-gray">Message (on-chain state)</Label>
                <div className="p-2.5 rounded-lg bg-muted border border-kraken-border-gray text-xs">
                  <span className="text-kraken-gray">Value: </span>
                  <span className="text-kraken-black font-mono">{contractValue || '(empty)'}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-kraken-gray">Set Message (calls contract)</Label>
                <div className="flex gap-1.5">
                  <Input
                    placeholder="Enter new message"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="h-8 text-xs border-kraken-border-gray"
                    disabled={isWriting}
                  />
                  <Button
                    variant="stellar"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    disabled={!inputValue || isWriting}
                    onClick={handleSetValue}
                  >
                    {isWriting ? <Spinner size="sm" /> : <Play className="w-3.5 h-3.5" />}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <AnimatePresence>
            {currentStatus && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className={`flex items-center gap-2 text-xs ${currentStatus.color}`}
              >
                {currentStatus.icon}
                <span>{currentStatus.label}</span>
                <Badge variant={txStatus === TxStatus.SUCCESS ? 'success' : txStatus === TxStatus.FAILED ? 'destructive' : 'stellar'} className="text-[10px] ml-auto">
                  {txStatus}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>

          {txError && (
            <p className="text-[11px] text-red-500 truncate">{txError}</p>
          )}

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-kraken-gray">Events</Label>
              <Button variant="ghost" size="sm" onClick={fetchEvents} disabled={loading} className="h-6 px-1.5">
                <Refresh className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            <div className="p-2.5 rounded-lg bg-muted border border-kraken-border-gray max-h-24 md:max-h-20 overflow-y-auto">
              {events.length === 0 ? (
                <p className="text-[10px] text-kraken-gray-light">No events yet</p>
              ) : (
                events.slice(0, 3).map((event: unknown, i: number) => (
                  <div key={i} className="text-[10px] text-kraken-gray py-0.5 border-b border-kraken-border-gray last:border-0 truncate">
                    {JSON.stringify(event).slice(0, 60)}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <a
          href={`https://stellar.expert/explorer/testnet/contract/${FAUCET_CONTRACT_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-1 text-[11px] text-primary/70 hover:text-primary transition-colors"
        >
          View on Stellar Expert
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  )
}
