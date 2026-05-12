import type { Metadata } from "next"
import { IncidentsHeader } from "@/components/platform/incidents/incidents-header"
import { IncidentsSummary } from "@/components/platform/incidents/incidents-summary"
import { IncidentsKanban } from "@/components/platform/incidents/incidents-kanban"

export const metadata: Metadata = {
  title: "Incident Response",
}

export default function IncidentsPage() {
  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto">
      <IncidentsHeader />
      <IncidentsSummary />
      <IncidentsKanban />
    </div>
  )
}
