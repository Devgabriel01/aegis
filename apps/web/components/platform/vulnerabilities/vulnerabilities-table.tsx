"use client"

import { motion } from "framer-motion"
import { ExternalLink, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const VULNS = [
  {
    id: "v1", cve: "CVE-2024-3094", title: "XZ Utils Backdoor", severity: "critical",
    cvss: 10.0, target: "db-01.prod", component: "xz-utils 5.6.0", status: "OPEN",
    exploitInWild: true, patch: "5.6.2",
  },
  {
    id: "v2", cve: "CVE-2024-1086", title: "Linux Kernel Privilege Escalation", severity: "high",
    cvss: 7.8, target: "web-01.prod", component: "Linux 6.6.14", status: "IN_PROGRESS",
    exploitInWild: true, patch: "6.6.15",
  },
  {
    id: "v3", cve: "CVE-2024-0519", title: "Chrome V8 OOB Memory Access", severity: "high",
    cvss: 8.8, target: "workstations (47)", component: "Chrome < 120.0.6099.224", status: "OPEN",
    exploitInWild: false, patch: "120.0.6099.224",
  },
  {
    id: "v4", cve: "CVE-2023-48795", title: "Terrapin SSH Protocol Weakness", severity: "medium",
    cvss: 5.9, target: "bastion.prod", component: "OpenSSH < 9.6", status: "OPEN",
    exploitInWild: false, patch: "9.6p1",
  },
  {
    id: "v5", cve: "CVE-2023-44487", title: "HTTP/2 Rapid Reset (DoS)", severity: "high",
    cvss: 7.5, target: "nginx-lb-01", component: "nginx 1.25.2", status: "RESOLVED",
    exploitInWild: true, patch: "1.25.3",
  },
  {
    id: "v6", cve: null, title: "Missing Content-Security-Policy Header", severity: "medium",
    cvss: null, target: "api.example.com", component: "Web Server Config", status: "OPEN",
    exploitInWild: false, patch: null,
  },
  {
    id: "v7", cve: null, title: "TLS 1.0/1.1 Protocol Enabled", severity: "medium",
    cvss: null, target: "legacy.example.com", component: "Apache 2.4.52", status: "ACCEPTED_RISK",
    exploitInWild: false, patch: null,
  },
]

const STATUS_STYLES: Record<string, string> = {
  OPEN: "text-aegis-medium",
  IN_PROGRESS: "text-aegis-blue-300",
  RESOLVED: "text-aegis-green-400",
  ACCEPTED_RISK: "text-aegis-silver-400",
  FALSE_POSITIVE: "text-aegis-silver-400",
}

export function VulnerabilitiesTable() {
  return (
    <div className="hud-panel rounded-2xl border border-aegis flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-aegis">
        <h2 className="text-sm font-semibold text-foreground">Vulnerabilities</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="xs">All</Button>
          <Button variant="outline" size="xs">Critical</Button>
          <Button variant="outline" size="xs">In Wild</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-aegis">
              {["CVE", "Vulnerability", "Target", "CVSS", "Status", "Exploit", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {VULNS.map((v, i) => (
              <motion.tr
                key={v.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="group border-b border-aegis/50 last:border-0 hover:bg-aegis-elevated/40 transition-colors"
              >
                <td className="px-4 py-3">
                  {v.cve ? (
                    <span className="text-[10px] font-mono text-aegis-cyan-400">{v.cve}</span>
                  ) : (
                    <span className="text-[10px] font-mono text-muted-foreground/40">—</span>
                  )}
                </td>
                <td className="px-4 py-3 max-w-[220px]">
                  <p className="text-xs font-medium text-foreground truncate">{v.title}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{v.component}</p>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-mono text-muted-foreground">{v.target}</span>
                </td>
                <td className="px-4 py-3">
                  {v.cvss ? (
                    <span
                      className="text-sm font-bold font-mono"
                      style={{
                        color: v.cvss >= 9 ? "#FF2D55" : v.cvss >= 7 ? "#FF6B00" : v.cvss >= 4 ? "#FFB800" : "#22D3EE",
                      }}
                    >
                      {v.cvss.toFixed(1)}
                    </span>
                  ) : (
                    <span className="text-[10px] text-muted-foreground/40">N/A</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={cn("text-[10px] font-medium", STATUS_STYLES[v.status] ?? "text-muted-foreground")}>
                    {v.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {v.exploitInWild ? (
                    <Badge variant="critical" dot className="text-[9px] py-0">IN WILD</Badge>
                  ) : (
                    <span className="text-[10px] text-muted-foreground/40">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {v.status !== "RESOLVED" && (
                    <Button variant="ghost" size="icon-xs" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="size-3" />
                    </Button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-aegis bg-aegis-surface/30">
        <span className="text-xs text-muted-foreground">{VULNS.length} vulnerabilities</span>
        <div className="flex gap-1">
          <Button variant="outline" size="xs">Previous</Button>
          <Button variant="outline" size="xs">Next</Button>
        </div>
      </div>
    </div>
  )
}
