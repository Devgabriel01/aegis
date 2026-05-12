"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  LayoutDashboard,
  AlertTriangle,
  Search,
  Siren,
  Database,
  Server,
  FileBarChart,
  Users,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Bell,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  {
    group: "Core",
    items: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", badge: null },
      { href: "/threats", icon: AlertTriangle, label: "Threat Intelligence", badge: "24" },
      { href: "/vulnerabilities", icon: Search, label: "Vulnerabilities", badge: "8" },
      { href: "/incidents", icon: Siren, label: "Incidents", badge: "3" },
    ],
  },
  {
    group: "Infrastructure",
    items: [
      { href: "/assets", icon: Server, label: "Assets", badge: null },
      { href: "/siem", icon: Database, label: "SIEM", badge: null },
      { href: "/activity", icon: Activity, label: "Activity", badge: null },
    ],
  },
  {
    group: "Management",
    items: [
      { href: "/reports", icon: FileBarChart, label: "Reports", badge: null },
      { href: "/team", icon: Users, label: "Team", badge: null },
      { href: "/billing", icon: CreditCard, label: "Billing", badge: null },
      { href: "/settings", icon: Settings, label: "Settings", badge: null },
    ],
  },
]

interface SidebarItemProps {
  href: string
  icon: React.ElementType
  label: string
  badge?: string | null
  collapsed: boolean
  active: boolean
}

function SidebarItem({ href, icon: Icon, label, badge, collapsed, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "bg-aegis-blue-500/12 text-aegis-blue-300 border border-aegis-blue-500/20"
          : "text-muted-foreground hover:text-foreground hover:bg-aegis-elevated border border-transparent",
        collapsed && "justify-center px-2",
      )}
    >
      {/* Active indicator */}
      {active && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r-full bg-aegis-blue-400"
        />
      )}

      <Icon
        className={cn(
          "flex-shrink-0 size-4 transition-colors",
          active ? "text-aegis-blue-400" : "text-muted-foreground group-hover:text-foreground",
        )}
      />

      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {badge && (
            <span className={cn(
              "flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold",
              active
                ? "bg-aegis-blue-400/20 text-aegis-blue-300"
                : "bg-aegis-critical/15 text-aegis-critical",
            )}>
              {badge}
            </span>
          )}
        </>
      )}

      {/* Tooltip when collapsed */}
      {collapsed && (
        <div className="absolute left-full ml-2 z-50 hidden group-hover:flex">
          <div className="rounded-md bg-aegis-elevated border border-aegis px-2.5 py-1.5 text-xs font-medium text-foreground whitespace-nowrap shadow-aegis-md">
            {label}
            {badge && (
              <span className="ml-2 text-aegis-critical font-bold">{badge}</span>
            )}
          </div>
        </div>
      )}
    </Link>
  )
}

export function PlatformSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col border-r border-aegis bg-aegis-surface/50 backdrop-blur-sm flex-shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <div className={cn(
        "flex h-14 items-center border-b border-aegis px-4",
        collapsed ? "justify-center" : "justify-between",
      )}>
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="relative flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-aegis-blue-500/10 border border-aegis-blue-500/30 transition-all group-hover:border-aegis-blue-400/60">
            <Shield className="h-3.5 w-3.5 text-aegis-blue-400" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm font-bold tracking-[0.15em] text-foreground whitespace-nowrap overflow-hidden"
              >
                AEGIS
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-aegis-elevated transition-colors"
          >
            <ChevronLeft className="size-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scroll py-4 px-3">
        {NAV_ITEMS.map(({ group, items }) => (
          <div key={group} className="mb-5">
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60"
                >
                  {group}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="flex flex-col gap-0.5">
              {items.map((item) => (
                <SidebarItem
                  key={item.href}
                  {...item}
                  collapsed={collapsed}
                  active={pathname === item.href || pathname.startsWith(item.href + "/")}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse toggle at bottom */}
      {collapsed && (
        <div className="px-3 py-3 border-t border-aegis">
          <button
            onClick={() => setCollapsed(false)}
            className="w-full flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-aegis-elevated transition-colors"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}

      {/* Status indicator */}
      {!collapsed && (
        <div className="border-t border-aegis p-4">
          <div className="flex items-center gap-2 rounded-lg bg-aegis-green-400/5 border border-aegis-green-400/15 px-3 py-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aegis-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-aegis-green-400" />
            </span>
            <span className="text-[10px] text-aegis-green-400 font-mono">All systems nominal</span>
          </div>
        </div>
      )}
    </motion.aside>
  )
}
