import type { Metadata } from "next"
import { BillingHeader } from "@/components/platform/billing/billing-header"
import { BillingPlan } from "@/components/platform/billing/billing-plan"
import { BillingUsage } from "@/components/platform/billing/billing-usage"
import { BillingHistory } from "@/components/platform/billing/billing-history"

export const metadata: Metadata = {
  title: "Billing",
}

export default function BillingPage() {
  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto">
      <BillingHeader />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-5">
          <BillingPlan />
        </div>
        <div className="col-span-12 lg:col-span-7">
          <BillingUsage />
        </div>
      </div>
      <BillingHistory />
    </div>
  )
}
