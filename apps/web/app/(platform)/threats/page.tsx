import type { Metadata } from "next"
import { ThreatsPageHeader } from "@/components/platform/threats/threats-page-header"
import { ThreatsSummary } from "@/components/platform/threats/threats-summary"
import { ThreatsTable } from "@/components/platform/threats/threats-table"
import { ThreatsIOCPanel } from "@/components/platform/threats/threats-ioc-panel"

export const metadata: Metadata = {
  title: "Threat Intelligence",
}

export default function ThreatsPage() {
  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto">
      <ThreatsPageHeader />
      <ThreatsSummary />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8">
          <ThreatsTable />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <ThreatsIOCPanel />
        </div>
      </div>
    </div>
  )
}
