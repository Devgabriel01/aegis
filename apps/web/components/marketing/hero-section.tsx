"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Shield, ArrowRight, Play, Zap, Lock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const FLOATING_ALERTS = [
  { id: 1, type: "CRITICAL", label: "APT Activity Detected", time: "2s ago", color: "#FF2D55" },
  { id: 2, type: "HIGH", label: "Port Scan: 192.168.1.45", time: "8s ago", color: "#FF6B00" },
  { id: 3, type: "BLOCKED", label: "XSS Attempt Neutralized", time: "14s ago", color: "#00CC58" },
  { id: 4, type: "INFO", label: "New Asset: api.prod.example.com", time: "22s ago", color: "#22D3EE" },
]

const GRID_STATS = [
  { label: "Threats Neutralized", value: "847K+", icon: Shield },
  { label: "Assets Protected", value: "2.4M+", icon: Lock },
  { label: "Countries Monitored", value: "190+", icon: Globe },
  { label: "Detection Rate", value: "99.97%", icon: Zap },
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-aegis-radial" />

      {/* Hero glow */}
      <motion.div
        style={{
          y,
          opacity,
          background: "radial-gradient(ellipse at center, rgba(26,110,212,0.15) 0%, rgba(6,182,212,0.05) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
      />

      {/* Animated grid dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-aegis-blue-400/30"
            style={{
              left: `${(i % 4) * 25 + Math.random() * 10}%`,
              top: `${Math.floor(i / 4) * 33 + Math.random() * 15}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-aegis-blue-400/40 to-transparent"
        animate={{ top: ["-2%", "102%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      <div className="container relative z-10 mx-auto px-6 py-24 text-center">
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center"
        >
          <div className="relative inline-flex items-center gap-2 rounded-full border border-aegis-blue-400/30 bg-aegis-blue-500/5 px-4 py-1.5 text-xs font-medium text-aegis-blue-300 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aegis-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-aegis-blue-400" />
            </span>
            Now in Public Beta — AI-Powered Threat Analysis
            <ArrowRight className="size-3" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-balance font-display text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
            <span className="block">Cyber Defense</span>
            <span className="block mt-2">
              <span className="gradient-text">Command Center</span>
            </span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg leading-relaxed"
        >
          Enterprise-grade threat intelligence and security operations platform for modern
          infrastructure. Detect, analyze, and neutralize threats in real time.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/register">
            <Button variant="premium" size="xl" className="group gap-2.5 min-w-[200px]">
              <Shield className="size-5" />
              Start Free Trial
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Button variant="outline" size="xl" className="gap-2.5 min-w-[180px]">
            <Play className="size-4 fill-current" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 text-xs text-muted-foreground"
        >
          No credit card required · 14-day free trial · SOC 2 Type II compliant
        </motion.p>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {GRID_STATS.map(({ label, value, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.08 }}
              className="hud-panel relative flex flex-col items-center gap-1.5 rounded-xl p-4 text-center"
            >
              <div className="absolute top-0 left-0 h-2.5 w-2.5 border-t border-l border-aegis-bright" />
              <div className="absolute top-0 right-0 h-2.5 w-2.5 border-t border-r border-aegis-bright" />
              <Icon className="size-4 text-aegis-blue-400 mb-1" />
              <div className="text-xl font-bold font-display text-foreground">{value}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating threat alerts */}
      <div className="absolute right-8 top-1/3 hidden xl:flex flex-col gap-2">
        {FLOATING_ALERTS.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hud-panel flex items-center gap-3 rounded-lg px-3 py-2.5 w-64 border-aegis"
          >
            <span
              className="h-2 w-2 flex-shrink-0 rounded-full"
              style={{ backgroundColor: alert.color, boxShadow: `0 0 8px ${alert.color}` }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: alert.color }}
                >
                  {alert.type}
                </span>
                <span className="text-[9px] text-muted-foreground">{alert.time}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{alert.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-aegis-void to-transparent" />
    </section>
  )
}
