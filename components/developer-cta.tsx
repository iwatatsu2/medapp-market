import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function DeveloperCTA() {
  return (
    <section id="developer" className="bg-card">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            <span className="text-balance">
              あなたのアプリも公開しませんか?
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            医師が作ったWebアプリを登録して、全国の医師に届けましょう。
            アプリストアの審査不要。Webアプリなら今すぐ公開できます。
          </p>
          <div className="mt-10">
            <Button
              size="lg"
              variant="outline"
              className="group gap-2 rounded-full px-8"
              asChild
            >
              <Link href="/auth/register">
                開発者として登録する
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
