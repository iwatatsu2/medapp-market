import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: existing } = await supabase
    .from("comment_likes")
    .select("id")
    .eq("comment_id", id)
    .eq("user_id", user.id)
    .single();

  if (existing) {
    await supabase.from("comment_likes").delete().eq("id", existing.id);
  } else {
    await supabase.from("comment_likes").insert({ comment_id: id, user_id: user.id });
  }

  const service = createServiceClient();
  const { count } = await service
    .from("comment_likes")
    .select("*", { count: "exact", head: true })
    .eq("comment_id", id);

  return NextResponse.json({ count: count ?? 0, liked: !existing });
}
