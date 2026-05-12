"use client"

import { motion } from "framer-motion"
import { SecurityScore } from "@/components/ui/security-score"
import { TrendingDown } from "lucide-react"

const SCORE_BREAKDOWN = [
  { label: "Network Security", score: 88, color: "#00CC58" },
  { label: "Endpoint Security", score: 72, color: "#22D3EE" },
  { label: "Identity & Access", score: 65, color: "#FFB800" },
  { label: "Data Protection", score: 80, color: "#22D3EE" },
  { label: "Threat Response", score: 55, color: "#FF6B00" },
]

export function DashboardSecurityScore() {
  return (
    <div className="hud-panel rounded-2xl border border-aegis p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Security Score</h2>
        <div className="flex items-center gap-1 text-aegis-medium">
          <TrendingDown className="size-3.5" />
          <span className="text-xs font-medium">-3 pts</span>
        </div>
      </div>

      {/* Main score */}
      <div className="flex justify-center py-2">
        <SecurityScore score={74} size="md" />
      </div>

      {/* Breakdown */}
      <div className="flex flex-col gap-2.5">
        {SCORE_BREAKDOWN.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.07 }}
            className="space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">{item.label}</span>
              <span className="text-[11px] font-medium" style={{ color: item.color }}>
                {item.score}
              </span>
            </div>
            <div className="h-1 rounded-full bg-aegis-silver-800 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
