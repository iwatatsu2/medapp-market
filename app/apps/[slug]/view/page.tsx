import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SEED_APPS } from "@/lib/seed-apps";
import { TrackView } from "@/components/track-view";

async function getApp(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("apps")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (data) return data;
  return SEED_APPS.find((a) => a.slug === slug) ?? null;
}

export default async function AppViewerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = await getApp(slug);
  if (!app) notFound();

  const appUrl = app.demo_url || app.app_url;
  if (!appUrl) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 未ログイン → ログインへ
  if (!user) {
    redirect(`/auth/login?redirect=/apps/${slug}/view`);
  }

  // 有料アプリなら購入チェック
  if (app.price > 0 && "id" in app) {
    const { data: purchase } = await supabase
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("app_id", app.id)
      .single();

    if (!purchase) {
      redirect(`/apps/${slug}`);
    }
  }

  return (
    <>
      <TrackView slug={slug} />
      <iframe
        src={appUrl}
        className="fixed inset-0 h-full w-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        referrerPolicy="no-referrer"
        title={app.name}
      />
    </>
  );
}
