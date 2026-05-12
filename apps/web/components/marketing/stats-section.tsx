"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

interface StatItem {
  value: number
  suffix: string
  label: string
  description: string
  color: string
}

const STATS: StatItem[] = [
  { value: 99.97, suffix: "%", label: "Detection Rate", description: "Threat detection accuracy across all vectors", color: "#22D3EE" },
  { value: 2.4, suffix: "M+", label: "Assets Protected", description: "Endpoints and cloud resources monitored", color: "#3B8FEF" },
  { value: 847, suffix: "K+", label: "Threats Neutralized", description: "Active threats blocked in the last 30 days", color: "#A855F7" },
  { value: 3.2, suffix: "s", label: "Mean Detection Time", description: "Average time from threat emergence to alert", color: "#00CC58" },
]

function AnimatedCounter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!inView) return
    const start = 0
    const duration = 1800
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(start + (value - start) * eased)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [inView, value])

  return (
    <span ref={ref} className="text-5xl font-bold font-display" style={{ color }}>
      {value < 10 ? count.toFixed(2) : Math.round(count).toLocaleString()}
      <span className="text-3xl">{suffix}</span>
    </span>
  )
}

export function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section ref={ref} className="relative py-24 border-y border-aegis">
      {/* Background */}
      <div className="absolute inset-0 bg-aegis-surface/30" />
      <div className="absolute inset-0 grid-bg-sm opacity-30" />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-mono text-aegis-cyan-400 uppercase tracking-[0.3em] mb-3">
            // PLATFORM METRICS
          </p>
          <h2 className="text-3xl font-bold text-foreground">
            Built for enterprise-scale security
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="hud-corner relative flex flex-col gap-3 p-8 border border-aegis bg-aegis-surface/50 first:rounded-l-xl last:rounded-r-xl"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} color={stat.color} />
              <div>
                <p className="font-semibold text-foreground">{stat.label}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{stat.description}</p>
              </div>

              {/* Decorative line */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-full rounded-b-xl opacity-30"
                style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
