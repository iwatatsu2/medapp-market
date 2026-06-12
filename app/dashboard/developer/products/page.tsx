import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Package, ArrowLeft, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { DeleteProductButton } from "@/components/delete-product-button";
import type { Product } from "@/lib/types";

export default async function ProductsDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("seller_id", user.id)
    .order("created_at", { ascending: false });

  const products = (data ?? []) as Product[];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/developer">
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
            <h1 className="font-serif text-2xl font-medium">物販管理</h1>
            <div className="ml-auto">
              <Button asChild className="gap-2">
                <Link href="/dashboard/developer/products/new">
                  <Plus className="size-4" />
                  新規登録
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-8">
            <h2 className="font-serif text-lg font-medium">登録商品</h2>

            {products.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                まだ商品を登録していません。
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {products.map((product) => {
                  const taxIncluded = Math.floor(product.price * (1 + product.tax_rate / 100));
                  return (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 rounded-lg border p-4"
                    >
                      {product.thumbnail_url ? (
                        <Image
                          src={product.thumbnail_url}
                          alt={product.name}
                          width={60}
                          height={60}
                          className="rounded object-cover"
                        />
                      ) : (
                        <div className="flex h-[60px] w-[60px] items-center justify-center rounded bg-muted">
                          <Package className="size-6 text-muted-foreground/40" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.is_published ? "公開中" : "非公開"} ・
                          ¥{taxIncluded.toLocaleString()}（税込）・
                          在庫 {product.stock}個
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/developer/products/edit/${product.id}`}>
                            <Pencil className="size-3.5" />
                          </Link>
                        </Button>
                        <DeleteProductButton productId={product.id} productName={product.name} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
