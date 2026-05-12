import { PlatformSidebar } from "@/components/platform/platform-sidebar"
import { PlatformTopbar } from "@/components/platform/platform-topbar"

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-aegis-void">
      <PlatformSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PlatformTopbar />
        <main className="flex-1 overflow-y-auto custom-scroll">
          <div className="h-full p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
