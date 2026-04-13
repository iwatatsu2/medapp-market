import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl">
            医師が作った、医師のための
            <br />
            Webアプリマーケット
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            臨床現場で本当に使えるツールを、現役医師が開発・公開。
            <br className="hidden sm:block" />
            ブラウザだけで動くWebアプリを見つけよう。
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild className="rounded-full px-8">
              <a href="#apps">アプリを探す</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full px-8"
            >
              <Link href="/auth/register">開発者として登録</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
