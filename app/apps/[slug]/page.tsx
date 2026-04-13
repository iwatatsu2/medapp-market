import { notFound } from "next/navigation";
import Link from "next/link";
import { AppWindow, ArrowLeft, ExternalLink } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
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
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/#apps"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            アプリ一覧に戻る
          </Link>

          {/* メインカード */}
          <div className="overflow-hidden rounded-lg border border-border bg-white">
            {/* サムネイル */}
            <div className="flex aspect-[2/1] items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
              <AppWindow className="size-20 text-primary/20" />
            </div>

            <div className="p-6 sm:p-8">
              {/* タイトル行 */}
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                  {app.name}
                </h1>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  {isFree ? "無料" : `¥${app.price.toLocaleString()}`}
                </span>
              </div>

              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {app.tagline}
              </p>

              {/* メタ情報 */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>カテゴリ：{app.category}</span>
                <span>開発者：{app.developer_name}</span>
                <span>専門：{app.developer_specialty}</span>
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-wrap gap-3">
                {app.demo_url ? (
                  <Button size="lg" className="gap-2 rounded-full px-8" asChild>
                    <a
                      href={app.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {isFree ? "アプリを開く" : "デモを試す"}
                      <ExternalLink className="size-4" />
                    </a>
                  </Button>
                ) : (
                  <Button size="lg" className="rounded-full px-8">
                    {isFree ? "アプリを開く" : "購入する"}
                  </Button>
                )}
              </div>

              {/* 説明 */}
              <div className="mt-8 border-t border-border pt-6">
                <h2 className="text-lg font-bold text-foreground">説明</h2>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-loose text-muted-foreground">
                  {app.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
