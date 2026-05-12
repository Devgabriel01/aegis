"use client"

import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function IncidentsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between"
    >
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">Incident Response</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          SOC case management · SLA tracking · Evidence management
        </p>
      </div>
      <Button size="sm" className="gap-1.5">
        <Plus className="size-3.5" />
        New Incident
      </Button>
    </motion.div>
  )
}
