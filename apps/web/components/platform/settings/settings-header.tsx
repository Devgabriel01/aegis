"use client"

import { Settings } from "lucide-react"
import { motion } from "framer-motion"

export function SettingsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-aegis-blue-500/10 border border-aegis-blue-500/20">
        <Settings className="h-4 w-4 text-aegis-blue-400" />
      </div>
      <div>
        <h1 className="text-lg font-semibold text-foreground tracking-tight">Settings</h1>
        <p className="text-xs text-muted-foreground">Organization configuration and integrations</p>
      </div>
    </motion.div>
  )
}
