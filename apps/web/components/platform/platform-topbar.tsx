"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Bell, HelpCircle, Plus, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const RECENT_ALERTS = [
  { id: 1, label: "Critical: APT activity on prod network", time: "2m", color: "#FF2D55", read: false },
  { id: 2, label: "High: CVE-2024-3094 detected on db-01", time: "15m", color: "#FF6B00", read: false },
  { id: 3, label: "Medium: SSL cert expires in 7 days", time: "1h", color: "#FFB800", read: true },
  { id: 4, label: "Info: Scan completed — api.example.com", time: "2h", color: "#22D3EE", read: true },
]

export function PlatformTopbar() {
  const [searchFocus, setSearchFocus] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const unreadCount = RECENT_ALERTS.filter((a) => !a.read).length

  return (
    <header className="flex h-14 items-center justify-between border-b border-aegis bg-aegis-surface/30 backdrop-blur-sm px-6 flex-shrink-0">
      {/* Search */}
      <div className={cn(
        "flex items-center gap-2 rounded-lg border px-3 py-1.5 transition-all duration-200 w-72",
        searchFocus
          ? "border-aegis-bright bg-aegis-elevated"
          : "border-aegis bg-aegis-surface/50",
      )}>
        <Search className="size-3.5 text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          placeholder="Search threats, assets, incidents..."
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
        />
        <kbd className="hidden sm:inline-flex h-4 items-center rounded border border-aegis px-1 text-[9px] font-mono text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Add new */}
        <Button variant="outline" size="sm" className="gap-1.5 hidden sm:flex">
          <Plus className="size-3.5" />
          New Incident
        </Button>

        {/* Help */}
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-aegis-elevated transition-colors">
          <HelpCircle className="size-4" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-aegis-elevated transition-colors"
          >
            <Bell className="size-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-aegis-critical text-[9px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-aegis bg-aegis-surface/95 backdrop-blur-xl shadow-aegis-lg overflow-hidden z-50"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-aegis">
                <span className="text-sm font-semibold text-foreground">Alerts</span>
                <span className="text-xs text-muted-foreground">{unreadCount} unread</span>
              </div>
              {RECENT_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "flex items-start gap-3 px-4 py-3 hover:bg-aegis-elevated transition-colors cursor-pointer border-b border-aegis last:border-0",
                    !alert.read && "bg-aegis-blue-500/3",
                  )}
                >
                  <span
                    className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: alert.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-xs", alert.read ? "text-muted-foreground" : "text-foreground")}>
                      {alert.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground/60 mt-0.5">{alert.time} ago</p>
                  </div>
                  {!alert.read && (
                    <div className="h-1.5 w-1.5 rounded-full bg-aegis-blue-400 flex-shrink-0 mt-1.5" />
                  )}
                </div>
              ))}
              <div className="p-3 bg-aegis-surface/50">
                <button className="w-full text-center text-xs text-aegis-blue-400 hover:text-aegis-blue-300 transition-colors">
                  View all notifications
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* User avatar */}
        <button className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-aegis-elevated transition-colors">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-aegis-blue-500/20 border border-aegis-blue-500/30 text-xs font-bold text-aegis-blue-300">
            A
          </div>
          <ChevronDown className="size-3 text-muted-foreground" />
        </button>
      </div>
    </header>
  )
}
