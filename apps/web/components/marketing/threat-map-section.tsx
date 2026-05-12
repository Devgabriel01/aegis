"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useRef as useRef2 } from "react"

interface AttackPoint {
  x: number
  y: number
  targetX: number
  targetY: number
  severity: "critical" | "high" | "medium"
  country: string
}

const ATTACK_POINTS: AttackPoint[] = [
  { x: 15, y: 35, targetX: 47, targetY: 42, severity: "critical", country: "RU" },
  { x: 72, y: 28, targetX: 47, targetY: 42, severity: "high", country: "CN" },
  { x: 85, y: 55, targetX: 47, targetY: 42, severity: "critical", country: "KP" },
  { x: 30, y: 60, targetX: 47, targetY: 42, severity: "medium", country: "BR" },
  { x: 55, y: 15, targetX: 47, targetY: 42, severity: "high", country: "IR" },
  { x: 65, y: 70, targetX: 47, targetY: 42, severity: "medium", country: "ID" },
  { x: 20, y: 20, targetX: 47, targetY: 42, severity: "high", country: "UA" },
]

const SEVERITY_COLORS = {
  critical: "#FF2D55",
  high: "#FF6B00",
  medium: "#FFB800",
}

const LIVE_EVENTS = [
  { flag: "🇷🇺", country: "Russia", type: "APT Attack", target: "Banking Infra", severity: "CRITICAL", color: "#FF2D55" },
  { flag: "🇨🇳", country: "China", type: "Data Exfiltration", target: "Gov Network", severity: "CRITICAL", color: "#FF2D55" },
  { flag: "🇰🇵", country: "N. Korea", type: "Ransomware", target: "Healthcare", severity: "HIGH", color: "#FF6B00" },
  { flag: "🇮🇷", country: "Iran", type: "DDOS", target: "Critical Infra", severity: "HIGH", color: "#FF6B00" },
  { flag: "🇧🇷", country: "Brazil", type: "Phishing Campaign", target: "Financial", severity: "MEDIUM", color: "#FFB800" },
]

export function ThreatMapSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-aegis-surface/20" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <p className="text-xs font-mono text-aegis-cyan-400 uppercase tracking-[0.3em] mb-4">
            // GLOBAL THREAT INTELLIGENCE
          </p>
          <h2 className="text-4xl font-bold text-foreground tracking-tight">
            Real-time global attack map
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Track threat origins, attack vectors, and targeted industries across 190+ countries
            with geolocation intelligence and attribution analysis.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Threat map visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 relative"
          >
            <div className="hud-panel rounded-2xl overflow-hidden aspect-[16/9] relative border border-aegis">
              {/* World map mockup using CSS */}
              <div className="absolute inset-0 bg-[#020D1F]">
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `radial-gradient(circle at 47% 42%, rgba(59,143,239,0.3) 0%, transparent 25%)`,
                  }}
                />

                {/* Grid lines */}
                <svg className="absolute inset-0 w-full h-full opacity-10">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <line
                      key={`h${i}`}
                      x1="0" y1={`${(i + 1) * 12.5}%`}
                      x2="100%" y2={`${(i + 1) * 12.5}%`}
                      stroke="#3B8FEF" strokeWidth="0.5"
                    />
                  ))}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line
                      key={`v${i}`}
                      x1={`${(i + 1) * 8.33}%`} y1="0"
                      x2={`${(i + 1) * 8.33}%`} y2="100%"
                      stroke="#3B8FEF" strokeWidth="0.5"
                    />
                  ))}
                </svg>

                {/* Attack lines SVG */}
                <svg className="absolute inset-0 w-full h-full">
                  {inView && ATTACK_POINTS.map((point, i) => (
                    <g key={i}>
                      <motion.line
                        x1={`${point.x}%`} y1={`${point.y}%`}
                        x2={`${point.targetX}%`} y2={`${point.targetY}%`}
                        stroke={SEVERITY_COLORS[point.severity]}
                        strokeWidth="1"
                        strokeDasharray="4 3"
                        strokeOpacity="0.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0, 0.7, 0.4] }}
                        transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, repeatDelay: 3 }}
                      />
                      {/* Source dot */}
                      <motion.circle
                        cx={`${point.x}%`} cy={`${point.y}%`}
                        r="4"
                        fill={SEVERITY_COLORS[point.severity]}
                        fillOpacity="0.8"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.7] }}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
                      />
                      {/* Ripple */}
                      <motion.circle
                        cx={`${point.x}%`} cy={`${point.y}%`}
                        r="4"
                        fill="none"
                        stroke={SEVERITY_COLORS[point.severity]}
                        strokeWidth="1"
                        animate={{ r: [4, 14], opacity: [0.7, 0] }}
                        transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatDelay: 2 }}
                      />
                      {/* Country label */}
                      <text
                        x={`${point.x + 2}%`} y={`${point.y - 2.5}%`}
                        fill={SEVERITY_COLORS[point.severity]}
                        fontSize="8" fontFamily="JetBrains Mono, monospace"
                        opacity="0.8"
                      >
                        {point.country}
                      </text>
                    </g>
                  ))}

                  {/* Target (USA) */}
                  {inView && (
                    <g>
                      <motion.circle
                        cx="47%" cy="42%"
                        r="6"
                        fill="none"
                        stroke="#3B8FEF"
                        strokeWidth="2"
                        animate={{ r: [6, 16], opacity: [1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <circle cx="47%" cy="42%" r="4" fill="#3B8FEF" opacity="0.9" />
                      <text x="49%" y="40%" fill="#3B8FEF" fontSize="8" fontFamily="JetBrains Mono, monospace" opacity="0.9">
                        TARGET
                      </text>
                    </g>
                  )}
                </svg>

                {/* Stats overlay */}
                <div className="absolute bottom-3 left-3 flex gap-3">
                  {Object.entries(SEVERITY_COLORS).map(([sev, color]) => (
                    <div key={sev} className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-[9px] uppercase font-mono" style={{ color }}>{sev}</span>
                    </div>
                  ))}
                </div>

                {/* Live badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-aegis-critical/10 border border-aegis-critical/30 rounded-full px-2 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-aegis-critical animate-pulse" />
                  <span className="text-[9px] text-aegis-critical font-mono font-bold uppercase tracking-wider">Live Threats</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Live event feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-foreground">Attack Feed</h3>
              <span className="flex items-center gap-1 text-[10px] text-aegis-green-400 font-mono">
                <span className="h-1.5 w-1.5 bg-aegis-green-400 rounded-full animate-pulse" />
                LIVE
              </span>
            </div>

            {LIVE_EVENTS.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="hud-panel rounded-xl p-3.5 border border-aegis hover:border-aegis-bright transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{event.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-foreground">{event.country}</span>
                      <span
                        className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full"
                        style={{ color: event.color, backgroundColor: event.color + "15", border: `1px solid ${event.color}30` }}
                      >
                        {event.severity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{event.type}</p>
                    <p className="text-[10px] text-muted-foreground/70 mt-0.5">↳ {event.target}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
