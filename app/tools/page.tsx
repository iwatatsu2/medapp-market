import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEED_TOOLS } from "@/lib/seed-tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "くらしのツール | MedApp Market",
  description:
    "医師の暮らしから生まれた便利ツール。子育て・生活に役立つWebアプリを無料で公開しています。",
};

export default function ToolsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* ヒーロー */}
        <section className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              トップに戻る
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-5xl">🏠</span>
              <div>
                <h1 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                  くらしのツール
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                  医師の暮らしから生まれた便利ツール。
                  <br />
                  子育て・日常生活に役立つWebアプリを無料で公開しています。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ツール一覧 */}
        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SEED_TOOLS.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`bg-gradient-to-br ${tool.color} flex items-center justify-center py-8`}
                  >
                    <span className="text-6xl">{tool.emoji}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-foreground">
                        {tool.name}
                      </h3>
                      <ExternalLink className="mt-0.5 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">
                      {tool.tagline}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {SEED_TOOLS.length <= 1 && (
              <p className="mt-8 text-center text-sm text-muted-foreground">
                今後もツールを追加予定です。お楽しみに！
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
