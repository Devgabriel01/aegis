"use client"

import { motion } from "framer-motion"
import { RefreshCw, Download, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDateTime } from "@/lib/utils"

export function DashboardPageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between"
    >
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">Command Center</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Security overview · Updated{" "}
          <span className="font-mono text-aegis-cyan-400">
            {formatDateTime(new Date())}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-1.5 hidden sm:flex">
          <Calendar className="size-3.5" />
          Last 7 days
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5 hidden sm:flex">
          <Download className="size-3.5" />
          Export
        </Button>
        <Button variant="ghost" size="icon-sm">
          <RefreshCw className="size-3.5" />
        </Button>
      </div>
    </motion.div>
  )
}
