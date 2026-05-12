"use client"

import { MetricCard } from "@/components/ui/metric-card"
import { Bug, ShieldAlert, ShieldCheck, Clock } from "lucide-react"

export function VulnerabilitiesSummary() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <MetricCard label="Critical" value="8" subtext="Unpatched CVEs" icon={<Bug className="size-5" />} variant="critical" pulse index={0} />
      <MetricCard label="High" value="23" subtext="Need attention" icon={<ShieldAlert className="size-5" />} variant="warning" index={1} />
      <MetricCard label="Total Open" value="142" subtext="Across all assets" icon={<Bug className="size-5" />} variant="default" index={2} />
      <MetricCard label="Resolved (30d)" value="89" subtext="Patched this month" icon={<ShieldCheck className="size-5" />} variant="success" index={3} />
    </div>
  )
}
