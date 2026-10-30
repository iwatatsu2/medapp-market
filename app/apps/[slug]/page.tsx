import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AppWindow, ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PurchaseButton } from "@/components/purchase-button";
import { TrackView } from "@/components/track-view";
import { LikeButton } from "@/components/like-button";
import { ShareButton } from "@/components/share-button";
import { CommentSection } from "@/components/comment-section";
import { createClient } from "@/lib/supabase/server";
import { SEED_APPS } from "@/lib/seed-apps";
import { getCategoryLabel } from "@/lib/category-utils";
import { TRAINING_CASES } from "@/lib/training-cases";

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
  const screenshots = ("screenshots" in app ? (app.screenshots as string[]) : []);

  return (
    <div className="flex min-h-screen flex-col">
      <TrackView slug={slug} />
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

          <div className="overflow-hidden rounded-md border border-foreground bg-card">
            <div className="relative aspect-[16/9] border-b border-foreground bg-paper-2">
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  alt={app.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <AppWindow className="size-20 text-primary/20" />
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  {app.name}
                </h1>
                <span className="rounded-full bg-marker px-3 py-1 text-sm font-bold text-foreground">
                  {isFree ? "無料" : `¥${app.price.toLocaleString()}`}
                </span>
              </div>

              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {app.tagline}
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>カテゴリ：{(Array.isArray(app.category) ? app.category : [app.category]).map((c: string) => getCategoryLabel(c)).join(" / ")}</span>
                <span>
                  つくった人：
                  {app.developer_name && !["開発者", "岩本 達也"].includes(app.developer_name) ? (
                    `${app.developer_name}${app.developer_specialty ? `（${app.developer_specialty}）` : ""}`
                  ) : (
                    <Link href="/#editor" className="font-bold text-foreground underline underline-offset-2">
                      Dr.いわたつ（糖尿病・内分泌専門医）
                    </Link>
                  )}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <PurchaseButton
                  appId={"id" in app ? app.id : ""}
                  slug={slug}
                  price={app.price}
                  appUrl={app.demo_url || app.app_url}
                  purchased={purchased}
                  loggedIn={!!user}
                />
                <LikeButton slug={slug} />
                <ShareButton url={`https://medapp-market.vercel.app/apps/${slug}`} title={`${app.name} | MedApp Market`} />
              </div>
              {app.price > 0 && !purchased && (
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  購入することで<Link href="/terms" className="underline underline-offset-2">利用規約</Link>に同意したものとみなします。デジタルコンテンツという性質上、購入後の返品・返金は原則としてお受けできません。
                </p>
              )}
              <p className="mt-2 text-xs text-muted-foreground">
                本プラットフォームは掲載アプリの医学的正確性を保証しません。医療上の判断は必ず医療専門家にご相談ください。
              </p>

              {screenshots.length > 0 && (
                <div className="mt-8 border-t border-border pt-6">
                  <h2 className="font-serif text-xl font-extrabold text-foreground">
                    スクリーンショット
                  </h2>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {screenshots.map((url, i) => (
                      <Image
                        key={i}
                        src={url}
                        alt={`${app.name} スクリーンショット ${i + 1}`}
                        width={400}
                        height={225}
                        className="rounded-md border border-foreground object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 border-t border-border pt-6">
                <h2 className="font-serif text-xl font-extrabold text-foreground">説明</h2>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-loose text-muted-foreground">
                  {app.description}
                </p>
              </div>

              {TRAINING_CASES[slug] && (
                <div className="mt-8 border-t border-border pt-6">
                  <h2 className="font-serif text-xl font-extrabold text-foreground">症例で練習する</h2>
                  <a
                    href={TRAINING_CASES[slug].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block rounded-lg border border-border p-4 transition-colors hover:border-foreground hover:bg-marker/40"
                  >
                    <p className="text-sm font-semibold leading-relaxed text-foreground">
                      {TRAINING_CASES[slug].title}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      このアプリで調べる内容が出てくる症例です。
                      {TRAINING_CASES[slug].app === "endo" ? "Endo" : "DM"} Compass Training ・
                      {TRAINING_CASES[slug].free ? "最後まで無料で体験できます" : "最初の設問まで無料で体験できます"} →
                    </p>
                  </a>
                </div>
              )}

              <CommentSection slug={slug} currentUserId={user?.id} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
