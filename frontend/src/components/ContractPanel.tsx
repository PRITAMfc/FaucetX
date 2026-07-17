import { useState, useEffect } from 'react'
import { useContract } from '@/hooks/useContract'
import { useWallet } from '@/hooks/useWallet'
import { FAUCET_CONTRACT_ID } from '@/config/stellar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { FileCode, Play, RefreshCw, ExternalLink } from 'reicon-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export function ContractPanel() {
  const { address } = useWallet()
  const { hasContract, getContractEvents } = useContract()
  const [contractValue, setContractValue] = useState('')
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full">
        <Card className="stellar-card">
          <CardHeader className="text-center">
            <div className="mx-auto p-3 rounded-2xl bg-amber-500/20 w-fit">
              <FileCode className="w-8 h-8 text-amber-400" />
            </div>
            <CardTitle className="text-xl mt-4">Smart Contract</CardTitle>
            <CardDescription>
              Deploy a Soroban contract to enable on-chain interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-xl bg-white/5 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                No contract deployed yet. Follow the deployment guide in the README.
              </p>
              <Badge variant="warning">Contract Not Configured</Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full space-y-4">
      <Card className="stellar-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20">
                <FileCode className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Smart Contract</CardTitle>
                <CardDescription>Soroban contract on testnet</CardDescription>
              </div>
            </div>
            <Badge variant="success">Deployed</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 rounded-xl bg-white/5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Contract ID</span>
              <code className="text-cyan-400 font-mono text-xs">
                {FAUCET_CONTRACT_ID.slice(0, 12)}...{FAUCET_CONTRACT_ID.slice(-8)}
              </code>
            </div>
          </div>

          {address && (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Contract State</Label>
                <div className="p-3 rounded-xl bg-white/5 text-sm">
                  <span className="text-muted-foreground">Value: </span>
                  <span className="text-cyan-400 font-mono">{contractValue || '(empty)'}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Set Value</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter value"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Button variant="stellar" size="icon" disabled={!inputValue}>
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Recent Events</Label>
              <Button variant="ghost" size="sm" onClick={fetchEvents} disabled={loading}>
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            <div className="p-3 rounded-xl bg-white/5 max-h-40 overflow-y-auto">
              {events.length === 0 ? (
                <p className="text-xs text-muted-foreground">No events yet</p>
              ) : (
                events.slice(0, 5).map((event: unknown, i: number) => (
                  <div key={i} className="text-xs text-muted-foreground py-1 border-b border-white/5 last:border-0">
                    {JSON.stringify(event).slice(0, 100)}
                  </div>
                ))
              )}
            </div>
          </div>

          <a
            href={`https://stellar.expert/testnet/contract/${FAUCET_CONTRACT_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View Contract on Stellar Expert
            <ExternalLink className="w-4 h-4" />
          </a>
        </CardContent>
      </Card>
    </motion.div>
  )
}
