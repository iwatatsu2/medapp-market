import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

export default async function ShopPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  const products = (data ?? []) as Product[];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-medium">ショップ</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              医療者のためのオリジナルグッズ
            </p>
          </div>

          {products.length === 0 ? (
            <p className="mt-12 text-center text-muted-foreground">
              現在販売中の商品はありません
            </p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
