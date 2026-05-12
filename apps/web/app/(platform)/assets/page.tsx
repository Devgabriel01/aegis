import type { Metadata } from "next"
import { AssetsHeader } from "@/components/platform/assets/assets-header"
import { AssetsSummary } from "@/components/platform/assets/assets-summary"
import { AssetsTable } from "@/components/platform/assets/assets-table"
import { AssetsMap } from "@/components/platform/assets/assets-map"

export const metadata: Metadata = {
  title: "Assets",
}

export default function AssetsPage() {
  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto">
      <AssetsHeader />
      <AssetsSummary />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8">
          <AssetsTable />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <AssetsMap />
        </div>
      </div>
    </div>
  )
}
