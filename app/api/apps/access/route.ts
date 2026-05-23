import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function POST(req: NextRequest) {
  const { slug } = await req.json();
  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  // サービスロールで認証不要にカウント（詳細ページ閲覧でカウント）
  const supabase = createServiceClient();

  // RPC でアトミックにインクリメント
  const { data, error } = await supabase.rpc("increment_view", {
    app_slug: slug,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ view_count: data });
}
