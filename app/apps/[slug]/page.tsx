import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AppWindow, ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PurchaseButton } from "@/components/purchase-button";
import { createClient } from "@/lib/supabase/server";
import { SEED_APPS } from "@/lib/seed-apps";

async function getApp(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("apps")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (data) {
    return {
      ...data,
      developer_name: "開発者",
      developer_specialty: "",
    };
  }

  return SEED_APPS.find((a) => a.slug === slug) ?? null;
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = await getApp(slug);
  if (!app) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let purchased = false;
  if (user && app.price > 0 && "id" in app) {
    const { data } = await supabase
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("app_id", app.id)
      .single();
    purchased = !!data;
  }

  const isFree = app.price === 0;
  const thumbnailUrl = "thumbnail_url" in app ? app.thumbnail_url : null;
  const screenshots = "screenshots" in app ? (app.screenshots as string[]) : [];

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

          <div className="overflow-hidden rounded-lg border border-border bg-white">
            <div className="relative aspect-[2/1] bg-gradient-to-br from-primary/5 to-primary/10">
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  alt={app.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <AppWindow className="size-20 text-primary/20" />
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
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

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>カテゴリ：{app.category}</span>
                <span>開発者：{app.developer_name}</span>
                <span>専門：{app.developer_specialty}</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <PurchaseButton
                  appId={"id" in app ? app.id : ""}
                  price={app.price}
                  appUrl={app.demo_url || app.app_url}
                  purchased={purchased}
                  loggedIn={!!user}
                />
              </div>

              {screenshots.length > 0 && (
                <div className="mt-8 border-t border-border pt-6">
                  <h2 className="text-lg font-bold text-foreground">
                    スクリーンショット
                  </h2>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {screenshots.map((url, i) => (
                      <Image
                        key={i}
                        src={url}
                        alt={`${app.name} スクリーンショット ${i + 1}`}
                        width={400}
                        height={250}
                        className="rounded-lg border object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}

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
