"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Building2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SettingsGeneral() {
  const [orgName, setOrgName] = useState("Acme Corp Security")
  const [domain, setDomain] = useState("acme.com")
  const [timezone, setTimezone] = useState("America/Sao_Paulo")
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="hud-panel rounded-2xl border border-aegis"
    >
      <div className="flex items-center gap-3 p-4 border-b border-aegis">
        <Building2 className="size-4 text-muted-foreground" />
        <div>
          <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">// ORGANIZATION</p>
          <h3 className="text-sm font-semibold text-foreground">General Settings</h3>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {[
          { label: "Organization Name", value: orgName, setter: setOrgName, placeholder: "Acme Corp Security" },
          { label: "Primary Domain", value: domain, setter: setDomain, placeholder: "acme.com" },
          { label: "Timezone", value: timezone, setter: setTimezone, placeholder: "UTC" },
        ].map(({ label, value, setter, placeholder }) => (
          <div key={label}>
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
            <input
              value={value}
              onChange={(e) => setter(e.target.value)}
              placeholder={placeholder}
              className="mt-1.5 w-full rounded-lg border border-aegis bg-aegis-surface/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-aegis-blue-500/50 transition-colors"
            />
          </div>
        ))}

        <Button
          variant={saved ? "outline" : "default"}
          size="sm"
          className="gap-1.5 mt-2"
          onClick={handleSave}
        >
          <Save className="size-3" />
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>
    </motion.div>
  )
}
