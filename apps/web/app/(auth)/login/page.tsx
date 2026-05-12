export const dynamic = "force-dynamic"

import type { Metadata } from "next"
import Link from "next/link"
import { Shield } from "lucide-react"
import { SignIn } from "@clerk/nextjs"

export const metadata: Metadata = {
  title: "Sign In",
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-aegis-void grid-bg opacity-40" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(26,110,212,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Animated scan line */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-aegis-blue-400/30 to-transparent animate-scan pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="mb-4 flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aegis-blue-500/10 border border-aegis-blue-500/30 transition-all group-hover:border-aegis-blue-400/60">
              <Shield className="h-5 w-5 text-aegis-blue-400" />
            </div>
            <span className="text-lg font-bold tracking-[0.15em] text-foreground">AEGIS</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your security command center</p>
        </div>

        {/* Clerk SignIn component */}
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-aegis-surface border border-aegis shadow-aegis-lg rounded-2xl",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "border border-aegis bg-aegis-elevated hover:bg-aegis-overlay transition-colors text-foreground",
              formFieldInput: "bg-aegis-surface border-aegis text-foreground placeholder:text-muted-foreground focus:border-aegis-bright",
              formButtonPrimary: "bg-aegis-blue-500 hover:bg-aegis-blue-400 text-white",
              footerActionLink: "text-aegis-blue-400 hover:text-aegis-blue-300",
              dividerLine: "bg-aegis",
              dividerText: "text-muted-foreground text-xs",
            },
          }}
          redirectUrl="/dashboard"
        />

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-aegis-blue-400 hover:text-aegis-blue-300 transition-colors">
            Start free trial
          </Link>
        </p>
      </div>
    </div>
  )
}
