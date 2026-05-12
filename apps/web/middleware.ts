import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/login(.*)",
  "/register(.*)",
  "/api/webhooks(.*)",
])

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

export default clerkMiddleware(async (auth, req) => {
  if (isPlatformRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
