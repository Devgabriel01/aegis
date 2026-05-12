"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Terminal } from "lucide-react"

const TERMINAL_LINES = [
  { delay: 0, text: "$ aegis scan --target api.example.com --full", type: "command" },
  { delay: 0.8, text: "[*] Initializing AEGIS Vulnerability Scanner v2.1.4", type: "info" },
  { delay: 1.4, text: "[*] Resolving DNS records for api.example.com...", type: "info" },
  { delay: 2.0, text: "[+] A Record: 104.21.45.67  TTL: 300", type: "success" },
  { delay: 2.4, text: "[+] MX Record: mail.example.com  Priority: 10", type: "success" },
  { delay: 2.8, text: "[*] Running port scan on 104.21.45.67 (top 1000 ports)...", type: "info" },
  { delay: 3.6, text: "[+] Open ports: 22/tcp, 80/tcp, 443/tcp, 8443/tcp", type: "success" },
  { delay: 4.2, text: "[!] WARNING: Port 22 (SSH) exposed to internet", type: "warning" },
  { delay: 4.8, text: "[*] Analyzing SSL/TLS configuration on port 443...", type: "info" },
  { delay: 5.4, text: "[+] TLS 1.3 supported", type: "success" },
  { delay: 5.7, text: "[!] WARNING: TLS 1.0 still enabled — DEPRECATED", type: "warning" },
  { delay: 6.2, text: "[*] Checking HTTP security headers...", type: "info" },
  { delay: 6.8, text: "[✗] MISSING: Content-Security-Policy", type: "error" },
  { delay: 7.1, text: "[✗] MISSING: X-Frame-Options", type: "error" },
  { delay: 7.4, text: "[✗] MISSING: Strict-Transport-Security", type: "error" },
  { delay: 7.9, text: "[*] Checking for CVE matches in identified technologies...", type: "info" },
  { delay: 8.6, text: "[✗] CRITICAL: CVE-2024-3094 — XZ Utils backdoor (CVSS 10.0)", type: "critical" },
  { delay: 9.2, text: "[!] HIGH: CVE-2024-1086 — Linux kernel privilege escalation (CVSS 7.8)", type: "error" },
  { delay: 9.8, text: "─────────────────────────────────────────────────────────────", type: "separator" },
  { delay: 10.2, text: "[AEGIS] Scan complete. Findings: 1 CRITICAL · 2 HIGH · 3 MEDIUM", type: "result" },
  { delay: 10.6, text: "[AEGIS] AI Risk Score: 87/100 — IMMEDIATE ACTION REQUIRED", type: "result" },
  { delay: 11.0, text: "[AEGIS] Full report available at: aegis.security/reports/scan_a7f3k", type: "result" },
  { delay: 11.5, text: "$ _", type: "command" },
]

const lineColors: Record<string, string> = {
  command: "#E2E8F0",
  info: "#94A3B8",
  success: "#00CC58",
  warning: "#FFB800",
  error: "#FF6B00",
  critical: "#FF2D55",
  separator: "#334155",
  result: "#22D3EE",
}

export function TerminalSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (!inView) return
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay * 1000)
    })
  }, [inView])

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-aegis-surface/20" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-mono text-aegis-cyan-400 uppercase tracking-[0.3em] mb-4">
              // VULNERABILITY SCANNER
            </p>
            <h2 className="text-4xl font-bold text-foreground tracking-tight">
              Security assessment
              <br />
              <span className="gradient-text-blue">in seconds.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Run comprehensive scans on any domain, IP, or asset. AEGIS automatically
              discovers open ports, misconfigured SSL, missing headers, CVE matches,
              and exposed services — then uses AI to prioritize what matters most.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {[
                "Port scanning with service detection",
                "SSL/TLS configuration analysis",
                "HTTP security headers audit",
                "CVE matching against 200K+ vulnerabilities",
                "Subdomain enumeration",
                "AI-powered risk scoring",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-aegis-cyan-400 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Terminal glow */}
            <div className="absolute -inset-4 bg-aegis-cyan-glow/5 rounded-2xl blur-xl" />

            <div className="relative rounded-xl border border-aegis overflow-hidden shadow-aegis-lg">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-aegis-elevated border-b border-aegis">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 flex items-center justify-center gap-2">
                  <Terminal className="size-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-mono">aegis — scanner</span>
                </div>
              </div>

              {/* Terminal body */}
              <div className="bg-[#020408] p-5 h-80 overflow-y-auto custom-scroll font-mono text-xs leading-relaxed">
                {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    className="mb-0.5"
                    style={{ color: lineColors[line.type] ?? "#94A3B8" }}
                  >
                    {line.type === "command" && line.text.endsWith("_") ? (
                      <span>
                        {line.text.slice(0, -1)}
                        <span className="animate-blink">█</span>
                      </span>
                    ) : (
                      line.text
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
