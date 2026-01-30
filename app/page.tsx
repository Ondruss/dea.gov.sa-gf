import { GovBanner } from "@/components/dea/gov-banner"
import { Header } from "@/components/dea/header"
import { HeroBanner } from "@/components/dea/hero-banner"
import { QuoteSection } from "@/components/dea/quote-section"
import { DrugStats } from "@/components/dea/drug-stats"
import { AboutSection } from "@/components/dea/about-section"
import { FeaturedResources } from "@/components/dea/featured-resources"
import { NewsSection } from "@/components/dea/news-section"
import { MostWanted } from "@/components/dea/most-wanted"
import { Footer } from "@/components/dea/footer"
import { AdminPanel } from "@/components/dea/admin-panel"

export default function DEAHomePage() {
  return (
    <main className="min-h-screen">
      <GovBanner />
      <Header />
      <HeroBanner />
      <QuoteSection />
      <DrugStats />
      <AboutSection />
      <FeaturedResources />
      <NewsSection />
      <MostWanted />
      <Footer />
      <AdminPanel />
    </main>
  )
}
