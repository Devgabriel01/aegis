"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Shield, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Product", href: "#features", children: [
    { label: "Dashboard", desc: "Cyber defense command center", href: "#features" },
    { label: "Threat Intelligence", desc: "IOC tracking & analysis", href: "#features" },
    { label: "SIEM Light", desc: "Log ingestion & correlation", href: "#features" },
    { label: "Vulnerability Scanner", desc: "Automated security assessment", href: "#features" },
    { label: "Incident Response", desc: "SOC-grade case management", href: "#features" },
  ]},
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#" },
  { label: "Blog", href: "#" },
]

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 20))

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-aegis bg-aegis-void/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-aegis-blue-500/10 border border-aegis-blue-500/30 transition-all duration-300 group-hover:border-aegis-blue-400/60 group-hover:bg-aegis-blue-500/15">
            <Shield className="h-4 w-4 text-aegis-blue-400" />
            <div className="absolute inset-0 rounded-lg bg-aegis-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
          </div>
          <span className="text-base font-bold tracking-[0.15em] text-foreground">AEGIS</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <div key={link.label} className="relative">
              {link.children ? (
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-aegis-elevated"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {link.label}
                  <ChevronDown className={cn("size-3.5 transition-transform", activeDropdown === link.label && "rotate-180")} />
                </button>
              ) : (
                <Link
                  href={link.href}
                  className="flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-aegis-elevated"
                >
                  {link.label}
                </Link>
              )}

              {link.children && activeDropdown === link.label && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-1 w-72 rounded-xl border border-aegis bg-aegis-surface/95 backdrop-blur-xl shadow-aegis-lg p-2"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 hover:bg-aegis-elevated transition-colors"
                    >
                      <span className="text-sm font-medium text-foreground">{child.label}</span>
                      <span className="text-xs text-muted-foreground">{child.desc}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/register">
            <Button variant="premium" size="sm" className="gap-2">
              <Shield className="size-3.5" />
              Start Free Trial
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-aegis-elevated"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-aegis bg-aegis-void/95 backdrop-blur-xl"
        >
          <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-aegis mt-2">
              <Link href="/login">
                <Button variant="outline" className="w-full">Sign in</Button>
              </Link>
              <Link href="/register">
                <Button variant="default" className="w-full">Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
