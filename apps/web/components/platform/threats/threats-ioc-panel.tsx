"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Shield, MapPin, Globe, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { isValidIp, isValidDomain } from "@/lib/utils"

const MOCK_LOOKUP = {
  ioc: "185.234.219.87",
  type: "IP",
  country: "Russia",
  flag: "🇷🇺",
  asn: "AS50304 — Belpak",
  reputation: 96,
  maliciousCount: 847,
  firstSeen: "2023-11-14",
  lastSeen: "2024-01-06",
  tags: ["APT", "C2", "Malware Hosting"],
  associatedMalware: ["Cobalt Strike", "Mimikatz", "Emotet"],
  blacklists: ["VirusTotal", "AbuseIPDB", "Shodan", "AlienVault OTX"],
}

export function ThreatsIOCPanel() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<typeof MOCK_LOOKUP | null>(null)

  const handleLookup = () => {
    if (!query.trim()) return
    setLoading(true)
    setTimeout(() => {
      setResult(MOCK_LOOKUP)
      setLoading(false)
    }, 1200)
  }

  return (
    <div className="hud-panel rounded-2xl border border-aegis p-5 flex flex-col gap-4">
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-1">IOC Lookup</h2>
        <p className="text-xs text-muted-foreground">Check reputation of any IP, domain, URL, or file hash</p>
      </div>

      {/* Search input */}
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 rounded-lg border border-aegis bg-aegis-surface/50 px-3 py-2">
          <Search className="size-3.5 text-muted-foreground flex-shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLookup()}
            placeholder="IP, domain, hash, URL..."
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none font-mono"
          />
        </div>
        <Button size="sm" onClick={handleLookup} loading={loading}>
          Scan
        </Button>
      </div>

      {/* Result */}
      {loading && (
        <div className="flex flex-col gap-3">
          {[80, 60, 90, 70].map((w, i) => (
            <div key={i} className="h-3 rounded shimmer" style={{ width: `${w}%` }} />
          ))}
        </div>
      )}

      {result && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          {/* IOC header */}
          <div className="rounded-xl border border-aegis-critical/20 bg-aegis-critical/5 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="size-5 text-aegis-critical flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono text-aegis-cyan-400 truncate">{result.ioc}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{result.type} · {result.country} {result.flag}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold font-display text-aegis-critical">{result.reputation}</div>
                <div className="text-[9px] text-muted-foreground uppercase tracking-wider">Risk Score</div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-2.5 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="size-3.5 flex-shrink-0" />
              <span>{result.asn}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="size-3.5 flex-shrink-0" />
              <span>{result.maliciousCount.toLocaleString()} malicious reports</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-3.5 flex-shrink-0" />
              <span>Last seen {result.lastSeen}</span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-2">Tags</p>
            <div className="flex flex-wrap gap-1.5">
              {result.tags.map((tag) => (
                <Badge key={tag} variant="critical" className="text-[10px]">{tag}</Badge>
              ))}
            </div>
          </div>

          {/* Malware */}
          <div>
            <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-2">Associated Malware</p>
            <div className="flex flex-col gap-1.5">
              {result.associatedMalware.map((m) => (
                <div key={m} className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-aegis-critical" />
                  <span className="text-xs font-mono text-foreground">{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Blacklists */}
          <div>
            <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-2">
              Blacklisted on {result.blacklists.length} feeds
            </p>
            <div className="flex flex-wrap gap-1.5">
              {result.blacklists.map((bl) => (
                <span
                  key={bl}
                  className="text-[9px] font-medium px-1.5 py-0.5 rounded-full border border-aegis-silver-700 bg-aegis-silver-800 text-aegis-silver-400"
                >
                  {bl}
                </span>
              ))}
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full mt-1">
            Create Incident from IOC
          </Button>
        </motion.div>
      )}

      {!result && !loading && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Shield className="size-10 text-muted-foreground/20 mb-3" />
          <p className="text-xs text-muted-foreground">Enter an IP, domain, URL or file hash to check its reputation</p>
        </div>
      )}
    </div>
  )
}
