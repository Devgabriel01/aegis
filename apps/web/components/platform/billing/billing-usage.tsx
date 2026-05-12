"use client"

import { motion } from "framer-motion"
import { Users, Server, Database, Scan, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

const USAGE_ITEMS = [
  { label: "Team Members", icon: Users, used: 8, limit: 15, unit: "members", color: "bg-aegis-blue-400" },
  { label: "Assets Monitored", icon: Server, used: 247, limit: 500, unit: "assets", color: "bg-aegis-cyan-400" },
  { label: "Log Ingestion", icon: Database, used: 67, limit: 100, unit: "GB / mo", color: "bg-aegis-purple-400" },
  { label: "Vulnerability Scans", icon: Scan, used: 142, limit: 500, unit: "scans / mo", color: "bg-aegis-green-400" },
  { label: "AI Analyst Queries", icon: Brain, used: 389, limit: 1000, unit: "queries / mo", color: "bg-yellow-400" },
]

export function BillingUsage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="hud-panel rounded-2xl border border-aegis flex flex-col h-full"
    >
      <div className="p-4 border-b border-aegis">
        <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">// USAGE</p>
        <h3 className="text-sm font-semibold text-foreground mt-0.5">Current Period Usage</h3>
        <p className="text-xs text-muted-foreground mt-0.5">May 1 – May 31, 2026</p>
      </div>

      <div className="flex-1 p-5 space-y-5">
        {USAGE_ITEMS.map((item, i) => {
          const pct = Math.round((item.used / item.limit) * 100)
          const isHigh = pct >= 80
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <item.icon className="size-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-foreground">{item.label}</span>
                  {isHigh && (
                    <span className="text-[9px] font-bold text-aegis-high uppercase px-1.5 py-0.5 rounded-full bg-aegis-high/10 border border-aegis-high/20">
                      HIGH
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  <span className={cn("font-bold", isHigh ? "text-aegis-high" : "text-foreground")}>{item.used.toLocaleString()}</span>
                  {" / "}{item.limit.toLocaleString()} {item.unit}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-aegis-silver-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  className={cn("h-full rounded-full", isHigh ? "bg-aegis-high" : item.color)}
                />
              </div>
              <div className="text-[9px] text-muted-foreground mt-1 text-right">{pct}% used</div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
