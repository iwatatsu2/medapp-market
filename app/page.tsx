import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CoverFlow } from "@/components/cover-flow";
import { AppGrid } from "@/components/app-grid";
import { DeveloperCTA } from "@/components/developer-cta";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import { InstallGuide } from "@/components/install-guide";

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
        {/* くらしのツール導線 */}
        <section className="bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Link
              href="/tools"
              className="flex items-center justify-between rounded-xl border border-emerald-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">🏠</span>
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    くらしのツール
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    医師の暮らしから生まれた子育て・生活便利ツール
                  </p>
                </div>
              </div>
              <ArrowRight className="size-5 text-emerald-600" />
            </Link>
          </div>
        </section>
        <InstallGuide />
      </main>
      <Footer />
    </div>
  );
}
