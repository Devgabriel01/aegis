"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Quote } from "lucide-react"

const TESTIMONIALS = [
  {
    quote: "AEGIS replaced three separate tools for us. The AI analyst alone saves our team 15 hours a week on incident triage.",
    author: "Sarah Chen",
    role: "Head of Security Operations",
    company: "Fintech Corp",
    avatar: "SC",
    color: "#22D3EE",
  },
  {
    quote: "The real-time threat intelligence combined with automated CVE matching is exactly what we needed. Deployment took under an hour.",
    author: "Marcus Rodriguez",
    role: "CISO",
    company: "HealthBridge Systems",
    avatar: "MR",
    color: "#A855F7",
  },
  {
    quote: "Our SOC team's response time dropped from 4 hours to 22 minutes. The incident timeline and evidence management is flawless.",
    author: "James Wright",
    role: "SOC Team Lead",
    company: "GlobalBank",
    avatar: "JW",
    color: "#3B8FEF",
  },
  {
    quote: "As a fast-growing startup, we needed enterprise-grade security without the enterprise-grade complexity. AEGIS delivers exactly that.",
    author: "Priya Patel",
    role: "VP Engineering",
    company: "Nexus Cloud",
    avatar: "PP",
    color: "#00CC58",
  },
  {
    quote: "The vulnerability scanner caught a critical CVE that our previous tool had missed for 3 months. That's the ROI right there.",
    author: "Tom Brennan",
    role: "Security Engineer",
    company: "InfraSec Ltd",
    avatar: "TB",
    color: "#FF6B00",
  },
  {
    quote: "Multi-tenancy support made AEGIS perfect for our MSSP. Managing 40+ client organizations from one platform is a game changer.",
    author: "Elena Vasquez",
    role: "CTO",
    company: "ShieldMSP",
    avatar: "EV",
    color: "#22D3EE",
  },
]

export function TestimonialsSection() {
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
            // TRUSTED BY SECURITY TEAMS
          </p>
          <h2 className="text-4xl font-bold text-foreground tracking-tight">
            Built for the teams who protect everything
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="hud-panel relative rounded-xl p-6 border border-aegis hover:border-aegis-bright transition-all group"
            >
              <Quote className="size-6 mb-4 opacity-30" style={{ color: t.color }} />
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: t.color + "30", border: `1px solid ${t.color}40`, color: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
                </div>
              </div>
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full rounded-b-xl transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${t.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
