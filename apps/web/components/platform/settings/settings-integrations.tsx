"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Puzzle, CheckCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const INTEGRATIONS = [
  { id: "slack", name: "Slack", description: "Real-time alerts in your Slack channels", connected: true, icon: "💬" },
  { id: "pagerduty", name: "PagerDuty", description: "On-call escalation for critical incidents", connected: true, icon: "🚨" },
  { id: "jira", name: "Jira", description: "Sync incidents to Jira tickets automatically", connected: false, icon: "📋" },
  { id: "github", name: "GitHub", description: "Security scanning for repositories", connected: false, icon: "🐙" },
  { id: "splunk", name: "Splunk", description: "Forward logs to Splunk SIEM", connected: false, icon: "📊" },
  { id: "crowdstrike", name: "CrowdStrike", description: "Ingest EDR telemetry and alerts", connected: true, icon: "🦅" },
]

export function SettingsIntegrations() {
  const [connected, setConnected] = useState(
    Object.fromEntries(INTEGRATIONS.map((i) => [i.id, i.connected]))
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="hud-panel rounded-2xl border border-aegis"
    >
      <div className="flex items-center gap-3 p-4 border-b border-aegis">
        <Puzzle className="size-4 text-muted-foreground" />
        <div>
          <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">// INTEGRATIONS</p>
          <h3 className="text-sm font-semibold text-foreground">Connected Services</h3>
        </div>
      </div>

      <div className="divide-y divide-aegis/50">
        {INTEGRATIONS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-4"
          >
            <div className="text-xl flex-shrink-0">{item.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{item.name}</span>
                {connected[item.id] && (
                  <CheckCircle className="size-3 text-aegis-green-400" />
                )}
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{item.description}</p>
            </div>
            <Button
              variant={connected[item.id] ? "outline" : "ghost"}
              size="xs"
              className={cn(connected[item.id] && "text-aegis-critical hover:text-aegis-critical hover:border-aegis-critical/30")}
              onClick={() => setConnected((c) => ({ ...c, [item.id]: !c[item.id] }))}
            >
              {connected[item.id] ? "Disconnect" : (
                <span className="flex items-center gap-1"><Plus className="size-3" />Connect</span>
              )}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
