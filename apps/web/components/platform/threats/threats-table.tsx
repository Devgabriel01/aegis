"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ChevronUp, ChevronDown, ExternalLink, Brain } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn, formatRelativeTime } from "@/lib/utils"

const THREATS_DATA = [
  {
    id: "t1",
    title: "APT29 Command & Control",
    type: "APT",
    severity: "critical",
    status: "ACTIVE",
    source: "CrowdStrike",
    ioc: "185.234.219.87",
    iocType: "IP",
    country: "🇷🇺",
    confidence: 94,
    firstSeen: new Date(Date.now() - 1000 * 60 * 2),
    aiScore: 96,
  },
  {
    id: "t2",
    title: "Cobalt Strike Stage 2 Payload",
    type: "MALWARE",
    severity: "critical",
    status: "ACTIVE",
    source: "IDS Alert",
    ioc: "b2e34c1d8f9a3b7c2e1d4f5a6b8c9d0e",
    iocType: "HASH",
    country: "🇺🇸",
    confidence: 89,
    firstSeen: new Date(Date.now() - 1000 * 60 * 8),
    aiScore: 91,
  },
  {
    id: "t3",
    title: "SSH Brute Force Campaign",
    type: "BRUTEFORCE",
    severity: "high",
    status: "ACTIVE",
    source: "Log Analysis",
    ioc: "103.56.88.42",
    iocType: "IP",
    country: "🇨🇳",
    confidence: 95,
    firstSeen: new Date(Date.now() - 1000 * 60 * 12),
    aiScore: 78,
  },
  {
    id: "t4",
    title: "HR Phishing Campaign — Credential Harvest",
    type: "PHISHING",
    severity: "high",
    status: "ACTIVE",
    source: "Email Security",
    ioc: "payroll-update.xyz",
    iocType: "DOMAIN",
    country: "🇳🇬",
    confidence: 82,
    firstSeen: new Date(Date.now() - 1000 * 60 * 34),
    aiScore: 85,
  },
  {
    id: "t5",
    title: "Anomalous DNS Exfiltration",
    type: "C2",
    severity: "high",
    status: "MONITORING",
    source: "DNS Monitor",
    ioc: "update.micro-soft.net",
    iocType: "DOMAIN",
    country: "🇳🇱",
    confidence: 73,
    firstSeen: new Date(Date.now() - 1000 * 60 * 60 * 2),
    aiScore: 72,
  },
  {
    id: "t6",
    title: "SQL Injection — User API Endpoint",
    type: "SQLI",
    severity: "medium",
    status: "ACTIVE",
    source: "WAF",
    ioc: "/api/users?id=1 OR 1=1",
    iocType: "URL",
    country: "🌐",
    confidence: 99,
    firstSeen: new Date(Date.now() - 1000 * 60 * 60 * 3),
    aiScore: 60,
  },
  {
    id: "t7",
    title: "Port Scan — Full Range",
    type: "RECON",
    severity: "medium",
    status: "MONITORING",
    source: "Firewall",
    ioc: "91.200.14.1",
    iocType: "IP",
    country: "🇩🇪",
    confidence: 88,
    firstSeen: new Date(Date.now() - 1000 * 60 * 60 * 4),
    aiScore: 45,
  },
  {
    id: "t8",
    title: "Expired Session Token Replay",
    type: "OTHER",
    severity: "low",
    status: "RESOLVED",
    source: "Auth Service",
    ioc: "auth.example.com",
    iocType: "URL",
    country: "🌐",
    confidence: 65,
    firstSeen: new Date(Date.now() - 1000 * 60 * 60 * 6),
    aiScore: 22,
  },
]

const SEV_ORDER = ["critical", "high", "medium", "low"]

export function ThreatsTable() {
  const [search, setSearch] = useState("")
  const [sevFilter, setSevFilter] = useState<string>("all")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  const filtered = THREATS_DATA
    .filter((t) => sevFilter === "all" || t.severity === sevFilter)
    .filter((t) =>
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.ioc.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      const diff = SEV_ORDER.indexOf(a.severity) - SEV_ORDER.indexOf(b.severity)
      return sortDir === "asc" ? -diff : diff
    })

  return (
    <div className="hud-panel rounded-2xl border border-aegis flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-3 p-4 border-b border-aegis">
        <div className="flex items-center gap-2 flex-1 rounded-lg border border-aegis bg-aegis-surface/50 px-3 py-1.5">
          <Search className="size-3.5 text-muted-foreground flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search threats, IOCs..."
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
          />
        </div>
        <div className="flex gap-1">
          {["all", "critical", "high", "medium", "low"].map((sev) => (
            <button
              key={sev}
              onClick={() => setSevFilter(sev)}
              className={cn(
                "rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider transition-colors border",
                sevFilter === sev
                  ? sev === "critical" ? "bg-aegis-critical/15 text-aegis-critical border-aegis-critical/30"
                    : sev === "high" ? "bg-aegis-high/15 text-aegis-high border-aegis-high/30"
                    : sev === "medium" ? "bg-aegis-medium/15 text-aegis-medium border-aegis-medium/30"
                    : sev === "low" ? "bg-aegis-low/10 text-aegis-low border-aegis-low/20"
                    : "bg-aegis-blue-500/15 text-aegis-blue-300 border-aegis-blue-500/30"
                  : "text-muted-foreground border-aegis hover:border-aegis-bright",
              )}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-aegis">
              {["Threat", "Type", "Severity", "IOC", "Confidence", "AI Score", "Detected", "Status", ""].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60"
                >
                  {col === "Severity" ? (
                    <button
                      className="flex items-center gap-1 hover:text-muted-foreground transition-colors"
                      onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}
                    >
                      {col}
                      {sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
                    </button>
                  ) : col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((threat, i) => (
              <motion.tr
                key={threat.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="group border-b border-aegis/50 last:border-0 hover:bg-aegis-elevated/40 transition-colors"
              >
                <td className="px-4 py-3 max-w-[200px]">
                  <div className="flex items-center gap-2">
                    <span className="text-sm flex-shrink-0">{threat.country}</span>
                    <span className="text-xs font-medium text-foreground truncate">{threat.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-mono text-muted-foreground">{threat.type}</span>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={threat.severity as any} dot>
                    {threat.severity.toUpperCase()}
                  </Badge>
                </td>
                <td className="px-4 py-3 max-w-[140px]">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-muted-foreground/60 uppercase tracking-wider">{threat.iocType}</span>
                    <span className="text-[10px] font-mono text-aegis-cyan-400 truncate">{threat.ioc}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-16 rounded-full bg-aegis-silver-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-aegis-blue-400"
                        style={{ width: `${threat.confidence}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">{threat.confidence}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Brain className="size-3 text-aegis-purple-400" />
                    <span
                      className="text-xs font-bold font-mono"
                      style={{
                        color: threat.aiScore >= 80 ? "#FF2D55" : threat.aiScore >= 60 ? "#FF6B00" : "#22D3EE",
                      }}
                    >
                      {threat.aiScore}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {formatRelativeTime(threat.firstSeen)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      threat.status === "ACTIVE" ? "critical"
                      : threat.status === "MONITORING" ? "warning"
                      : "info"
                    }
                    dot
                  >
                    {threat.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="icon-xs" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="size-3" />
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-aegis bg-aegis-surface/30">
        <span className="text-xs text-muted-foreground">
          Showing {filtered.length} of {THREATS_DATA.length} threats
        </span>
        <div className="flex gap-1">
          <Button variant="outline" size="xs">Previous</Button>
          <Button variant="outline" size="xs">Next</Button>
        </div>
      </div>
    </div>
  )
}
