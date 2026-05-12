"use client"

import { FileBarChart, Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function ReportsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-aegis-blue-500/10 border border-aegis-blue-500/20">
          <FileBarChart className="h-4 w-4 text-aegis-blue-400" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">Reports & Analytics</h1>
          <p className="text-xs text-muted-foreground">
            AI-generated executive summaries and compliance reports
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="size-3" />
          Export All
        </Button>
        <Button variant="premium" size="sm" className="gap-1.5">
          <Plus className="size-3.5" />
          Generate Report
        </Button>
      </div>
    </motion.div>
  )
}
