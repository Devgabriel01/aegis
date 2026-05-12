"use client"

import { AlertTriangle, Shield, Server, Activity, Bug, Siren } from "lucide-react"
import { MetricCard } from "@/components/ui/metric-card"

const METRICS = [
  {
    label: "Active Threats",
    value: "24",
    subtext: "3 critical require action",
    icon: <AlertTriangle className="size-5" />,
    variant: "critical" as const,
    pulse: true,
    trend: { value: 12, direction: "up" as const, label: "vs yesterday" },
  },
  {
    label: "Open Incidents",
    value: "7",
    subtext: "2 critical, 3 high, 2 medium",
    icon: <Siren className="size-5" />,
    variant: "warning" as const,
    pulse: false,
    trend: { value: 5, direction: "down" as const, label: "vs yesterday" },
  },
  {
    label: "Vulnerabilities",
    value: "142",
    subtext: "8 critical unpatched",
    icon: <Bug className="size-5" />,
    variant: "default" as const,
    pulse: false,
    trend: { value: 3, direction: "down" as const, label: "vs last week" },
  },
  {
    label: "Assets Monitored",
    value: "342",
    subtext: "298 healthy, 44 at risk",
    icon: <Server className="size-5" />,
    variant: "cyan" as const,
    pulse: false,
    trend: { value: 8, direction: "up" as const, label: "new this week" },
  },
  {
    label: "Events Today",
    value: "47.2K",
    subtext: "Log events ingested",
    icon: <Activity className="size-5" />,
    variant: "default" as const,
    pulse: false,
    trend: { value: 22, direction: "up" as const, label: "vs yesterday" },
  },
  {
    label: "Blocked Attacks",
    value: "1,847",
    subtext: "Requests blocked today",
    icon: <Shield className="size-5" />,
    variant: "success" as const,
    pulse: false,
    trend: { value: 4, direction: "up" as const, label: "vs yesterday" },
  },
]

export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
      {METRICS.map((metric, i) => (
        <MetricCard key={metric.label} {...metric} index={i} />
      ))}
    </div>
  )
}
