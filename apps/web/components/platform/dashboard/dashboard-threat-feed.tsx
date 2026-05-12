"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { ExternalLink, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const THREATS = [
  {
    id: "t1",
    title: "APT29 TTPs Detected",
    type: "APT",
    severity: "critical",
    source: "CrowdStrike Intel",
    ioc: "185.234.219.87",
    country: "🇷🇺",
    time: "2m ago",
    new: true,
  },
  {
    id: "t2",
    title: "Cobalt Strike Beacon",
    type: "MALWARE",
    severity: "critical",
    source: "IDS Alert",
    ioc: "b2e34c1d8f9a...",
    country: "🇺🇸",
    time: "8m ago",
    new: true,
  },
  {
    id: "t3",
    title: "Brute Force — SSH",
    type: "BRUTEFORCE",
    severity: "high",
    source: "Log Analysis",
    ioc: "103.56.88.42",
    country: "🇨🇳",
    time: "12m ago",
    new: false,
  },
  {
    id: "t4",
    title: "Phishing Campaign — HR",
    type: "PHISHING",
    severity: "high",
    source: "Email Filter",
    ioc: "payroll-update.xyz",
    country: "🇳🇬",
    time: "34m ago",
    new: false,
  },
  {
    id: "t5",
    title: "Port Scan Detected",
    type: "RECON",
    severity: "medium",
    source: "Firewall",
    ioc: "91.200.14.1",
    country: "🇩🇪",
    time: "1h ago",
    new: false,
  },
  {
    id: "t6",
    title: "Anomalous DNS Queries",
    type: "C2",
    severity: "medium",
    source: "DNS Monitor",
    ioc: "update.micro-soft.net",
    country: "🇳🇱",
    time: "2h ago",
    new: false,
  },
  {
    id: "t7",
    title: "SQLi Attempt — API",
    type: "SQLI",
    severity: "medium",
    source: "WAF",
    ioc: "/api/users?id=1'",
    country: "🌐",
    time: "3h ago",
    new: false,
  },
]

const SEV_MAP: Record<string, any> = {
  critical: "critical",
  high: "high",
  medium: "medium",
  low: "low",
}

export function DashboardThreatFeed() {
  const [filter, setFilter] = useState<string>("all")

  const filtered = filter === "all" ? THREATS : THREATS.filter((t) => t.severity === filter)

  return (
    <div className="hud-panel rounded-2xl border border-aegis p-5 flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-foreground">Threat Feed</h2>
          <span className="flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-aegis-critical opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-aegis-critical" />
          </span>
        </div>
        <button className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors">
          <RefreshCw className="size-3.5" />
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5">
        {["all", "critical", "high", "medium"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider transition-colors border",
              filter === f
                ? f === "critical" ? "bg-aegis-critical/15 text-aegis-critical border-aegis-critical/30"
                  : f === "high" ? "bg-aegis-high/15 text-aegis-high border-aegis-high/30"
                  : f === "medium" ? "bg-aegis-medium/15 text-aegis-medium border-aegis-medium/30"
                  : "bg-aegis-blue-500/15 text-aegis-blue-300 border-aegis-blue-500/30"
                : "text-muted-foreground border-aegis hover:border-aegis-bright",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto custom-scroll -mr-2 pr-2">
        {filtered.map((threat, i) => (
          <motion.div
            key={threat.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group flex items-start gap-3 rounded-lg p-3 border border-transparent hover:border-aegis hover:bg-aegis-elevated/50 transition-all cursor-pointer"
          >
            <div className="flex-shrink-0 flex flex-col items-center gap-1 mt-0.5">
              <span className="text-base leading-none">{threat.country}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {threat.new && (
                  <span className="text-[8px] font-bold text-aegis-blue-300 bg-aegis-blue-500/15 border border-aegis-blue-500/30 rounded-full px-1.5 py-0.5 uppercase tracking-wider">
                    NEW
                  </span>
                )}
                <Badge variant={SEV_MAP[threat.severity] as any} dot className="text-[9px] py-0">
                  {threat.severity.toUpperCase()}
                </Badge>
                <span className="text-[10px] text-muted-foreground/60 font-mono ml-auto">{threat.time}</span>
              </div>
              <p className="text-xs font-medium text-foreground truncate">{threat.title}</p>
              <p className="text-[10px] text-muted-foreground font-mono truncate mt-0.5">{threat.ioc}</p>
            </div>
            <ExternalLink className="size-3 text-muted-foreground/40 group-hover:text-muted-foreground flex-shrink-0 mt-1 transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-aegis pt-3">
        <Link
          href="/threats"
          className="flex items-center justify-center gap-1.5 text-xs text-aegis-blue-400 hover:text-aegis-blue-300 transition-colors"
        >
          View all threats
          <ExternalLink className="size-3" />
        </Link>
      </div>
    </div>
  )
}
