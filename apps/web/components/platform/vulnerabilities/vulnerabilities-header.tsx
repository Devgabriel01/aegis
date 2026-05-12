"use client"

import { motion } from "framer-motion"
import { Plus, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VulnerabilitiesHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between"
    >
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">Vulnerability Management</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Scan, track, and remediate security vulnerabilities across your infrastructure
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-1.5 hidden sm:flex">
          <Download className="size-3.5" />
          Export Report
        </Button>
        <Button size="sm" className="gap-1.5">
          <Plus className="size-3.5" />
          New Scan
        </Button>
      </div>
    </motion.div>
  )
}
