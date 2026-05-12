"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SecurityScoreProps {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

function getScoreColor(score: number): string {
  if (score >= 85) return "#00CC58"
  if (score >= 70) return "#22D3EE"
  if (score >= 50) return "#FFB800"
  if (score >= 30) return "#FF6B00"
  return "#FF2D55"
}

function getScoreLabel(score: number): string {
  if (score >= 85) return "SECURE"
  if (score >= 70) return "GOOD"
  if (score >= 50) return "MODERATE"
  if (score >= 30) return "AT RISK"
  return "CRITICAL"
}

const SIZE_MAP = {
  sm: { radius: 28, stroke: 4, viewBox: 72, fontSize: "text-lg", labelSize: "text-[9px]" },
  md: { radius: 44, stroke: 6, viewBox: 108, fontSize: "text-3xl", labelSize: "text-[10px]" },
  lg: { radius: 64, stroke: 8, viewBox: 152, fontSize: "text-5xl", labelSize: "text-xs" },
}

export function SecurityScore({ score, size = "md", showLabel = true, className }: SecurityScoreProps) {
  const { radius, stroke, viewBox, fontSize, labelSize } = SIZE_MAP[size]
  const center = viewBox / 2
  const circumference = 2 * Math.PI * radius
  const clampedScore = Math.max(0, Math.min(100, score))
  const dashOffset = circumference - (clampedScore / 100) * circumference
  const color = getScoreColor(clampedScore)
  const label = getScoreLabel(clampedScore)

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <div className="relative">
        <svg
          width={viewBox}
          height={viewBox}
          viewBox={`0 0 ${viewBox} ${viewBox}`}
          className="-rotate-90"
        >
          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(59,143,239,0.08)"
            strokeWidth={stroke}
          />
          {/* Glow filter */}
          <defs>
            <filter id="score-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Progress */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            filter="url(#score-glow)"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={cn("font-bold font-display tracking-tight", fontSize)}
            style={{ color }}
          >
            {clampedScore}
          </motion.span>
          {showLabel && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              className={cn("font-mono font-medium tracking-widest", labelSize)}
              style={{ color }}
            >
              {label}
            </motion.span>
          )}
        </div>
      </div>
    </div>
  )
}
