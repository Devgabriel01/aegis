"use client"

import { cn } from "@/lib/utils"
import { TrendingDown, TrendingUp, Minus } from "lucide-react"
import { motion } from "framer-motion"

interface MetricCardProps {
  label: string
  value: string | number
  subtext?: string
  trend?: {
    value: number
    direction: "up" | "down" | "neutral"
    label?: string
  }
  icon?: React.ReactNode
  variant?: "default" | "critical" | "warning" | "success" | "cyan" | "purple"
  pulse?: boolean
  className?: string
  index?: number
}

const variantStyles = {
  default: {
    card: "border-aegis",
    icon: "text-aegis-blue-400 bg-aegis-blue-500/10",
    value: "text-foreground",
    glow: "",
  },
  critical: {
    card: "border-aegis-critical/25",
    icon: "text-aegis-critical bg-aegis-critical/10",
    value: "text-aegis-critical",
    glow: "shadow-critical",
  },
  warning: {
    card: "border-aegis-medium/25",
    icon: "text-aegis-medium bg-aegis-medium/10",
    value: "text-aegis-medium",
    glow: "",
  },
  success: {
    card: "border-aegis-green-400/25",
    icon: "text-aegis-green-400 bg-aegis-green-400/10",
    value: "text-aegis-green-400",
    glow: "",
  },
  cyan: {
    card: "border-aegis-cyan",
    icon: "text-aegis-cyan-400 bg-aegis-cyan-500/10",
    value: "text-aegis-cyan-400",
    glow: "",
  },
  purple: {
    card: "border-aegis-purple",
    icon: "text-aegis-purple-400 bg-aegis-purple-500/10",
    value: "text-aegis-purple-400",
    glow: "",
  },
}

export function MetricCard({
  label,
  value,
  subtext,
  trend,
  icon,
  variant = "default",
  pulse = false,
  className,
  index = 0,
}: MetricCardProps) {
  const styles = variantStyles[variant]

  const TrendIcon =
    trend?.direction === "up"
      ? TrendingUp
      : trend?.direction === "down"
        ? TrendingDown
        : Minus

  const trendColor =
    trend?.direction === "up"
      ? "text-aegis-green-400"
      : trend?.direction === "down"
        ? "text-aegis-critical"
        : "text-muted-foreground"

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "hud-panel metric-card group relative",
        styles.card,
        styles.glow,
        pulse && "animate-pulse-glow",
        className,
      )}
    >
      {/* Corner decorators */}
      <div className="absolute top-0 left-0 h-3 w-3 border-t border-l border-aegis-bright opacity-60" />
      <div className="absolute top-0 right-0 h-3 w-3 border-t border-r border-aegis-bright opacity-60" />

      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </p>
          <motion.p
            key={String(value)}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "mt-2 text-2xl font-bold tracking-tight font-display",
              styles.value,
            )}
          >
            {value}
          </motion.p>
          {subtext && (
            <p className="mt-1 text-xs text-muted-foreground truncate">{subtext}</p>
          )}
        </div>

        {icon && (
          <div className={cn("flex-shrink-0 rounded-lg p-2.5 ml-3", styles.icon)}>
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-3 flex items-center gap-1.5">
          <TrendIcon className={cn("size-3", trendColor)} />
          <span className={cn("text-xs font-medium", trendColor)}>
            {Math.abs(trend.value)}%
          </span>
          {trend.label && (
            <span className="text-xs text-muted-foreground">{trend.label}</span>
          )}
        </div>
      )}

      {pulse && (
        <div className="absolute top-3 right-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aegis-critical opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-aegis-critical" />
          </span>
        </div>
      )}
    </motion.div>
  )
}
