import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. いわたつ | MedApp Market",
  description:
    "糖尿病・内分泌専門医 Dr. いわたつのプロフィール。医療アプリ・くらしのツールの開発者。",
};

const LINKS = [
  { icon: "🌐", label: "公式サイト", url: "https://driwatatsu.readdy.co" },
  { icon: "📷", label: "Instagram", url: "https://www.instagram.com/dr.iwatatsu/" },
  { icon: "𝕏", label: "X (Twitter)", url: "https://x.com/KenKyu1019799" },
  { icon: "📝", label: "note", url: "https://note.com/dr_iwatatsu" },
  { icon: "🏥", label: "MedApp Market", url: "https://medapp-market.vercel.app/" },
  { icon: "📊", label: "antaaスライド", url: "https://slide.antaa.jp/profile/mtzDnleJ6DYJ" },
];

export default function DeveloperAboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/tools"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            くらしのツールに戻る
          </Link>

          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            {/* ヘッダー */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 px-6 py-10 text-center text-white sm:px-8">
              <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-white/10 text-5xl backdrop-blur-sm">
                👨‍⚕️
              </div>
              <h1 className="mt-4 text-2xl font-bold">Dr. いわたつ</h1>
              <p className="mt-1 text-sm text-white/70">岩本 達也</p>
              <p className="mt-3 text-sm text-white/80">
                糖尿病・内分泌 専門医・指導医
              </p>
            </div>

            <div className="p-6 sm:p-8">
              {/* 自己紹介 */}
              <section>
                <h2 className="text-lg font-bold text-foreground">About</h2>
                <p className="mt-3 text-sm leading-loose text-muted-foreground">
                  糖尿病・内分泌の専門医として、日々の診療に取り組んでいます。
                  「現場で本当に使えるツールを、自分の手で作る」をモットーに、
                  医療者向けのWebアプリや、子育て中の家庭で役立つツールを開発・公開しています。
                </p>
                <p className="mt-2 text-sm leading-loose text-muted-foreground">
                  2児の父でもあり、子どもたちの「できた！」を増やすアプリづくりにも力を入れています。
                  医療もくらしも、テクノロジーでもっと良くできると信じています。
                </p>
              </section>

              {/* やっていること */}
              <section className="mt-8">
                <h2 className="text-lg font-bold text-foreground">Activities</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-border p-4">
                    <span className="text-2xl">🩺</span>
                    <h3 className="mt-2 text-sm font-bold">医療アプリ開発</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      DM Compass, InsuCalcなど、病棟・外来で使える無料ツールを多数公開
                    </p>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <span className="text-2xl">🏠</span>
                    <h3 className="mt-2 text-sm font-bold">くらしのツール</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      子どもの学習・生活習慣づくりをサポートするアプリを開発
                    </p>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <span className="text-2xl">📝</span>
                    <h3 className="mt-2 text-sm font-bold">医療情報発信</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      noteやInstagramで糖尿病の最新知見をわかりやすく発信
                    </p>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <span className="text-2xl">📊</span>
                    <h3 className="mt-2 text-sm font-bold">医学教育</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      antaaでスライドを公開し、研修医・医療者の学びをサポート
                    </p>
                  </div>
                </div>
              </section>

              {/* リンク */}
              <section className="mt-8">
                <h2 className="text-lg font-bold text-foreground">Links</h2>
                <div className="mt-4 space-y-2">
                  {LINKS.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm transition-colors hover:bg-slate-50"
                    >
                      <span className="text-lg">{link.icon}</span>
                      <span className="font-medium text-foreground">{link.label}</span>
                      <span className="ml-auto text-xs text-muted-foreground">→</span>
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
