import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CoverFlow } from "@/components/cover-flow";
import { MarqueeBand } from "@/components/marquee-band";
import { AppGrid } from "@/components/app-grid";
import { DeveloperCTA } from "@/components/developer-cta";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import { InstallGuide } from "@/components/install-guide";
import { ReferrerWelcome } from "@/components/referrer-welcome";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ReferrerWelcome />
        <Hero />
        <MarqueeBand />
        <CoverFlow />
        <AppGrid />
        <AboutSection />
        <DeveloperCTA />
        <InstallGuide />
      </main>
      <Footer />
    </div>
  );
}
