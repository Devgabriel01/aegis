"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Clock, User, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const INCIDENTS = [
  {
    id: "INC-2024-001",
    title: "Suspected lateral movement — prod network",
    severity: "critical",
    status: "INVESTIGATING",
    assignee: "Sarah C.",
    sla: "2h 30m",
    slaBreached: false,
    category: "SYSTEM_COMPROMISE",
  },
  {
    id: "INC-2024-002",
    title: "Ransomware signature detected — endpoint-47",
    severity: "critical",
    status: "CONTAINED",
    assignee: "Marcus R.",
    sla: "0h 45m",
    slaBreached: false,
    category: "MALWARE",
  },
  {
    id: "INC-2024-003",
    title: "Unauthorized API access — billing service",
    severity: "high",
    status: "OPEN",
    assignee: "Unassigned",
    sla: "BREACHED",
    slaBreached: true,
    category: "UNAUTHORIZED_ACCESS",
  },
  {
    id: "INC-2024-004",
    title: "Data exfiltration attempt via email",
    severity: "high",
    status: "INVESTIGATING",
    assignee: "James W.",
    sla: "5h 10m",
    slaBreached: false,
    category: "DATA_BREACH",
  },
]

const STATUS_COLORS: Record<string, string> = {
  OPEN: "text-aegis-medium",
  INVESTIGATING: "text-aegis-blue-300",
  CONTAINED: "text-aegis-cyan-400",
  RESOLVED: "text-aegis-silver-400",
}

export function DashboardIncidents() {
  return (
    <div className="hud-panel rounded-2xl border border-aegis p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Active Incidents</h2>
        <Link
          href="/incidents"
          className="flex items-center gap-0.5 text-xs text-aegis-blue-400 hover:text-aegis-blue-300 transition-colors"
        >
          View all <ChevronRight className="size-3" />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {INCIDENTS.map((inc, i) => (
          <motion.div
            key={inc.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group flex items-start gap-3 rounded-lg border border-transparent hover:border-aegis hover:bg-aegis-elevated/50 p-3 transition-all cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-[10px] font-mono text-muted-foreground/60">{inc.id}</span>
                <Badge variant={inc.severity as any} dot className="text-[9px] py-0">
                  {inc.severity.toUpperCase()}
                </Badge>
                <span className={cn("text-[10px] font-medium ml-auto", STATUS_COLORS[inc.status] ?? "text-muted-foreground")}>
                  {inc.status}
                </span>
              </div>
              <p className="text-xs font-medium text-foreground truncate">{inc.title}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <User className="size-2.5" />
                  {inc.assignee}
                </span>
                <span className={cn(
                  "flex items-center gap-1 text-[10px] font-mono",
                  inc.slaBreached ? "text-aegis-critical" : "text-muted-foreground",
                )}>
                  <Clock className="size-2.5" />
                  {inc.slaBreached ? "SLA BREACHED" : `SLA: ${inc.sla}`}
                </span>
              </div>
            </div>
            <ChevronRight className="size-3.5 text-muted-foreground/40 group-hover:text-muted-foreground flex-shrink-0 mt-1 transition-colors" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
