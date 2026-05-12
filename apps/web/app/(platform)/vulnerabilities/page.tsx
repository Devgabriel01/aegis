import type { Metadata } from "next"
import { VulnerabilitiesHeader } from "@/components/platform/vulnerabilities/vulnerabilities-header"
import { VulnerabilitiesSummary } from "@/components/platform/vulnerabilities/vulnerabilities-summary"
import { VulnerabilitiesScanner } from "@/components/platform/vulnerabilities/vulnerabilities-scanner"
import { VulnerabilitiesTable } from "@/components/platform/vulnerabilities/vulnerabilities-table"

export const metadata: Metadata = {
  title: "Vulnerability Scanner",
}

export default function VulnerabilitiesPage() {
  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto">
      <VulnerabilitiesHeader />
      <VulnerabilitiesSummary />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-4">
          <VulnerabilitiesScanner />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <VulnerabilitiesTable />
        </div>
      </div>
    </div>
  )
}
