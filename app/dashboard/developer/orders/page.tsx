import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { OrderList } from "@/components/order-list";
import type { Order } from "@/lib/types";

export default async function OrdersDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  // 自分の商品に対する注文を取得
  const { data: products } = await supabase
    .from("products")
    .select("id")
    .eq("seller_id", user.id);

  const productIds = (products ?? []).map((p: { id: string }) => p.id);

  let orders: Order[] = [];
  if (productIds.length > 0) {
    const { data } = await supabase
      .from("orders")
      .select("*, product:products(*)")
      .in("product_id", productIds)
      .order("created_at", { ascending: false });
    orders = (data ?? []) as Order[];
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/developer">
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
            <h1 className="font-serif text-2xl font-medium">注文管理</h1>
          </div>

          <div className="rounded-2xl bg-card p-8">
            {orders.length === 0 ? (
              <p className="text-sm text-muted-foreground">まだ注文がありません。</p>
            ) : (
              <OrderList orders={orders} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
