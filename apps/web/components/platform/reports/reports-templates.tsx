"use client"

import { motion } from "framer-motion"
import { Brain, Shield, AlertTriangle, Search, Server, FileText, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const TEMPLATES = [
  {
    id: "executive",
    icon: Brain,
    name: "Executive Summary",
    description: "High-level security posture for C-suite",
    badge: "AI",
    badgeColor: "bg-aegis-purple-400/15 text-aegis-purple-400 border-aegis-purple-400/20",
    color: "text-aegis-purple-400",
    bg: "bg-aegis-purple-400/10 border-aegis-purple-400/20",
  },
  {
    id: "threat",
    icon: AlertTriangle,
    name: "Threat Intelligence",
    description: "Active threats, IOCs, and TTPs overview",
    badge: "INTEL",
    badgeColor: "bg-aegis-critical/15 text-aegis-critical border-aegis-critical/20",
    color: "text-aegis-critical",
    bg: "bg-aegis-critical/10 border-aegis-critical/20",
  },
  {
    id: "vulnerability",
    icon: Search,
    name: "Vulnerability Report",
    description: "CVEs, CVSS scores, and patch prioritization",
    badge: "SCAN",
    badgeColor: "bg-aegis-high/15 text-aegis-high border-aegis-high/20",
    color: "text-aegis-high",
    bg: "bg-aegis-high/10 border-aegis-high/20",
  },
  {
    id: "incident",
    icon: Shield,
    name: "Incident Report",
    description: "Timeline, impact, and remediation steps",
    badge: "SOC",
    badgeColor: "bg-aegis-blue-500/15 text-aegis-blue-300 border-aegis-blue-500/20",
    color: "text-aegis-blue-400",
    bg: "bg-aegis-blue-500/10 border-aegis-blue-500/20",
  },
  {
    id: "compliance",
    icon: FileText,
    name: "Compliance Report",
    description: "SOC 2, ISO 27001, GDPR audit trail",
    badge: "AUDIT",
    badgeColor: "bg-aegis-green-400/15 text-aegis-green-400 border-aegis-green-400/20",
    color: "text-aegis-green-400",
    bg: "bg-aegis-green-400/10 border-aegis-green-400/20",
  },
  {
    id: "asset",
    icon: Server,
    name: "Asset Inventory",
    description: "Full infrastructure risk and status snapshot",
    badge: "INFRA",
    badgeColor: "bg-aegis-cyan-400/15 text-aegis-cyan-400 border-aegis-cyan-400/20",
    color: "text-aegis-cyan-400",
    bg: "bg-aegis-cyan-400/10 border-aegis-cyan-400/20",
  },
]

export function ReportsTemplates() {
  return (
    <div className="hud-panel rounded-2xl border border-aegis flex flex-col">
      <div className="p-4 border-b border-aegis">
        <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">// TEMPLATES</p>
        <h3 className="text-sm font-semibold text-foreground mt-0.5">Report Templates</h3>
      </div>
      <div className="flex-1 p-3 space-y-1">
        {TEMPLATES.map((tpl, i) => (
          <motion.button
            key={tpl.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="w-full group flex items-center gap-3 rounded-xl p-3 border border-transparent hover:border-aegis hover:bg-aegis-elevated/50 transition-all text-left"
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${tpl.bg} flex-shrink-0`}>
              <tpl.icon className={`size-3.5 ${tpl.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-foreground">{tpl.name}</span>
                <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wider", tpl.badgeColor)}>
                  {tpl.badge}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{tpl.description}</p>
            </div>
            <ChevronRight className="size-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors flex-shrink-0" />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
