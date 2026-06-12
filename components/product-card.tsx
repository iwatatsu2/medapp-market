import Link from "next/link";
import Image from "next/image";
import { Package } from "lucide-react";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const taxIncluded = Math.floor(product.price * (1 + product.tax_rate / 100));

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block overflow-hidden rounded-xl border bg-white transition-all hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {product.thumbnail_url ? (
          <Image
            src={product.thumbnail_url}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package className="size-12 text-muted-foreground/30" />
          </div>
        )}
        {product.stock <= 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-white px-4 py-1 text-sm font-bold text-red-600">
              売り切れ
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
        <div className="mt-2">
          <span className="text-lg font-bold">¥{taxIncluded.toLocaleString()}</span>
          <span className="ml-1 text-xs text-muted-foreground">税込</span>
        </div>
        {product.shipping_fee > 0 && (
          <p className="text-xs text-muted-foreground">
            + 送料 ¥{product.shipping_fee.toLocaleString()}
          </p>
        )}
      </div>
    </Link>
  );
}
