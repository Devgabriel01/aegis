"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Intense glow bg */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse at center, rgba(26,110,212,0.8) 0%, rgba(6,182,212,0.3) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl"
        >
          <div className="relative rounded-2xl border border-aegis-bright bg-aegis-surface/60 p-12 text-center backdrop-blur-sm shadow-aegis-lg overflow-hidden">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-aegis-blue-400/50" />
            <div className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-aegis-blue-400/50" />
            <div className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-aegis-blue-400/50" />
            <div className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-aegis-blue-400/50" />

            <div className="relative z-10">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-aegis-blue-500/10 border border-aegis-blue-500/30 mb-6 mx-auto">
                <Shield className="size-8 text-aegis-blue-400" />
              </div>

              <h2 className="text-4xl font-bold text-foreground tracking-tight">
                Protect your infrastructure
                <br />
                <span className="gradient-text">starting today.</span>
              </h2>

              <p className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto">
                Join 1,200+ security teams who trust AEGIS to defend their most critical systems.
                Deploy in minutes. Scale to millions.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link href="/register">
                  <Button variant="premium" size="xl" className="group gap-2.5 min-w-[220px]">
                    <Shield className="size-5" />
                    Start Free Trial
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button variant="outline" size="xl">
                  Schedule a Demo
                </Button>
              </div>

              <p className="mt-6 text-xs text-muted-foreground">
                14-day free trial · No credit card · SOC 2 Type II · GDPR compliant
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
