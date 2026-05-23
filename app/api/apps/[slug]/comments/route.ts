import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = createServiceClient();

  const { data: comments, error } = await supabase
    .from("app_comments")
    .select("*")
    .eq("app_slug", slug)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // コメントいいね数を取得
  const commentIds = (comments ?? []).map((c) => c.id);
  let likesMap: Record<string, number> = {};
  let userLikes: Set<string> = new Set();

  if (commentIds.length > 0) {
    const { data: likes } = await supabase
      .from("comment_likes")
      .select("comment_id")
      .in("comment_id", commentIds);

    for (const l of likes ?? []) {
      likesMap[l.comment_id] = (likesMap[l.comment_id] ?? 0) + 1;
    }

    // ログインユーザーのいいね状態
    const authClient = await createClient();
    const { data: { user } } = await authClient.auth.getUser();
    if (user) {
      const { data: myLikes } = await supabase
        .from("comment_likes")
        .select("comment_id")
        .in("comment_id", commentIds)
        .eq("user_id", user.id);
      for (const l of myLikes ?? []) {
        userLikes.add(l.comment_id);
      }
    }
  }

  const enriched = (comments ?? []).map((c) => ({
    ...c,
    like_count: likesMap[c.id] ?? 0,
    liked: userLikes.has(c.id),
  }));

  return NextResponse.json({ comments: enriched });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { nickname, body, parent_id } = await req.json();
  if (!body || typeof body !== "string" || !nickname) {
    return NextResponse.json({ error: "nickname and body are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("app_comments")
    .insert({
      app_slug: slug,
      user_id: user.id,
      nickname: nickname.slice(0, 50),
      body: body.slice(0, 1000),
      parent_id: parent_id || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ comment: { ...data, like_count: 0, liked: false } });
}
