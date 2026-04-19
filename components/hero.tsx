import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROLES } from "@/lib/types";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      {/* 装飾要素 */}
      <div className="absolute -right-32 -top-32 size-96 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-slate-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
            医療の現場から生まれた
            <br />
            Webアプリマーケット
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            臨床現場で本当に使えるツールを、現役医師が開発・公開。
            <br className="hidden sm:block" />
            ブラウザだけで動くWebアプリを見つけよう。
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild className="rounded-full bg-white px-8 text-slate-900 hover:bg-slate-100">
              <a href="#apps">アプリを探す</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full border-white/30 px-8 text-white hover:bg-white/10"
            >
              <Link href="/auth/register">開発者として登録</Link>
            </Button>
          </div>
        </div>

        {/* 職種別リンク */}
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.entries(ROLES).map(([key, role]) => (
            <Link
              key={key}
              href={`/for/${key}`}
              className="group flex flex-col items-center gap-2 rounded-lg border border-white/15 bg-white/5 p-4 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
            >
              <span className="text-3xl">{role.icon}</span>
              <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                {role.label}向け
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
