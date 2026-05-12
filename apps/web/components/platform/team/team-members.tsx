"use client"

import { motion } from "framer-motion"
import { Shield, Crown, User, MoreHorizontal, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Role = "owner" | "admin" | "analyst" | "viewer"
type Status = "online" | "away" | "offline"

const MEMBERS: Array<{ id: string; name: string; email: string; role: Role; avatar: string; status: Status; lastActive: string; incidents: number }> = [
  { id: "m1", name: "Gabriel Silva", email: "gabriel@acme.com", role: "owner", avatar: "GS", status: "online", lastActive: "Now", incidents: 12 },
  { id: "m2", name: "Ana Costa", email: "ana.costa@acme.com", role: "admin", avatar: "AC", status: "online", lastActive: "5m ago", incidents: 8 },
  { id: "m3", name: "Carlos Mendes", email: "c.mendes@acme.com", role: "analyst", avatar: "CM", status: "online", lastActive: "12m ago", incidents: 24 },
  { id: "m4", name: "Julia Ferreira", email: "julia.f@acme.com", role: "analyst", avatar: "JF", status: "away", lastActive: "1h ago", incidents: 15 },
  { id: "m5", name: "Rafael Alves", email: "rafael@acme.com", role: "analyst", avatar: "RA", status: "offline", lastActive: "3h ago", incidents: 7 },
  { id: "m6", name: "Mariana Lima", email: "m.lima@acme.com", role: "viewer", avatar: "ML", status: "online", lastActive: "20m ago", incidents: 0 },
  { id: "m7", name: "Pedro Santos", email: "p.santos@acme.com", role: "viewer", avatar: "PS", status: "offline", lastActive: "Yesterday", incidents: 0 },
  { id: "m8", name: "Fernanda Rocha", email: "f.rocha@acme.com", role: "analyst", avatar: "FR", status: "away", lastActive: "45m ago", incidents: 19 },
]

const ROLE_CONFIG: Record<Role, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  owner: { label: "Owner", icon: Crown, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
  admin: { label: "Admin", icon: Shield, color: "text-aegis-blue-400", bg: "bg-aegis-blue-500/10 border-aegis-blue-500/20" },
  analyst: { label: "Analyst", icon: User, color: "text-aegis-cyan-400", bg: "bg-aegis-cyan-400/10 border-aegis-cyan-400/20" },
  viewer: { label: "Viewer", icon: User, color: "text-muted-foreground", bg: "bg-aegis-surface/50 border-aegis" },
}

const STATUS_COLOR = {
  online: "bg-aegis-green-400",
  away: "bg-yellow-400",
  offline: "bg-aegis-silver-600",
}

export function TeamMembers() {
  return (
    <div className="hud-panel rounded-2xl border border-aegis flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-aegis">
        <div>
          <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">// MEMBERS</p>
          <h3 className="text-sm font-semibold text-foreground mt-0.5">Team Members</h3>
        </div>
        <span className="text-xs text-muted-foreground font-mono">{MEMBERS.length} total</span>
      </div>

      <div className="divide-y divide-aegis/50">
        {MEMBERS.map((member, i) => {
          const role = ROLE_CONFIG[member.role]
          const RoleIcon = role.icon
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-center gap-4 p-4 hover:bg-aegis-elevated/30 transition-colors"
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-aegis-blue-500/30 to-aegis-purple-400/30 border border-aegis text-xs font-bold text-foreground">
                  {member.avatar}
                </div>
                <span className={cn("absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-aegis-void", STATUS_COLOR[member.status])} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{member.name}</span>
                  <div className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 border text-[9px] font-semibold uppercase tracking-wider", role.color, role.bg)}>
                    <RoleIcon className="size-2.5" />
                    {role.label}
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Mail className="size-2.5" />{member.email}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="hidden md:flex items-center gap-4 flex-shrink-0">
                <div className="text-center">
                  <div className="text-sm font-bold font-mono text-aegis-blue-400">{member.incidents}</div>
                  <div className="text-[9px] text-muted-foreground">Incidents</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-mono text-muted-foreground">{member.lastActive}</div>
                  <div className="text-[9px] text-muted-foreground">Last active</div>
                </div>
              </div>

              <Button variant="ghost" size="icon-xs" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="size-3.5" />
              </Button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
