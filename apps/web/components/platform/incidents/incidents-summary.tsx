"use client"

import { MetricCard } from "@/components/ui/metric-card"
import { Siren, Clock, CheckCircle2, AlertTriangle } from "lucide-react"

export function IncidentsSummary() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <MetricCard label="Open" value="7" subtext="Require action" icon={<Siren className="size-5" />} variant="critical" pulse index={0} />
      <MetricCard label="Investigating" value="3" subtext="In progress" icon={<AlertTriangle className="size-5" />} variant="warning" index={1} />
      <MetricCard label="SLA Breached" value="2" subtext="Past deadline" icon={<Clock className="size-5" />} variant="critical" index={2} />
      <MetricCard label="Resolved (30d)" value="41" subtext="MTTR: 3.2h" icon={<CheckCircle2 className="size-5" />} variant="success" index={3} />
    </div>
  )
}
