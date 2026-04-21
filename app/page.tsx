import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CoverFlow } from "@/components/cover-flow";
import { AppGrid } from "@/components/app-grid";
import { DeveloperCTA } from "@/components/developer-cta";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <CoverFlow />
        <AppGrid />
        <AboutSection />
        <DeveloperCTA />
      </main>
      <Footer />
    </div>
  );
}
