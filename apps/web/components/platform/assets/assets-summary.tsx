"use client"

import { motion } from "framer-motion"
import { Server, Globe, Cloud, Shield, AlertTriangle } from "lucide-react"

const SUMMARY_ITEMS = [
  { label: "Total Assets", value: "247", icon: Server, color: "text-aegis-blue-400", bg: "bg-aegis-blue-500/10 border-aegis-blue-500/20", delta: "+12 this week" },
  { label: "Domains", value: "38", icon: Globe, color: "text-aegis-cyan-400", bg: "bg-aegis-cyan-400/10 border-aegis-cyan-400/20", delta: "4 expiring soon" },
  { label: "Cloud Assets", value: "142", icon: Cloud, color: "text-aegis-purple-400", bg: "bg-aegis-purple-400/10 border-aegis-purple-400/20", delta: "AWS, GCP, Azure" },
  { label: "Healthy", value: "219", icon: Shield, color: "text-aegis-green-400", bg: "bg-aegis-green-400/10 border-aegis-green-400/20", delta: "88.7% of fleet" },
  { label: "At Risk", value: "28", icon: AlertTriangle, color: "text-aegis-high", bg: "bg-aegis-high/10 border-aegis-high/20", delta: "Needs attention" },
]

export function AssetsSummary() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {SUMMARY_ITEMS.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="hud-panel rounded-xl border border-aegis p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${item.bg}`}>
              <item.icon className={`size-3.5 ${item.color}`} />
            </div>
          </div>
          <div className={`text-2xl font-bold font-mono ${item.color}`}>{item.value}</div>
          <div className="text-xs font-medium text-foreground mt-0.5">{item.label}</div>
          <div className="text-[10px] text-muted-foreground mt-1">{item.delta}</div>
        </motion.div>
      ))}
    </div>
  )
}
