import type { Metadata } from "next"
import { SettingsHeader } from "@/components/platform/settings/settings-header"
import { SettingsGeneral } from "@/components/platform/settings/settings-general"
import { SettingsIntegrations } from "@/components/platform/settings/settings-integrations"
import { SettingsApiKeys } from "@/components/platform/settings/settings-api-keys"
import { SettingsNotifications } from "@/components/platform/settings/settings-notifications"

export const metadata: Metadata = {
  title: "Settings",
}

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-screen-xl mx-auto">
      <SettingsHeader />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-6 space-y-5">
          <SettingsGeneral />
          <SettingsNotifications />
        </div>
        <div className="col-span-12 lg:col-span-6 space-y-5">
          <SettingsIntegrations />
          <SettingsApiKeys />
        </div>
      </div>
    </div>
  )
}
