"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { cn } from "@/lib/utils"

const DATA_7D = [
  { date: "Mon", threats: 18, blocked: 1240, events: 38200 },
  { date: "Tue", threats: 22, blocked: 1580, events: 42100 },
  { date: "Wed", threats: 15, blocked: 1120, events: 35800 },
  { date: "Thu", threats: 31, blocked: 2100, events: 54600 },
  { date: "Fri", threats: 28, blocked: 1890, events: 48900 },
  { date: "Sat", threats: 12, blocked: 890, events: 29400 },
  { date: "Sun", threats: 24, blocked: 1647, events: 47200 },
]

const TABS = ["Threats", "Blocked", "Events"] as const
type Tab = typeof TABS[number]

const TAB_CONFIG: Record<Tab, { key: string; color: string; label: string }> = {
  Threats: { key: "threats", color: "#FF6B00", label: "Active Threats" },
  Blocked: { key: "blocked", color: "#3B8FEF", label: "Blocked Attacks" },
  Events: { key: "events", color: "#22D3EE", label: "Log Events" },
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-aegis bg-aegis-surface/95 backdrop-blur-sm p-3 text-xs shadow-aegis-md">
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="font-medium" style={{ color: p.color }}>
          {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export function DashboardChart() {
  const [activeTab, setActiveTab] = useState<Tab>("Threats")
  const { key, color } = TAB_CONFIG[activeTab]

  return (
    <div className="hud-panel rounded-2xl border border-aegis p-5 flex flex-col gap-4 h-64">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Security Activity</h2>
        <div className="flex rounded-lg border border-aegis overflow-hidden">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-2.5 py-1 text-xs font-medium transition-colors",
                activeTab === tab
                  ? "bg-aegis-blue-500/15 text-aegis-blue-300"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA_7D} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(59,143,239,0.06)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#64748B" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#64748B" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2}
              fill="url(#chartGrad)"
              dot={false}
              activeDot={{ r: 4, fill: color, stroke: "transparent" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
