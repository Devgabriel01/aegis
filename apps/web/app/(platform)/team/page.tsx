import type { Metadata } from "next"
import { TeamHeader } from "@/components/platform/team/team-header"
import { TeamMembers } from "@/components/platform/team/team-members"
import { TeamInvitations } from "@/components/platform/team/team-invitations"

export const metadata: Metadata = {
  title: "Team",
}

export default function TeamPage() {
  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto">
      <TeamHeader />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8">
          <TeamMembers />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <TeamInvitations />
        </div>
      </div>
    </div>
  )
}
