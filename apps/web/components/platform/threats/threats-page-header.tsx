"use client"

import { motion } from "framer-motion"
import { Plus, Download, Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThreatsPageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between"
    >
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">Threat Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          IOC tracking, reputation analysis, and threat correlation
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-1.5">
          <Filter className="size-3.5" />
          Filter
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5 hidden sm:flex">
          <Download className="size-3.5" />
          Export
        </Button>
        <Button variant="ghost" size="icon-sm">
          <RefreshCw className="size-3.5" />
        </Button>
        <Button size="sm" className="gap-1.5">
          <Plus className="size-3.5" />
          Add IOC
        </Button>
      </div>
    </motion.div>
  )
}
