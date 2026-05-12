"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, AlertTriangle, Activity, TrendingUp, CheckCircle2, XCircle } from "lucide-react"
import { SecurityScore } from "@/components/ui/security-score"

const MOCK_THREATS = [
  { label: "Brute Force — 185.234.219.87", severity: "CRITICAL", color: "#FF2D55", time: "2m ago" },
  { label: "SQLi Attempt — /api/users", severity: "HIGH", color: "#FF6B00", time: "7m ago" },
  { label: "Anomalous Login — admin@example.com", severity: "HIGH", color: "#FF6B00", time: "15m ago" },
  { label: "Port Scan — 10.0.0.45", severity: "MEDIUM", color: "#FFB800", time: "28m ago" },
  { label: "Expired SSL — legacy.example.com", severity: "MEDIUM", color: "#FFB800", time: "1h ago" },
]

const MOCK_METRICS = [
  { label: "Threats", value: "24", color: "#FF2D55", icon: AlertTriangle },
  { label: "Incidents", value: "7", color: "#FF6B00", icon: Shield },
  { label: "Assets", value: "342", color: "#22D3EE", icon: Activity },
  { label: "Uptime", value: "99.9%", color: "#00CC58", icon: TrendingUp },
]

export function DashboardPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-aegis-surface/30 to-transparent" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <p className="text-xs font-mono text-aegis-cyan-400 uppercase tracking-[0.3em] mb-4">
            // COMMAND CENTER
          </p>
          <h2 className="text-4xl font-bold text-foreground tracking-tight">
            Your entire security posture,
            <br />
            <span className="gradient-text">at a glance.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            The AEGIS dashboard gives you a live, cinematic view of your organization&apos;s
            security health — updated in real time.
          </p>
        </motion.div>

        {/* Mock dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Glow beneath */}
          <div className="absolute -inset-8 bg-aegis-blue-500/8 rounded-3xl blur-3xl" />

          {/* Dashboard frame */}
          <div className="relative rounded-2xl border border-aegis overflow-hidden shadow-aegis-lg bg-aegis-void">
            {/* Titlebar */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-aegis bg-aegis-surface/60">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-aegis-silver-700" />
                <div className="h-2.5 w-2.5 rounded-full bg-aegis-silver-700" />
                <div className="h-2.5 w-2.5 rounded-full bg-aegis-silver-700" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-muted-foreground font-mono">
                  AEGIS — Security Operations Center
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-aegis-green-400 font-mono flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-aegis-green-400 animate-pulse inline-block" />
                  LIVE
                </span>
              </div>
            </div>

            {/* Dashboard body */}
            <div className="grid grid-cols-12 gap-0 divide-x divide-aegis">
              {/* Sidebar */}
              <div className="col-span-2 bg-aegis-surface/40 p-4 flex flex-col gap-2">
                {["Dashboard","Threats","Incidents","Vulns","Assets","SIEM","Reports"].map((item, i) => (
                  <div
                    key={item}
                    className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      i === 0
                        ? "bg-aegis-blue-500/15 text-aegis-blue-300 border border-aegis-blue-500/20"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="col-span-10 p-5 bg-aegis-void">
                {/* Top metrics */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {MOCK_METRICS.map(({ label, value, color, icon: Icon }) => (
                    <div key={label} className="hud-panel rounded-lg p-3 border border-aegis">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
                        <Icon className="size-3.5" style={{ color }} />
                      </div>
                      <div className="text-xl font-bold font-display" style={{ color }}>{value}</div>
                    </div>
                  ))}
                </div>

                {/* Mid row */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Security score */}
                  <div className="hud-panel rounded-xl p-4 border border-aegis flex flex-col items-center gap-2">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider self-start w-full">Security Score</p>
                    <SecurityScore score={74} size="sm" />
                  </div>

                  {/* Threat feed */}
                  <div className="col-span-2 hud-panel rounded-xl p-4 border border-aegis">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3">Live Threat Feed</p>
                    <div className="flex flex-col gap-1.5">
                      {MOCK_THREATS.slice(0, 4).map((t, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span
                            className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: t.color }}
                          />
                          <span className="text-[10px] text-muted-foreground flex-1 truncate">{t.label}</span>
                          <span className="text-[9px] font-bold" style={{ color: t.color }}>{t.severity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating status badges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="absolute -left-6 top-1/3 hud-panel rounded-xl p-3 border border-aegis-green-400/20 bg-aegis-green-400/5 hidden lg:block"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-aegis-green-400" />
              <div>
                <p className="text-xs font-medium text-aegis-green-400">Firewall Active</p>
                <p className="text-[10px] text-muted-foreground">342 rules enforced</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.0 }}
            className="absolute -right-6 top-1/2 hud-panel rounded-xl p-3 border border-aegis-critical/20 bg-aegis-critical/5 hidden lg:block"
          >
            <div className="flex items-center gap-2">
              <XCircle className="size-4 text-aegis-critical" />
              <div>
                <p className="text-xs font-medium text-aegis-critical">3 Critical Alerts</p>
                <p className="text-[10px] text-muted-foreground">Requires attention</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
