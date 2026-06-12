import { notFound } from "next/navigation";
import Image from "next/image";
import { Package } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductPurchaseButton } from "@/components/product-purchase-button";
import type { Product } from "@/lib/types";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!data) notFound();
  const product = data as Product;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const taxIncluded = Math.floor(product.price * (1 + product.tax_rate / 100));
  const allImages = [
    ...(product.thumbnail_url ? [product.thumbnail_url] : []),
    ...product.images,
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* 画像 */}
            <div className="space-y-3">
              <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
                {allImages[0] ? (
                  <Image
                    src={allImages[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Package className="size-16 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.slice(1).map((url, i) => (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-lg border"
                    >
                      <Image
                        src={url}
                        alt={`${product.name} ${i + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 商品情報 */}
            <div>
              <h1 className="font-serif text-2xl font-medium">{product.name}</h1>

              <div className="mt-4 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    ¥{taxIncluded.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">税込</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  （税抜 ¥{product.price.toLocaleString()} + 消費税{product.tax_rate}%）
                </p>
                {product.shipping_fee > 0 && (
                  <p className="text-sm text-muted-foreground">
                    送料: 全国一律 ¥{product.shipping_fee.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="mt-2">
                {product.stock > 0 ? (
                  <span className="text-sm text-green-600">
                    在庫あり（残り{product.stock}個）
                  </span>
                ) : (
                  <span className="text-sm text-red-600 font-medium">売り切れ</span>
                )}
              </div>

              <div className="mt-6">
                <ProductPurchaseButton
                  productId={product.id}
                  price={product.price}
                  taxRate={product.tax_rate}
                  shippingFee={product.shipping_fee}
                  stock={product.stock}
                  loggedIn={!!user}
                />
              </div>

              {product.description && (
                <div className="mt-8 border-t pt-6">
                  <h2 className="text-sm font-medium">商品説明</h2>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="mt-6 rounded-lg border bg-muted/30 p-4 text-xs text-muted-foreground space-y-1">
                <p>決済完了後、登録された住所に発送いたします。</p>
                <p>領収書はStripeから自動でメール送信されます。</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
