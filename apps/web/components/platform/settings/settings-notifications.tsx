"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell } from "lucide-react"
import { cn } from "@/lib/utils"

const NOTIFICATION_SETTINGS = [
  { id: "critical_alerts", label: "Critical Alerts", description: "Immediate notification for critical severity threats", default: true },
  { id: "new_incident", label: "New Incidents", description: "Notify when a new incident is opened", default: true },
  { id: "vuln_scan", label: "Vulnerability Scan Completed", description: "Summary when a scan finishes", default: true },
  { id: "weekly_report", label: "Weekly Security Report", description: "AI-generated digest every Monday 9am", default: false },
  { id: "asset_offline", label: "Asset Goes Offline", description: "Alert when a monitored asset stops responding", default: true },
  { id: "login_anomaly", label: "Login Anomalies", description: "Unusual sign-in locations or patterns", default: false },
]

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={cn(
        "relative h-5 w-9 rounded-full border transition-all duration-200",
        value
          ? "bg-aegis-blue-500/30 border-aegis-blue-500/50"
          : "bg-aegis-surface/50 border-aegis",
      )}
    >
      <motion.span
        animate={{ x: value ? 16 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "absolute top-0.5 h-3.5 w-3.5 rounded-full",
          value ? "bg-aegis-blue-400" : "bg-muted-foreground/50",
        )}
      />
    </button>
  )
}

export function SettingsNotifications() {
  const [settings, setSettings] = useState(
    Object.fromEntries(NOTIFICATION_SETTINGS.map((s) => [s.id, s.default]))
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="hud-panel rounded-2xl border border-aegis"
    >
      <div className="flex items-center gap-3 p-4 border-b border-aegis">
        <Bell className="size-4 text-muted-foreground" />
        <div>
          <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">// ALERTS</p>
          <h3 className="text-sm font-semibold text-foreground">Notification Preferences</h3>
        </div>
      </div>

      <div className="divide-y divide-aegis/50">
        {NOTIFICATION_SETTINGS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between p-4"
          >
            <div className="flex-1 min-w-0 pr-4">
              <div className="text-sm font-medium text-foreground">{item.label}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{item.description}</div>
            </div>
            <Toggle
              value={settings[item.id]}
              onChange={(v) => setSettings((s) => ({ ...s, [item.id]: v }))}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
