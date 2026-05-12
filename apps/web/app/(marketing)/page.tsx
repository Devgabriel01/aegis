import { HeroSection } from "@/components/marketing/hero-section"
import { StatsSection } from "@/components/marketing/stats-section"
import { FeaturesSection } from "@/components/marketing/features-section"
import { DashboardPreview } from "@/components/marketing/dashboard-preview"
import { ThreatMapSection } from "@/components/marketing/threat-map-section"
import { TerminalSection } from "@/components/marketing/terminal-section"
import { PricingSection } from "@/components/marketing/pricing-section"
import { TestimonialsSection } from "@/components/marketing/testimonials-section"
import { CtaSection } from "@/components/marketing/cta-section"
import { MarketingNav } from "@/components/marketing/marketing-nav"
import { MarketingFooter } from "@/components/marketing/marketing-footer"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <MarketingNav />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <DashboardPreview />
        <ThreatMapSection />
        <TerminalSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
      </main>
      <MarketingFooter />
    </div>
  )
}
