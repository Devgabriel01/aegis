import Link from "next/link"
import { Shield } from "lucide-react"

const FOOTER_LINKS = {
  Product: ["Dashboard", "Threat Intelligence", "Vulnerability Scanner", "SIEM", "Incident Response", "Asset Management"],
  Company: ["About", "Blog", "Careers", "Press", "Security"],
  Resources: ["Documentation", "API Reference", "Status", "Changelog", "Community"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "SOC 2"],
}

export function MarketingFooter() {
  return (
    <footer className="relative border-t border-aegis bg-aegis-surface/20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-aegis-blue-500/10 border border-aegis-blue-500/30">
                <Shield className="h-4 w-4 text-aegis-blue-400" />
              </div>
              <span className="text-sm font-bold tracking-[0.15em]">AEGIS</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Enterprise-grade cyber defense platform for modern infrastructure.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-aegis-green-400" />
              <span className="text-[10px] text-muted-foreground font-mono">All systems operational</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-aegis pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AEGIS Security, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground font-mono">SOC 2 Type II</span>
            <span className="text-xs text-muted-foreground font-mono">ISO 27001</span>
            <span className="text-xs text-muted-foreground font-mono">GDPR</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
