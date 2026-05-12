"use client"

import { motion } from "framer-motion"
import { Shield, Check, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const PLAN_FEATURES = [
  "Unlimited threat scans",
  "AI threat analyst (GPT-4o)",
  "Up to 500 assets monitored",
  "15 team members",
  "SIEM log ingestion (100GB/mo)",
  "SOC 2 compliance reports",
  "Priority support — 4h SLA",
  "Custom integrations & API",
]

export function BillingPlan() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="hud-panel rounded-2xl border border-aegis-blue-500/30 bg-gradient-to-b from-aegis-blue-500/5 to-transparent flex flex-col"
    >
      <div className="p-5 border-b border-aegis">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-aegis-blue-500/15 border border-aegis-blue-500/30">
              <Shield className="size-4 text-aegis-blue-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">Enterprise Plan</div>
              <div className="text-[10px] text-muted-foreground">Current plan</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold font-mono text-aegis-blue-300">$499</div>
            <div className="text-[10px] text-muted-foreground">/month</div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-aegis-green-400/5 border border-aegis-green-400/15 px-3 py-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aegis-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-aegis-green-400" />
          </span>
          <span className="text-[10px] text-aegis-green-400 font-medium">Active · Annual billing saves 20%</span>
        </div>
      </div>

      <div className="p-5 space-y-2.5">
        {PLAN_FEATURES.map((feat) => (
          <div key={feat} className="flex items-center gap-2.5">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-aegis-blue-500/15 flex-shrink-0">
              <Check className="size-2.5 text-aegis-blue-400" />
            </div>
            <span className="text-xs text-foreground">{feat}</span>
          </div>
        ))}
      </div>

      <div className="p-5 border-t border-aegis space-y-2">
        <Button variant="outline" size="sm" className="w-full">View All Plans</Button>
        <Button variant="premium" size="sm" className="w-full gap-1.5">
          <Zap className="size-3" />
          Upgrade to Enterprise+
        </Button>
      </div>
    </motion.div>
  )
}
