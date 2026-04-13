import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-44">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            <span className="text-balance">医師が作った、医師のための</span>
            <br />
            <span className="text-balance">Webアプリマーケット</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            臨床現場で本当に使えるツールを、現役医師が開発・公開。
            <br className="hidden sm:block" />
            ブラウザだけで動くWebアプリを見つけよう。
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="group gap-2 rounded-full px-8"
            >
              <a href="#apps">
                アプリを探す
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
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
