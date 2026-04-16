"use client";

import { useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PurchaseButtonProps {
  appId: string;
  price: number;
  appUrl: string;
  purchased: boolean;
  loggedIn: boolean;
}

export function PurchaseButton({
  appId,
  price,
  appUrl,
  purchased,
  loggedIn,
}: PurchaseButtonProps) {
  const [loading, setLoading] = useState(false);

  if (price === 0 || purchased) {
    return (
      <Button size="lg" className="gap-2 rounded-full px-8" asChild>
        <a href={appUrl} target="_blank" rel="noopener noreferrer">
          アプリを開く
          <ExternalLink className="size-4" />
        </a>
      </Button>
    );
  }

  if (!loggedIn) {
    return (
      <Button size="lg" className="rounded-full px-8" asChild>
        <a href={`/auth/login?redirect=/apps`}>
          ログインして購入（¥{price.toLocaleString()}）
        </a>
      </Button>
    );
  }

  async function handlePurchase() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appId }),
      });
      const data = await res.json();
      if (res.status === 401) {
        window.location.href = `/auth/login?redirect=/apps`;
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
      購入する（¥{price.toLocaleString()}）
    </Button>
  );
}
