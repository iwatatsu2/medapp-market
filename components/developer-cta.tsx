import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function DeveloperCTA() {
  return (
    <section id="developer" className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-indigo-900">
      <div className="absolute -right-24 -top-24 size-64 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            あなたのアプリも公開しませんか？
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            医療の現場から生まれたWebアプリを登録して、全国の医療者に届けましょう。
            <br className="hidden sm:block" />
            アプリストアの審査不要。Webアプリなら今すぐ公開できます。
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="group gap-2 rounded-full bg-white px-8 text-slate-900 hover:bg-slate-100"
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
