"use client"

import { MetricCard } from "@/components/ui/metric-card"
import { AlertTriangle, Bug, Shield, Globe } from "lucide-react"

export function ThreatsSummary() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <MetricCard label="Active Threats" value="24" subtext="Require immediate action" icon={<AlertTriangle className="size-5" />} variant="critical" pulse index={0} />
      <MetricCard label="IOCs Tracked" value="1,247" subtext="Across all categories" icon={<Bug className="size-5" />} variant="default" index={1} />
      <MetricCard label="IPs Blocked" value="892" subtext="Last 30 days" icon={<Shield className="size-5" />} variant="success" index={2} />
      <MetricCard label="Countries" value="47" subtext="Threat origin countries" icon={<Globe className="size-5" />} variant="cyan" index={3} />
    </div>
  )
}
