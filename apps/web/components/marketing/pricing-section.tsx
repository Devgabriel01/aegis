"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { CheckCircle2, Shield, Zap, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const PLANS = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "For small teams starting their security journey.",
    icon: Shield,
    color: "#3B8FEF",
    features: [
      "Up to 5 team members",
      "1 Workspace",
      "100 assets monitored",
      "Vulnerability scanner",
      "Incident management",
      "7-day log retention",
      "Email alerts",
      "Community support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: "$149",
    period: "/month",
    description: "For security teams that need full SOC capabilities.",
    icon: Zap,
    color: "#22D3EE",
    features: [
      "Up to 20 team members",
      "5 Workspaces",
      "Unlimited assets",
      "Full threat intelligence",
      "SIEM log ingestion",
      "AI analyst (100 queries/day)",
      "Global attack map",
      "30-day log retention",
      "Slack & webhook alerts",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with advanced security needs.",
    icon: Building2,
    color: "#A855F7",
    features: [
      "Unlimited team members",
      "Unlimited workspaces",
      "Unlimited assets",
      "Full AI analyst",
      "Custom SIEM integrations",
      "SSO / SAML 2.0",
      "RBAC + audit logs",
      "1-year log retention",
      "Dedicated security engineer",
      "SLA 99.99% uptime",
      "On-premise option",
      "Custom contracts",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="pricing" ref={ref} className="relative py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <p className="text-xs font-mono text-aegis-cyan-400 uppercase tracking-[0.3em] mb-4">
            // PRICING
          </p>
          <h2 className="text-4xl font-bold text-foreground tracking-tight">
            Transparent, predictable pricing
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Start with a 14-day free trial. No credit card required. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
          {PLANS.map((plan, i) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "relative rounded-2xl border p-7 flex flex-col gap-5",
                  plan.popular
                    ? "border-aegis-cyan-400/40 bg-aegis-surface/80 shadow-aegis-lg"
                    : "border-aegis bg-aegis-surface/40",
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-aegis-cyan-500 px-4 py-1 text-xs font-bold text-white uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: plan.color + "15", border: `1px solid ${plan.color}30` }}
                  >
                    <Icon className="size-5" style={{ color: plan.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.description}</p>
                  </div>
                </div>

                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold font-display" style={{ color: plan.color }}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground mb-1">{plan.period}</span>
                  )}
                </div>

                <div
                  className="h-px w-full"
                  style={{ background: `linear-gradient(90deg, ${plan.color}30, transparent)` }}
                />

                <ul className="flex flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="size-4 flex-shrink-0 mt-0.5"
                        style={{ color: plan.color }}
                      />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-2">
                  <Link href={plan.name === "Enterprise" ? "#" : "/register"}>
                    <Button
                      className="w-full"
                      variant={plan.popular ? "cyan" : "outline"}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
