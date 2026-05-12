"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Play, CheckCircle2, AlertTriangle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type ScanStatus = "idle" | "scanning" | "complete"

const SCAN_STEPS = [
  { id: "dns", label: "DNS Resolution", duration: 800 },
  { id: "ports", label: "Port Discovery", duration: 1600 },
  { id: "ssl", label: "SSL/TLS Analysis", duration: 1000 },
  { id: "headers", label: "HTTP Headers", duration: 700 },
  { id: "tech", label: "Tech Fingerprinting", duration: 1200 },
  { id: "cve", label: "CVE Matching", duration: 2000 },
  { id: "subdomain", label: "Subdomain Enum", duration: 1400 },
]

const MOCK_FINDINGS = [
  { severity: "critical", label: "CVE-2024-3094 — XZ Utils backdoor" },
  { severity: "high", label: "TLS 1.0/1.1 enabled" },
  { severity: "high", label: "SSH exposed on port 22" },
  { severity: "medium", label: "Missing Content-Security-Policy" },
  { severity: "medium", label: "Missing HSTS header" },
  { severity: "low", label: "Server version disclosed" },
]

const SCAN_OPTIONS = [
  { id: "full", label: "Full Scan" },
  { id: "quick", label: "Quick Scan" },
  { id: "ssl", label: "SSL Only" },
  { id: "ports", label: "Ports Only" },
]

export function VulnerabilitiesScanner() {
  const [target, setTarget] = useState("")
  const [scanType, setScanType] = useState("full")
  const [status, setStatus] = useState<ScanStatus>("idle")
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState<string | null>(null)

  const startScan = () => {
    if (!target.trim()) return
    setStatus("scanning")
    setCompletedSteps([])

    let elapsed = 0
    SCAN_STEPS.forEach((step, i) => {
      setTimeout(() => {
        setCurrentStep(step.id)
      }, elapsed)
      elapsed += step.duration
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, step.id])
      }, elapsed - 100)
    })

    setTimeout(() => {
      setCurrentStep(null)
      setStatus("complete")
    }, elapsed + 200)
  }

  return (
    <div className="hud-panel rounded-2xl border border-aegis p-5 flex flex-col gap-5">
      <div>
        <h2 className="text-sm font-semibold text-foreground">Vulnerability Scanner</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Scan domains, IPs, and web apps for security issues</p>
      </div>

      {/* Target input */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-aegis bg-aegis-surface/50 px-3 py-2.5 focus-within:border-aegis-bright transition-colors">
          <Search className="size-3.5 text-muted-foreground flex-shrink-0" />
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="example.com or 192.168.1.1"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none font-mono"
            disabled={status === "scanning"}
          />
        </div>

        {/* Scan type */}
        <div className="grid grid-cols-2 gap-1.5">
          {SCAN_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setScanType(opt.id)}
              className={cn(
                "rounded-lg px-3 py-2 text-xs font-medium transition-colors border",
                scanType === opt.id
                  ? "bg-aegis-blue-500/15 text-aegis-blue-300 border-aegis-blue-500/30"
                  : "text-muted-foreground border-aegis hover:border-aegis-bright",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <Button
          onClick={startScan}
          disabled={!target.trim() || status === "scanning"}
          loading={status === "scanning"}
          className="w-full gap-2"
          variant="premium"
        >
          {status === "scanning" ? "Scanning..." : (
            <>
              <Play className="size-3.5 fill-current" />
              Start Scan
            </>
          )}
        </Button>
      </div>

      {/* Progress steps */}
      <AnimatePresence>
        {(status === "scanning" || status === "complete") && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex flex-col gap-1.5"
          >
            <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-1">
              Scan Progress — {target}
            </p>
            {SCAN_STEPS.map((step) => {
              const done = completedSteps.includes(step.id)
              const active = currentStep === step.id
              return (
                <motion.div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors",
                    done ? "text-aegis-green-400" : active ? "text-foreground bg-aegis-blue-500/5 border border-aegis-blue-500/15" : "text-muted-foreground/40",
                  )}
                >
                  {done ? (
                    <CheckCircle2 className="size-3.5 flex-shrink-0 text-aegis-green-400" />
                  ) : active ? (
                    <Loader2 className="size-3.5 flex-shrink-0 animate-spin text-aegis-blue-400" />
                  ) : (
                    <div className="size-3.5 rounded-full border border-current flex-shrink-0" />
                  )}
                  {step.label}
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      {status === "complete" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center justify-between rounded-lg border border-aegis-critical/20 bg-aegis-critical/5 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-aegis-critical" />
              <span className="text-xs font-medium text-foreground">Scan Complete</span>
            </div>
            <span className="text-[10px] text-aegis-critical font-bold font-mono">
              {MOCK_FINDINGS.length} findings
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            {MOCK_FINDINGS.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-2.5"
              >
                <div
                  className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: f.severity === "critical" ? "#FF2D55"
                      : f.severity === "high" ? "#FF6B00"
                      : f.severity === "medium" ? "#FFB800"
                      : "#22D3EE",
                  }}
                />
                <span className="text-[11px] text-muted-foreground flex-1 truncate">{f.label}</span>
                <Badge variant={f.severity as any} className="text-[9px] py-0 flex-shrink-0">
                  {f.severity.toUpperCase()}
                </Badge>
              </motion.div>
            ))}
          </div>

          <Button variant="outline" size="sm" className="w-full" onClick={() => setStatus("idle")}>
            New Scan
          </Button>
        </motion.div>
      )}
    </div>
  )
}
