import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const isPlatformRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/threats(.*)",
  "/vulnerabilities(.*)",
  "/incidents(.*)",
  "/assets(.*)",
  "/siem(.*)",
  "/reports(.*)",
  "/team(.*)",
  "/billing(.*)",
  "/settings(.*)",
])

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

// When Clerk is not configured, pass through all requests
function bypassMiddleware(_req: NextRequest) {
  return NextResponse.next()
}

export default clerkKey
  ? clerkMiddleware(async (auth, req) => {
      if (isPlatformRoute(req)) {
        await auth.protect()
      }
    })
  : bypassMiddleware

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
