"use client"

import { motion } from "framer-motion"
import { Server, Globe, Database, Shield, CloudCog } from "lucide-react"

const ASSETS = [
  { label: "Web Servers", count: 12, healthy: 11, icon: Globe, color: "#22D3EE" },
  { label: "Databases", count: 8, healthy: 8, icon: Database, color: "#00CC58" },
  { label: "Cloud Instances", count: 47, healthy: 43, icon: CloudCog, color: "#3B8FEF" },
  { label: "Endpoints", count: 275, healthy: 236, icon: Server, color: "#A855F7" },
  { label: "Firewalls", count: 4, healthy: 4, icon: Shield, color: "#00CC58" },
]

export function DashboardAssetStatus() {
  return (
    <div className="hud-panel rounded-2xl border border-aegis p-5 flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-foreground">Asset Health</h2>

      <div className="flex flex-col gap-3">
        {ASSETS.map((asset, i) => {
          const Icon = asset.icon
          const percent = Math.round((asset.healthy / asset.count) * 100)
          const issues = asset.count - asset.healthy
          return (
            <motion.div
              key={asset.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="group flex items-center gap-3"
            >
              <div
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: asset.color + "15", border: `1px solid ${asset.color}25` }}
              >
                <Icon className="size-3.5" style={{ color: asset.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-foreground">{asset.label}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {asset.healthy}/{asset.count}
                    {issues > 0 && (
                      <span className="text-aegis-medium ml-1">({issues} issues)</span>
                    )}
                  </span>
                </div>
                <div className="h-1 rounded-full bg-aegis-silver-800 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: asset.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between rounded-lg bg-aegis-elevated border border-aegis px-3 py-2 mt-1">
        <span className="text-[11px] text-muted-foreground">Total assets at risk</span>
        <span className="text-[11px] font-bold text-aegis-medium font-mono">44</span>
      </div>
    </div>
  )
}
