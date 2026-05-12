"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Globe, Server, Cloud, Laptop, Shield, AlertTriangle, XCircle, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AssetType = "domain" | "server" | "cloud" | "endpoint"
type AssetStatus = "healthy" | "warning" | "critical" | "offline"

const ASSETS = [
  { id: "a1", name: "api.prod.acme.com", type: "domain" as AssetType, status: "healthy" as AssetStatus, ip: "34.102.136.180", os: "—", risk: 12, tags: ["production", "public"], lastScan: "2m ago" },
  { id: "a2", name: "web-prod-01", type: "server" as AssetType, status: "healthy" as AssetStatus, ip: "10.0.1.10", os: "Ubuntu 22.04", risk: 18, tags: ["production"], lastScan: "5m ago" },
  { id: "a3", name: "db-prod-primary", type: "server" as AssetType, status: "warning" as AssetStatus, ip: "10.0.2.5", os: "Ubuntu 20.04", risk: 54, tags: ["production", "database"], lastScan: "8m ago" },
  { id: "a4", name: "s3://acme-backups", type: "cloud" as AssetType, status: "warning" as AssetStatus, ip: "AWS S3", os: "—", risk: 47, tags: ["aws", "storage"], lastScan: "12m ago" },
  { id: "a5", name: "k8s-cluster-prod", type: "cloud" as AssetType, status: "healthy" as AssetStatus, ip: "GKE", os: "Kubernetes 1.28", risk: 21, tags: ["gcp", "k8s"], lastScan: "15m ago" },
  { id: "a6", name: "dev-laptop-john", type: "endpoint" as AssetType, status: "critical" as AssetStatus, ip: "192.168.1.45", os: "macOS 14.2", risk: 87, tags: ["endpoint", "dev"], lastScan: "1h ago" },
  { id: "a7", name: "payroll.acme.com", type: "domain" as AssetType, status: "healthy" as AssetStatus, ip: "185.60.112.157", os: "—", risk: 9, tags: ["finance", "public"], lastScan: "3m ago" },
  { id: "a8", name: "vpn-gateway-01", type: "server" as AssetType, status: "offline" as AssetStatus, ip: "10.0.0.1", os: "pfSense 2.7", risk: 73, tags: ["network", "vpn"], lastScan: "6h ago" },
  { id: "a9", name: "cdn.acme-static.net", type: "domain" as AssetType, status: "healthy" as AssetStatus, ip: "Cloudflare", os: "—", risk: 5, tags: ["cdn", "public"], lastScan: "1m ago" },
  { id: "a10", name: "rds-analytics-01", type: "cloud" as AssetType, status: "warning" as AssetStatus, ip: "AWS RDS", os: "PostgreSQL 15", risk: 61, tags: ["aws", "database"], lastScan: "20m ago" },
]

const TYPE_ICON = {
  domain: Globe,
  server: Server,
  cloud: Cloud,
  endpoint: Laptop,
}

const TYPE_COLOR = {
  domain: "text-aegis-cyan-400",
  server: "text-aegis-blue-400",
  cloud: "text-aegis-purple-400",
  endpoint: "text-aegis-green-400",
}

const STATUS_CONFIG = {
  healthy: { icon: Shield, label: "HEALTHY", variant: "online" as const },
  warning: { icon: AlertTriangle, label: "WARNING", variant: "warning" as const },
  critical: { icon: AlertTriangle, label: "CRITICAL", variant: "critical" as const },
  offline: { icon: XCircle, label: "OFFLINE", variant: "info" as const },
}

export function AssetsTable() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filtered = ASSETS.filter((a) =>
    (typeFilter === "all" || a.type === typeFilter) &&
    (!search || a.name.toLowerCase().includes(search.toLowerCase()) || a.ip.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="hud-panel rounded-2xl border border-aegis flex flex-col">
      <div className="flex items-center gap-3 p-4 border-b border-aegis">
        <div className="flex items-center gap-2 flex-1 rounded-lg border border-aegis bg-aegis-surface/50 px-3 py-1.5">
          <Search className="size-3.5 text-muted-foreground flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assets, IPs..."
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
          />
        </div>
        <div className="flex gap-1">
          {["all", "domain", "server", "cloud", "endpoint"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                "rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider transition-colors border capitalize",
                typeFilter === t
                  ? "bg-aegis-blue-500/15 text-aegis-blue-300 border-aegis-blue-500/30"
                  : "text-muted-foreground border-aegis hover:border-aegis-bright",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-aegis">
              {["Asset", "Type", "IP / Provider", "Risk Score", "Status", "Last Scan", ""].map((col) => (
                <th key={col} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((asset, i) => {
              const Icon = TYPE_ICON[asset.type]
              const status = STATUS_CONFIG[asset.status]
              return (
                <motion.tr
                  key={asset.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="group border-b border-aegis/50 last:border-0 hover:bg-aegis-elevated/40 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Icon className={cn("size-3.5 flex-shrink-0", TYPE_COLOR[asset.type])} />
                      <span className="text-xs font-medium text-foreground font-mono">{asset.name}</span>
                    </div>
                    <div className="flex gap-1 mt-1 ml-5">
                      {asset.tags.map((tag) => (
                        <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full bg-aegis-elevated border border-aegis text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">{asset.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-mono text-aegis-cyan-400">{asset.ip}</span>
                    {asset.os !== "—" && (
                      <div className="text-[9px] text-muted-foreground/60 mt-0.5">{asset.os}</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-16 rounded-full bg-aegis-silver-800 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${asset.risk}%`,
                            backgroundColor: asset.risk >= 70 ? "#FF2D55" : asset.risk >= 40 ? "#FF6B00" : "#22D3EE",
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">{asset.risk}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={status.variant} dot>{status.label}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-mono text-muted-foreground">{asset.lastScan}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="icon-xs" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="size-3" />
                    </Button>
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-aegis bg-aegis-surface/30">
        <span className="text-xs text-muted-foreground">Showing {filtered.length} of {ASSETS.length} assets</span>
        <div className="flex gap-1">
          <Button variant="outline" size="xs">Previous</Button>
          <Button variant="outline" size="xs">Next</Button>
        </div>
      </div>
    </div>
  )
}
