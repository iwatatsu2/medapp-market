import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, AppWindow } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { createClient } from "@/lib/supabase/server";
import { SEED_TOOLS } from "@/lib/seed-tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "くらしのツール | MedApp Market",
  description:
    "医師の暮らしから生まれた便利ツール。子育て・生活に役立つWebアプリを無料で公開しています。",
};

export default async function ToolsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("apps")
    .select("*")
    .eq("is_published", true)
    .eq("is_tool", true)
    .order("created_at", { ascending: false });

  const dbApps = data ?? [];
  // Merge with seed tools (fallback if not in DB)
  const dbSlugs = new Set(dbApps.map((a) => a.slug));
  const seedOnly = SEED_TOOLS.filter((t) => !dbSlugs.has(t.slug));

  const allTools = [
    ...dbApps.map((a) => ({
      slug: a.slug as string,
      name: a.name as string,
      tagline: a.tagline as string,
      thumbnail_url: a.thumbnail_url as string | null,
      tags: ["無料"],
    })),
    ...seedOnly.map((t) => ({
      slug: t.slug,
      name: t.name,
      tagline: t.tagline,
      thumbnail_url: null,
      tags: t.tags,
    })),
  ];

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

        {/* 開発者紹介バナー */}
        <section className="bg-emerald-50">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/about/developer"
              className="flex items-center gap-3 text-sm text-emerald-700 transition-colors hover:text-emerald-900"
            >
              <span className="text-lg">👨‍⚕️</span>
              <span>開発者 <strong>Dr. いわたつ</strong>（糖尿病専門医）について →</span>
            </Link>
          </div>
        </section>

        {/* ツール一覧 */}
        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/apps/${tool.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-emerald-100 to-teal-100">
                    {tool.thumbnail_url ? (
                      <Image
                        src={tool.thumbnail_url}
                        alt={tool.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <AppWindow className="size-16 text-emerald-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-foreground">
                      {tool.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tool.tagline}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
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

            {allTools.length === 0 && (
              <p className="text-center text-sm text-muted-foreground">
                準備中です。お楽しみに！
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
