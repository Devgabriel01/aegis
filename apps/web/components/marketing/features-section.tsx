"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Shield,
  Activity,
  AlertTriangle,
  Search,
  Database,
  Brain,
  Globe,
  Lock,
  Zap,
  FileText,
  Users,
  BarChart3,
} from "lucide-react"

const FEATURES = [
  {
    icon: Activity,
    label: "Real-Time Dashboard",
    description: "Cyber defense command center with live threat feeds, security score, and global attack visualization.",
    color: "#3B8FEF",
    gradient: "from-blue-500/10 to-blue-500/0",
    borderColor: "border-aegis-blue-400/20",
    tag: "CORE",
  },
  {
    icon: Brain,
    label: "AI Threat Analyst",
    description: "OpenAI-powered analyst that summarizes incidents, classifies threats, and generates remediation reports.",
    color: "#A855F7",
    gradient: "from-purple-500/10 to-purple-500/0",
    borderColor: "border-aegis-purple-400/20",
    tag: "AI",
  },
  {
    icon: AlertTriangle,
    label: "Threat Intelligence",
    description: "IOC tracking, IP reputation, blacklist monitoring, phishing detection, and malware indicators.",
    color: "#FF6B00",
    gradient: "from-orange-500/10 to-orange-500/0",
    borderColor: "border-orange-500/20",
    tag: "INTEL",
  },
  {
    icon: Search,
    label: "Vulnerability Scanner",
    description: "Automated scanning for domains, ports, SSL/TLS, DNS, CVEs, and exposed technologies.",
    color: "#22D3EE",
    gradient: "from-cyan-500/10 to-cyan-500/0",
    borderColor: "border-aegis-cyan-400/20",
    tag: "SCANNER",
  },
  {
    icon: Shield,
    label: "Incident Response",
    description: "SOC-grade case management with timeline, evidence, SLA tracking, and analyst assignment.",
    color: "#FF2D55",
    gradient: "from-red-500/10 to-red-500/0",
    borderColor: "border-red-500/20",
    tag: "SOC",
  },
  {
    icon: Database,
    label: "SIEM Light",
    description: "Log ingestion from NGINX, Apache, Linux, Windows, Cloudflare with filtering and correlation.",
    color: "#00CC58",
    gradient: "from-green-500/10 to-green-500/0",
    borderColor: "border-green-500/20",
    tag: "SIEM",
  },
  {
    icon: Globe,
    label: "Asset Management",
    description: "Track domains, IPs, servers, certificates, and cloud assets with risk scoring.",
    color: "#3B8FEF",
    gradient: "from-blue-500/10 to-blue-500/0",
    borderColor: "border-aegis-blue-400/20",
    tag: "ASSETS",
  },
  {
    icon: BarChart3,
    label: "Reports & Analytics",
    description: "Executive summaries, compliance reports, and custom dashboards with AI-generated insights.",
    color: "#A855F7",
    gradient: "from-purple-500/10 to-purple-500/0",
    borderColor: "border-aegis-purple-400/20",
    tag: "REPORTS",
  },
  {
    icon: Users,
    label: "Multi-Tenant Teams",
    description: "Organizations, workspaces, RBAC roles, team management, and full audit trail.",
    color: "#22D3EE",
    gradient: "from-cyan-500/10 to-cyan-500/0",
    borderColor: "border-aegis-cyan-400/20",
    tag: "TEAMS",
  },
  {
    icon: Lock,
    label: "Zero-Trust Security",
    description: "JWT, rate limiting, CSP headers, XSS protection, CSRF, encryption, and immutable logs.",
    color: "#FF2D55",
    gradient: "from-red-500/10 to-red-500/0",
    borderColor: "border-red-500/20",
    tag: "SECURITY",
  },
  {
    icon: Zap,
    label: "Alert Automation",
    description: "Rule-based and anomaly-detection alerts with multi-channel notification and cooldown.",
    color: "#FFB800",
    gradient: "from-yellow-500/10 to-yellow-500/0",
    borderColor: "border-yellow-500/20",
    tag: "AUTOMATION",
  },
  {
    icon: FileText,
    label: "API & Integrations",
    description: "REST API, webhooks, and native integrations with CrowdStrike, Splunk, PagerDuty, Slack.",
    color: "#00CC58",
    gradient: "from-green-500/10 to-green-500/0",
    borderColor: "border-green-500/20",
    tag: "API",
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="relative py-32">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="text-xs font-mono text-aegis-cyan-400 uppercase tracking-[0.3em] mb-4">
            // PLATFORM CAPABILITIES
          </p>
          <h2 className="text-4xl font-bold text-foreground tracking-tight">
            Everything a modern SOC needs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From threat detection to incident closure — a complete security operations
            platform engineered for speed, accuracy, and scale.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative rounded-xl border ${feature.borderColor} bg-aegis-surface/60 p-5 transition-all duration-300 hover:bg-aegis-elevated hover:shadow-aegis-md overflow-hidden`}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Corner decorator */}
                <div className="absolute top-0 right-0 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div
                    className="absolute top-0 right-0 h-3 w-3 border-t border-r"
                    style={{ borderColor: feature.color + "50" }}
                  />
                </div>

                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: feature.color + "15", border: `1px solid ${feature.color}30` }}
                    >
                      <Icon className="size-5" style={{ color: feature.color }} />
                    </div>
                    <span
                      className="text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-full border"
                      style={{
                        color: feature.color,
                        backgroundColor: feature.color + "10",
                        borderColor: feature.color + "30",
                      }}
                    >
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{feature.label}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
