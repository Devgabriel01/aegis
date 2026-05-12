import type { Metadata } from "next"
import { ReportsHeader } from "@/components/platform/reports/reports-header"
import { ReportsTemplates } from "@/components/platform/reports/reports-templates"
import { ReportsList } from "@/components/platform/reports/reports-list"

export const metadata: Metadata = {
  title: "Reports",
}

export default function ReportsPage() {
  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto">
      <ReportsHeader />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-4">
          <ReportsTemplates />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <ReportsList />
        </div>
      </div>
    </div>
  )
}
