"use client"

import { motion } from "framer-motion"
import { Shield, AlertTriangle, XCircle, Server } from "lucide-react"

const ENV_GROUPS = [
  {
    name: "Production",
    color: "text-aegis-green-400",
    border: "border-aegis-green-400/20",
    bg: "bg-aegis-green-400/5",
    assets: [
      { name: "api.prod", status: "healthy", type: "domain" },
      { name: "web-prod-01", status: "healthy", type: "server" },
      { name: "db-prod-primary", status: "warning", type: "server" },
      { name: "k8s-cluster", status: "healthy", type: "cloud" },
    ],
  },
  {
    name: "AWS Cloud",
    color: "text-aegis-purple-400",
    border: "border-aegis-purple-400/20",
    bg: "bg-aegis-purple-400/5",
    assets: [
      { name: "s3://backups", status: "warning", type: "cloud" },
      { name: "rds-analytics", status: "warning", type: "cloud" },
      { name: "lambda-auth", status: "healthy", type: "cloud" },
    ],
  },
  {
    name: "Endpoints",
    color: "text-aegis-high",
    border: "border-aegis-high/20",
    bg: "bg-aegis-high/5",
    assets: [
      { name: "dev-laptop-john", status: "critical", type: "endpoint" },
      { name: "vpn-gateway-01", status: "offline", type: "server" },
      { name: "wks-finance-02", status: "healthy", type: "endpoint" },
    ],
  },
]

const STATUS_ICON = {
  healthy: <Shield className="size-2.5 text-aegis-green-400" />,
  warning: <AlertTriangle className="size-2.5 text-aegis-high" />,
  critical: <AlertTriangle className="size-2.5 text-aegis-critical" />,
  offline: <XCircle className="size-2.5 text-muted-foreground" />,
}

export function AssetsMap() {
  return (
    <div className="hud-panel rounded-2xl border border-aegis flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-aegis">
        <div>
          <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">// ENVIRONMENT MAP</p>
          <h3 className="text-sm font-semibold text-foreground mt-0.5">Infrastructure Overview</h3>
        </div>
        <Server className="size-4 text-muted-foreground" />
      </div>

      <div className="flex-1 p-4 space-y-3">
        {ENV_GROUPS.map((group, gi) => (
          <motion.div
            key={group.name}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: gi * 0.1 }}
            className={`rounded-xl border ${group.border} ${group.bg} p-3`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${group.color}`}>
                {group.name}
              </span>
              <span className="text-[9px] text-muted-foreground font-mono">{group.assets.length} assets</span>
            </div>
            <div className="space-y-1.5">
              {group.assets.map((asset, ai) => (
                <div key={ai} className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-foreground">{asset.name}</span>
                  <div className="flex items-center gap-1">
                    {STATUS_ICON[asset.status as keyof typeof STATUS_ICON]}
                    <span className="text-[9px] text-muted-foreground uppercase">{asset.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 border-t border-aegis">
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: "Healthy", value: "219", color: "text-aegis-green-400" },
            { label: "Warning", value: "19", color: "text-aegis-high" },
            { label: "Critical", value: "7", color: "text-aegis-critical" },
            { label: "Offline", value: "2", color: "text-muted-foreground" },
          ].map((s) => (
            <div key={s.label}>
              <div className={`text-sm font-bold font-mono ${s.color}`}>{s.value}</div>
              <div className="text-[9px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
