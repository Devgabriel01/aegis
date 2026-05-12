"use client"

import { motion } from "framer-motion"
import { Brain, Download, Eye, FileText, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const REPORTS = [
  {
    id: "r1",
    title: "Executive Security Summary — Q1 2026",
    type: "Executive Summary",
    generatedBy: "AI",
    status: "ready",
    pages: 12,
    size: "2.4 MB",
    date: "2026-05-10",
    severity: "info",
  },
  {
    id: "r2",
    title: "APT29 Threat Intelligence Brief",
    type: "Threat Intelligence",
    generatedBy: "AI",
    status: "ready",
    pages: 8,
    size: "1.1 MB",
    date: "2026-05-09",
    severity: "critical",
  },
  {
    id: "r3",
    title: "Vulnerability Assessment — Production Stack",
    type: "Vulnerability Report",
    generatedBy: "Scan",
    status: "ready",
    pages: 24,
    size: "5.7 MB",
    date: "2026-05-08",
    severity: "high",
  },
  {
    id: "r4",
    title: "Incident #INC-2847 Post-Mortem",
    type: "Incident Report",
    generatedBy: "AI",
    status: "ready",
    pages: 6,
    size: "0.9 MB",
    date: "2026-05-07",
    severity: "high",
  },
  {
    id: "r5",
    title: "SOC 2 Type II Compliance — May 2026",
    type: "Compliance Report",
    generatedBy: "System",
    status: "generating",
    pages: 0,
    size: "—",
    date: "2026-05-11",
    severity: "info",
  },
  {
    id: "r6",
    title: "Asset Inventory — Full Stack Snapshot",
    type: "Asset Inventory",
    generatedBy: "System",
    status: "ready",
    pages: 18,
    size: "3.2 MB",
    date: "2026-05-06",
    severity: "info",
  },
]

const SEV_BADGE: Record<string, "critical" | "warning" | "info" | "online"> = {
  critical: "critical",
  high: "warning",
  info: "info",
  success: "online",
}

export function ReportsList() {
  return (
    <div className="hud-panel rounded-2xl border border-aegis flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-aegis">
        <div>
          <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">// RECENT REPORTS</p>
          <h3 className="text-sm font-semibold text-foreground mt-0.5">Generated Reports</h3>
        </div>
        <span className="text-xs text-muted-foreground font-mono">{REPORTS.length} total</span>
      </div>

      <div className="divide-y divide-aegis/50">
        {REPORTS.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group flex items-center gap-4 p-4 hover:bg-aegis-elevated/30 transition-colors"
          >
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl border flex-shrink-0",
              report.generatedBy === "AI"
                ? "bg-aegis-purple-400/10 border-aegis-purple-400/20"
                : "bg-aegis-blue-500/10 border-aegis-blue-500/20",
            )}>
              {report.generatedBy === "AI"
                ? <Brain className="size-4 text-aegis-purple-400" />
                : <FileText className="size-4 text-aegis-blue-400" />
              }
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-foreground truncate">{report.title}</span>
                <Badge variant={SEV_BADGE[report.severity]}>{report.severity.toUpperCase()}</Badge>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] text-muted-foreground">{report.type}</span>
                <span className="text-[10px] text-muted-foreground/50">·</span>
                <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                  <Clock className="size-2.5" />{report.date}
                </span>
                {report.pages > 0 && (
                  <>
                    <span className="text-[10px] text-muted-foreground/50">·</span>
                    <span className="text-[10px] text-muted-foreground">{report.pages}p · {report.size}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {report.status === "generating" ? (
                <div className="flex items-center gap-1.5 text-[10px] text-aegis-blue-400 font-mono">
                  <Clock className="size-3 animate-spin" />
                  Generating...
                </div>
              ) : (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon-xs">
                    <Eye className="size-3" />
                  </Button>
                  <Button variant="ghost" size="icon-xs">
                    <Download className="size-3" />
                  </Button>
                </div>
              )}
              {report.status === "ready" && (
                <CheckCircle className="size-3.5 text-aegis-green-400" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
