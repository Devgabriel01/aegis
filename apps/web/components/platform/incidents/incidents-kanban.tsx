"use client"

import { motion } from "framer-motion"
import { Clock, User, Brain, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Incident {
  id: string
  title: string
  severity: string
  category: string
  assignee: string
  sla: string
  slaBreached: boolean
  aiScore: number
  tags: string[]
}

const COLUMNS = [
  {
    id: "OPEN",
    label: "Open",
    color: "#FF2D55",
    incidents: [
      { id: "INC-001", title: "Suspected lateral movement — prod", severity: "critical", category: "SYSTEM_COMPROMISE", assignee: "Sarah C.", sla: "2h 30m", slaBreached: false, aiScore: 94, tags: ["APT", "Lateral"] },
      { id: "INC-003", title: "Unauthorized API access — billing", severity: "high", category: "UNAUTHORIZED_ACCESS", assignee: "Unassigned", sla: "BREACHED", slaBreached: true, aiScore: 78, tags: ["API", "Auth"] },
    ] as Incident[],
  },
  {
    id: "INVESTIGATING",
    label: "Investigating",
    color: "#3B8FEF",
    incidents: [
      { id: "INC-002", title: "Ransomware detected — endpoint-47", severity: "critical", category: "MALWARE", assignee: "Marcus R.", sla: "0h 45m", slaBreached: false, aiScore: 99, tags: ["Ransomware"] },
      { id: "INC-004", title: "Data exfiltration — email channel", severity: "high", category: "DATA_BREACH", assignee: "James W.", sla: "5h 10m", slaBreached: false, aiScore: 85, tags: ["DLP", "Email"] },
      { id: "INC-005", title: "Phishing campaign — executive team", severity: "high", category: "PHISHING", assignee: "Priya P.", sla: "3h 20m", slaBreached: false, aiScore: 72, tags: ["Phishing", "BEC"] },
    ] as Incident[],
  },
  {
    id: "CONTAINED",
    label: "Contained",
    color: "#22D3EE",
    incidents: [
      { id: "INC-006", title: "XSS injection — customer portal", severity: "medium", category: "VULNERABILITY_EXPLOIT", assignee: "Tom B.", sla: "8h 0m", slaBreached: false, aiScore: 55, tags: ["XSS", "Web"] },
    ] as Incident[],
  },
  {
    id: "RESOLVED",
    label: "Resolved",
    color: "#00CC58",
    incidents: [
      { id: "INC-007", title: "Expired SSL certificate — legacy", severity: "low", category: "OTHER", assignee: "Elena V.", sla: "Done", slaBreached: false, aiScore: 20, tags: ["SSL"] },
    ] as Incident[],
  },
]

function IncidentCard({ incident, index }: { incident: Incident; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group hud-panel rounded-xl border border-aegis p-4 cursor-pointer hover:border-aegis-bright transition-all"
    >
      {/* Header */}
      <div className="flex items-start gap-2 mb-3">
        <Badge variant={incident.severity as any} dot className="text-[9px] py-0 flex-shrink-0 mt-0.5">
          {incident.severity.toUpperCase()}
        </Badge>
        {incident.slaBreached && (
          <Badge variant="critical" className="text-[9px] py-0 flex-shrink-0 mt-0.5">
            SLA BREACH
          </Badge>
        )}
      </div>

      <p className="text-xs font-medium text-foreground mb-2 leading-relaxed">{incident.title}</p>
      <p className="text-[10px] text-muted-foreground/70 font-mono mb-3">{incident.id}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {incident.tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] px-1.5 py-0.5 rounded-full border border-aegis-silver-700 bg-aegis-silver-800 text-aegis-silver-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <User className="size-2.5" />
            {incident.assignee}
          </span>
          <span className={cn(
            "flex items-center gap-1 text-[10px] font-mono",
            incident.slaBreached ? "text-aegis-critical" : "text-muted-foreground",
          )}>
            <Clock className="size-2.5" />
            {incident.slaBreached ? "BREACHED" : incident.sla}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Brain className="size-3 text-aegis-purple-400" />
          <span
            className="text-[10px] font-bold font-mono"
            style={{
              color: incident.aiScore >= 80 ? "#FF2D55"
                : incident.aiScore >= 60 ? "#FF6B00"
                : "#22D3EE",
            }}
          >
            {incident.aiScore}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function IncidentsKanban() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {COLUMNS.map((col, ci) => (
        <div key={col.id} className="flex flex-col gap-3">
          {/* Column header */}
          <div className="flex items-center gap-2.5">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: col.color }} />
            <span className="text-xs font-semibold text-foreground">{col.label}</span>
            <span
              className="flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold"
              style={{ backgroundColor: col.color + "20", color: col.color }}
            >
              {col.incidents.length}
            </span>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-2.5 min-h-24">
            {col.incidents.map((inc, i) => (
              <IncidentCard key={inc.id} incident={inc} index={ci * 3 + i} />
            ))}
            {col.incidents.length === 0 && (
              <div className="rounded-xl border border-dashed border-aegis/50 p-4 text-center">
                <p className="text-[11px] text-muted-foreground/40">No incidents</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
