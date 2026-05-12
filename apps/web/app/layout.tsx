import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { QueryProvider } from "@/components/providers/query-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "AEGIS — Cyber Defense Command Center",
    template: "%s | AEGIS",
  },
  description:
    "Enterprise-grade threat intelligence and security operations platform for modern infrastructure.",
  keywords: [
    "cybersecurity",
    "threat intelligence",
    "SIEM",
    "SOC",
    "incident response",
    "vulnerability management",
    "enterprise security",
  ],
  authors: [{ name: "AEGIS Security" }],
  creator: "AEGIS Security",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://aegis.security"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "AEGIS — Cyber Defense Command Center",
    description: "Enterprise-grade threat intelligence and security operations platform.",
    siteName: "AEGIS",
  },
  twitter: {
    card: "summary_large_image",
    title: "AEGIS — Cyber Defense Command Center",
    description: "Enterprise-grade threat intelligence and security operations platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#03030A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
}

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const inner = (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  )

  if (!clerkKey) return inner

  return (
    <ClerkProvider
      publishableKey={clerkKey}
      appearance={{
        variables: {
          colorPrimary: "#1A6ED4",
          colorBackground: "#07070F",
          colorInputBackground: "#0D0D1A",
          colorInputText: "#E2E8F0",
          colorText: "#CBD5E1",
          borderRadius: "8px",
          fontFamily: "var(--font-inter)",
        },
      }}
    >
      {inner}
    </ClerkProvider>
  )
}
