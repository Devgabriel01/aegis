"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Key, Plus, Copy, Trash2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const API_KEYS = [
  { id: "k1", name: "Production Integration", prefix: "ak_prod_", suffix: "7f3a...9c2b", created: "Jan 15, 2026", lastUsed: "2m ago", scopes: ["read:threats", "write:incidents"] },
  { id: "k2", name: "CI/CD Pipeline", prefix: "ak_prod_", suffix: "2e1d...4f8a", created: "Mar 3, 2026", lastUsed: "1h ago", scopes: ["read:vulns", "read:assets"] },
  { id: "k3", name: "Monitoring Script", prefix: "ak_prod_", suffix: "8b5c...1d3e", created: "Apr 22, 2026", lastUsed: "Yesterday", scopes: ["read:threats"] },
]

export function SettingsApiKeys() {
  const [revealed, setRevealed] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  function handleCopy(id: string) {
    setCopied(id)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="hud-panel rounded-2xl border border-aegis"
    >
      <div className="flex items-center justify-between p-4 border-b border-aegis">
        <div className="flex items-center gap-3">
          <Key className="size-4 text-muted-foreground" />
          <div>
            <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">// API KEYS</p>
            <h3 className="text-sm font-semibold text-foreground">API Access Keys</h3>
          </div>
        </div>
        <Button variant="outline" size="xs" className="gap-1">
          <Plus className="size-3" />
          New Key
        </Button>
      </div>

      <div className="divide-y divide-aegis/50">
        {API_KEYS.map((key, i) => (
          <motion.div
            key={key.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.07 }}
            className="group p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm font-medium text-foreground">{key.name}</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-aegis bg-aegis-surface/50 px-3 py-1.5 font-mono text-[10px] text-aegis-cyan-400 w-fit">
                  {key.prefix}
                  <span className="text-muted-foreground/60">
                    {revealed === key.id ? "•••••••••••••••" : key.suffix}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[9px] text-muted-foreground">Created {key.created}</span>
                  <span className="text-[9px] text-muted-foreground/50">·</span>
                  <span className="text-[9px] text-muted-foreground">Last used {key.lastUsed}</span>
                </div>
                <div className="flex gap-1 mt-2">
                  {key.scopes.map((scope) => (
                    <span key={scope} className="text-[9px] px-1.5 py-0.5 rounded-full bg-aegis-blue-500/10 border border-aegis-blue-500/20 text-aegis-blue-400 font-mono">
                      {scope}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setRevealed(revealed === key.id ? null : key.id)}
                >
                  {revealed === key.id ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => handleCopy(key.id)}
                  className={cn(copied === key.id && "text-aegis-green-400")}
                >
                  <Copy className="size-3" />
                </Button>
                <Button variant="ghost" size="icon-xs" className="hover:text-aegis-critical">
                  <Trash2 className="size-3" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
