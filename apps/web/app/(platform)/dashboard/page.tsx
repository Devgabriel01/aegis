import type { Metadata } from "next"
import { DashboardMetrics } from "@/components/platform/dashboard/dashboard-metrics"
import { DashboardThreatFeed } from "@/components/platform/dashboard/dashboard-threat-feed"
import { DashboardIncidents } from "@/components/platform/dashboard/dashboard-incidents"
import { DashboardChart } from "@/components/platform/dashboard/dashboard-chart"
import { DashboardAssetStatus } from "@/components/platform/dashboard/dashboard-asset-status"
import { DashboardSecurityScore } from "@/components/platform/dashboard/dashboard-security-score"
import { DashboardPageHeader } from "@/components/platform/dashboard/dashboard-page-header"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto">
      <DashboardPageHeader />

      {/* KPI Metrics row */}
      <DashboardMetrics />

      {/* Main grid */}
      <div className="grid grid-cols-12 gap-5">
        {/* Security score + asset status */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-5">
          <DashboardSecurityScore />
          <DashboardAssetStatus />
        </div>

        {/* Chart + incidents */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-5">
          <DashboardChart />
          <DashboardIncidents />
        </div>

        {/* Threat feed */}
        <div className="col-span-12 lg:col-span-4">
          <DashboardThreatFeed />
        </div>
      </div>
    </div>
  )
}
