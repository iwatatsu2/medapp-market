import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = createServiceClient();

  const [{ count }, authClient] = await Promise.all([
    supabase.from("app_likes").select("*", { count: "exact", head: true }).eq("app_slug", slug),
    createClient(),
  ]);

  const { data: { user } } = await authClient.auth.getUser();
  let liked = false;
  if (user) {
    const { data } = await supabase
      .from("app_likes")
      .select("id")
      .eq("app_slug", slug)
      .eq("user_id", user.id)
      .single();
    liked = !!data;
  }

  return NextResponse.json({ count: count ?? 0, liked });
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // トグル: 既にあれば削除、なければ追加
  const { data: existing } = await supabase
    .from("app_likes")
    .select("id")
    .eq("app_slug", slug)
    .eq("user_id", user.id)
    .single();

  if (existing) {
    await supabase.from("app_likes").delete().eq("id", existing.id);
  } else {
    await supabase.from("app_likes").insert({ app_slug: slug, user_id: user.id });
  }

  // 最新カウント返却
  const service = createServiceClient();
  const { count } = await service
    .from("app_likes")
    .select("*", { count: "exact", head: true })
    .eq("app_slug", slug);

  return NextResponse.json({ count: count ?? 0, liked: !existing });
}
