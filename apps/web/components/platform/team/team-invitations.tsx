"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Clock, X, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const PENDING = [
  { id: "i1", email: "victor.nunes@acme.com", role: "analyst", sent: "2 days ago", expires: "5 days" },
  { id: "i2", email: "beatriz.paz@acme.com", role: "viewer", sent: "1 day ago", expires: "6 days" },
]

const ROLES = ["analyst", "admin", "viewer"]

export function TeamInvitations() {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("analyst")
  const [sent, setSent] = useState(false)

  function handleSend() {
    if (!email) return
    setSent(true)
    setTimeout(() => { setSent(false); setEmail("") }, 2500)
  }

  return (
    <div className="hud-panel rounded-2xl border border-aegis flex flex-col gap-0">
      {/* Pending */}
      <div className="p-4 border-b border-aegis">
        <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">// PENDING</p>
        <h3 className="text-sm font-semibold text-foreground mt-0.5 mb-3">Pending Invitations</h3>
        {PENDING.length === 0 ? (
          <p className="text-xs text-muted-foreground">No pending invitations.</p>
        ) : (
          <div className="space-y-2">
            {PENDING.map((inv, i) => (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                className="group flex items-center gap-3 rounded-xl border border-aegis bg-aegis-surface/30 p-3"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-aegis-blue-500/10 border border-aegis-blue-500/20">
                  <Mail className="size-3 text-aegis-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-foreground truncate">{inv.email}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] text-muted-foreground uppercase">{inv.role}</span>
                    <span className="text-[9px] text-muted-foreground/50">·</span>
                    <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                      <Clock className="size-2" /> Sent {inv.sent}
                    </span>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-aegis-critical">
                  <X className="size-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Invite form */}
      <div className="p-4">
        <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider mb-3">// INVITE</p>
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@company.com"
              className="mt-1 w-full rounded-lg border border-aegis bg-aegis-surface/50 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-aegis-blue-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Role</label>
            <div className="mt-1 flex gap-1">
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={cn(
                    "flex-1 rounded-lg border py-1.5 text-[10px] font-medium uppercase tracking-wider transition-colors capitalize",
                    role === r
                      ? "bg-aegis-blue-500/15 text-aegis-blue-300 border-aegis-blue-500/30"
                      : "text-muted-foreground border-aegis hover:border-aegis-bright",
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <Button
            variant={sent ? "outline" : "premium"}
            size="sm"
            className="w-full gap-2"
            onClick={handleSend}
          >
            {sent ? (
              <><CheckCircle className="size-3.5 text-aegis-green-400" /> Invitation Sent</>
            ) : (
              <><Send className="size-3.5" /> Send Invitation</>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
