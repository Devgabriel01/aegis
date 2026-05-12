"use client"

import { Users, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function TeamHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-aegis-blue-500/10 border border-aegis-blue-500/20">
          <Users className="h-4 w-4 text-aegis-blue-400" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">Team Management</h1>
          <p className="text-xs text-muted-foreground">
            <span className="font-mono text-aegis-cyan-400">8</span> members ·{" "}
            <span className="font-mono text-aegis-high">2</span> pending invitations
          </p>
        </div>
      </div>
      <Button variant="premium" size="sm" className="gap-1.5">
        <UserPlus className="size-3.5" />
        Invite Member
      </Button>
    </motion.div>
  )
}
