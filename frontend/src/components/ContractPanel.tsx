import { useState, useEffect } from 'react'
import { useContract } from '@/hooks/useContract'
import { useWallet } from '@/hooks/useWallet'
import { FAUCET_CONTRACT_ID } from '@/config/stellar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { FileText, Play, Refresh, ArrowUpRight } from 'reicon-react'
import { motion } from 'framer-motion'

export function ContractPanel() {
  const { address } = useWallet()
  const { hasContract, getContractEvents } = useContract()
  const [contractValue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [events, setEvents] = useState<unknown[]>([])
  const [loading, setLoading] = useState(false)

  const fetchEvents = async () => {
    if (!hasContract) return
    setLoading(true)
    try {
      const evts = await getContractEvents()
      setEvents(evts)
    } catch {
      // ignore
    }
    setLoading(false)
  }

  useEffect(() => {
    if (hasContract) {
      fetchEvents()
      const interval = setInterval(fetchEvents, 10000)
      return () => clearInterval(interval)
    }
  }, [hasContract])

  if (!hasContract) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="h-full p-5 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 flex flex-col items-center justify-center text-center">
          <div className="p-2 rounded-lg bg-amber-500/20 mb-3">
            <FileText className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-sm font-semibold text-white mb-1">Smart Contract</p>
          <p className="text-xs text-slate-500 mb-3">Deploy a Soroban contract to enable on-chain interactions</p>
          <Badge variant="warning" className="text-[10px]">Not Configured</Badge>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <div className="h-full p-5 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/20">
              <FileText className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-sm font-semibold text-white">Contract</span>
          </div>
          <Badge variant="success" className="text-[10px]">Deployed</Badge>
        </div>

        <div className="space-y-3 flex-1">
          <div className="p-2.5 rounded-lg bg-white/5">
            <p className="text-[10px] text-slate-500 mb-1">Contract ID</p>
            <code className="text-[11px] font-mono text-cyan-400 break-all">
              {FAUCET_CONTRACT_ID.slice(0, 16)}...{FAUCET_CONTRACT_ID.slice(-8)}
            </code>
          </div>

          {address && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs">State</Label>
                <div className="p-2.5 rounded-lg bg-white/5 text-xs">
                  <span className="text-slate-500">Value: </span>
                  <span className="text-cyan-400 font-mono">{contractValue || '(empty)'}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Set Value</Label>
                <div className="flex gap-1.5">
                  <Input
                    placeholder="Enter value"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="h-8 text-xs"
                  />
                  <Button variant="stellar" size="icon" className="h-8 w-8 shrink-0" disabled={!inputValue}>
                    <Play className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Events</Label>
              <Button variant="ghost" size="sm" onClick={fetchEvents} disabled={loading} className="h-6 px-1.5">
                <Refresh className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            <div className="p-2.5 rounded-lg bg-white/5 max-h-20 overflow-y-auto">
              {events.length === 0 ? (
                <p className="text-[10px] text-slate-500">No events yet</p>
              ) : (
                events.slice(0, 3).map((event: unknown, i: number) => (
                  <div key={i} className="text-[10px] text-slate-400 py-0.5 border-b border-white/5 last:border-0 truncate">
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
          className="mt-3 flex items-center justify-center gap-1 text-[11px] text-cyan-400/70 hover:text-cyan-400 transition-colors"
        >
          View on Stellar Expert
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  )
}
