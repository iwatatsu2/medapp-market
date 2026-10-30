import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROLES } from "@/lib/types";

export function Hero() {
  return (
    <section className="surface-ink relative overflow-hidden">
      {/* 繊細なグリッド・テクスチャ（ブラーのblob装飾を廃止） */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:52px_52px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
      {/* ブランド発光（見出し背後） */}
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-50 blur-[90px]"
        style={{ background: "radial-gradient(ellipse at center, oklch(0.55 0.22 295 / 0.55), transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
            医療の現場から生まれた
            <br />
            <span className="text-brand-gradient">Webアプリマーケット</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
            臨床現場で本当に使えるツールを、現役医師が開発・公開。
            <br className="hidden sm:block" />
            ブラウザだけで動くWebアプリを見つけよう。
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild className="lift rounded-full bg-white! px-8 text-[oklch(0.23_0.03_285)]! shadow-lg hover:bg-white! active:scale-[0.98]">
              <a href="#apps">アプリを探す</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              disabled
              className="rounded-full border-white/25! bg-white/5! px-8 text-white/55! cursor-not-allowed"
            >
              開発者登録（準備中）
            </Button>
          </div>
        </div>

        {/* 職種別リンク */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-5">
          {Object.entries(ROLES).map(([key, role]) => (
            <Link
              key={key}
              href={`/for/${key}`}
              className="group flex flex-col items-center gap-2 rounded-xl border border-white/12 bg-white/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.11]"
            >
              <span className="text-3xl transition-transform duration-200 group-hover:scale-110">{role.icon}</span>
              <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                {role.label}向け
              </span>
            </Link>
          ))}
          <Link
            href="/tools"
            className="group flex flex-col items-center gap-2 rounded-xl border border-white/12 bg-primary/20 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 hover:-translate-y-0.5 hover:border-white/30 hover:bg-primary/30"
          >
            <span className="text-3xl transition-transform duration-200 group-hover:scale-110">🏠</span>
            <span className="text-sm font-medium text-slate-100 group-hover:text-white">
              くらしのツール
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
