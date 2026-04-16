import { createClient } from "@/lib/supabase/server";

export async function hasPurchased(
  userId: string,
  appId: string
): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("app_id", appId)
    .single();
  return !!data;
}

export async function getUserPurchases(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("purchases")
    .select("*, apps(*)")
    .eq("user_id", userId)
    .order("purchased_at", { ascending: false });
  return data ?? [];
}
