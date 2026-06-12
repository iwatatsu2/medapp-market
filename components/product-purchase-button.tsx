"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductPurchaseButtonProps {
  productId: string;
  price: number;
  taxRate: number;
  shippingFee: number;
  stock: number;
  loggedIn: boolean;
}

export function ProductPurchaseButton({
  productId,
  price,
  taxRate,
  shippingFee,
  stock,
  loggedIn,
}: ProductPurchaseButtonProps) {
  const [loading, setLoading] = useState(false);

  const taxIncluded = Math.floor(price * (1 + taxRate / 100));
  const total = taxIncluded + shippingFee;

  if (stock <= 0) {
    return (
      <Button size="lg" className="rounded-full px-8" disabled>
        売り切れ
      </Button>
    );
  }

  if (!loggedIn) {
    return (
      <Button size="lg" className="rounded-full px-8" asChild>
        <a href="/auth/login?redirect=/shop">
          ログインして購入（¥{total.toLocaleString()}）
        </a>
      </Button>
    );
  }

  async function handlePurchase() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (res.status === 401) {
        window.location.href = "/auth/login?redirect=/shop";
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "購入処理に失敗しました");
      }
    } catch {
      alert("購入処理に失敗しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      size="lg"
      className="gap-2 rounded-full px-8"
      onClick={handlePurchase}
      disabled={loading}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      購入する（¥{total.toLocaleString()}）
    </Button>
  );
}
