import { notFound } from "next/navigation";
import Link from "next/link";
import { AppWindow, ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEED_APPS } from "@/lib/seed-apps";

export function generateStaticParams() {
  return SEED_APPS.map((app) => ({ slug: app.slug }));
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = SEED_APPS.find((a) => a.slug === slug);
  if (!app) notFound();

  const isFree = app.price === 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/#apps"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            アプリ一覧に戻る
          </Link>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex aspect-video items-center justify-center rounded-2xl bg-card">
                <AppWindow className="size-20 text-muted-foreground/30" />
              </div>

              <div className="mt-10">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-serif text-3xl font-medium text-foreground sm:text-4xl">
                    {app.name}
                  </h1>
                  <Badge variant="secondary" className="rounded-full">
                    {app.category}
                  </Badge>
                </div>
                <p className="mt-3 text-lg text-muted-foreground">
                  {app.tagline}
                </p>

                <div className="mt-10">
                  <h2 className="font-serif text-xl font-medium text-foreground">
                    説明
                  </h2>
                  <p className="mt-4 whitespace-pre-wrap leading-relaxed text-muted-foreground">
                    {app.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="rounded-2xl bg-card p-6">
                  <div className="mb-6 text-center">
                    <span className="font-serif text-4xl font-medium text-foreground">
                      {isFree ? "無料" : `¥${app.price.toLocaleString()}`}
                    </span>
                  </div>

                  {app.demo_url ? (
                    <Button className="w-full rounded-full" size="lg" asChild>
                      <a
                        href={app.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {isFree ? "アプリを開く" : "デモを試す"}
                      </a>
                    </Button>
                  ) : (
                    <Button className="w-full rounded-full" size="lg">
                      {isFree ? "アプリを開く" : "購入する"}
                    </Button>
                  )}

                  <div className="mt-8 space-y-4 border-t border-border/50 pt-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">カテゴリ</span>
                      <span className="font-medium text-foreground">
                        {app.category}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">開発者</span>
                      <span className="font-medium text-foreground">
                        {app.developer_name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">専門</span>
                      <span className="font-medium text-foreground">
                        {app.developer_specialty}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">種類</span>
                      <span className="font-medium text-foreground">
                        Webアプリ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
