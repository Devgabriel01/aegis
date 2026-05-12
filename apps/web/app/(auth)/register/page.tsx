import type { Metadata } from "next"
import Link from "next/link"
import { Shield, CheckCircle2 } from "lucide-react"
import { SignUp } from "@clerk/nextjs"

export const metadata: Metadata = {
  title: "Create Account",
}

const FEATURES = [
  "14-day free trial, no credit card",
  "Full access to all features",
  "AI-powered threat analysis",
  "SOC 2 Type II compliant",
]

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-aegis-void grid-bg opacity-30" />

      {/* Left panel — value prop */}
      <div className="relative hidden lg:flex lg:flex-1 flex-col justify-center px-16 py-12">
        <div className="max-w-sm">
          <Link href="/" className="mb-8 flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aegis-blue-500/10 border border-aegis-blue-500/30">
              <Shield className="h-5 w-5 text-aegis-blue-400" />
            </div>
            <span className="text-lg font-bold tracking-[0.15em] text-foreground">AEGIS</span>
          </Link>

          <h1 className="text-3xl font-bold text-foreground leading-tight mb-4">
            Your cyber defense
            <br />
            <span className="gradient-text">command center.</span>
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-8">
            Join 1,200+ security teams protecting critical infrastructure with enterprise-grade
            threat intelligence and AI-powered analysis.
          </p>

          <div className="flex flex-col gap-3">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle2 className="size-4 text-aegis-green-400 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{f}</span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-10 rounded-xl border border-aegis bg-aegis-surface/50 p-4">
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              &ldquo;AEGIS reduced our incident response time by 85%. The AI analyst alone is worth the entire subscription.&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-aegis-blue-500/20 border border-aegis-blue-500/30 flex items-center justify-center text-xs font-bold text-aegis-blue-300">
                SC
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">Sarah Chen</p>
                <p className="text-[10px] text-muted-foreground">Head of Security · Fintech Corp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-12 border-l border-aegis">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-aegis-blue-500/10 border border-aegis-blue-500/30">
                <Shield className="h-4 w-4 text-aegis-blue-400" />
              </div>
              <span className="text-base font-bold tracking-[0.15em]">AEGIS</span>
            </Link>
          </div>

          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-foreground">Create your account</h2>
            <p className="mt-1 text-sm text-muted-foreground">Start your 14-day free trial today</p>
          </div>

          <SignUp
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
            Already have an account?{" "}
            <Link href="/login" className="text-aegis-blue-400 hover:text-aegis-blue-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
