"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Order } from "@/lib/types";
import { ORDER_STATUS_LABELS } from "@/lib/types";

const statusColors: Record<Order["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export function OrderList({ orders }: { orders: Order[] }) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
}

function OrderItem({ order }: { order: Order }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState(order.tracking_number || "");
  const [showTracking, setShowTracking] = useState(false);

  async function updateStatus(status: string, tracking?: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/orders/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          status,
          trackingNumber: tracking,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "更新に失敗しました");
        return;
      }
      router.refresh();
    } catch {
      alert("更新に失敗しました");
    } finally {
      setLoading(false);
      setShowTracking(false);
    }
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-muted-foreground">
              {order.order_number}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[order.status]}`}
            >
              {ORDER_STATUS_LABELS[order.status]}
            </span>
          </div>
          <p className="mt-1 font-medium text-sm">
            {order.product?.name || "商品"}
            {order.quantity > 1 && ` x${order.quantity}`}
          </p>
          <p className="text-sm font-bold mt-1">
            ¥{order.total.toLocaleString()}
          </p>
        </div>
        <div className="text-right text-xs text-muted-foreground shrink-0">
          {new Date(order.created_at).toLocaleDateString("ja-JP")}
        </div>
      </div>

      {/* 配送先 */}
      {order.shipping_name && (
        <div className="mt-3 rounded bg-muted/50 p-3 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">{order.shipping_name}</p>
          {order.shipping_postal_code && <p>〒{order.shipping_postal_code}</p>}
          {order.shipping_address && <p>{order.shipping_address}</p>}
          {order.shipping_phone && <p>TEL: {order.shipping_phone}</p>}
        </div>
      )}

      {/* 追跡番号 */}
      {order.tracking_number && (
        <p className="mt-2 text-xs text-muted-foreground">
          追跡番号: <span className="font-mono">{order.tracking_number}</span>
        </p>
      )}

      {/* アクションボタン */}
      <div className="mt-3 flex items-center gap-2">
        {order.status === "paid" && (
          <>
            {showTracking ? (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  placeholder="追跡番号（任意）"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="h-8 text-xs"
                />
                <Button
                  size="sm"
                  onClick={() => updateStatus("shipped", trackingNumber || undefined)}
                  disabled={loading}
                  className="gap-1 shrink-0"
                >
                  {loading ? (
                    <Loader2 className="size-3 animate-spin" />
                  ) : (
                    <Truck className="size-3" />
                  )}
                  発送完了
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowTracking(false)}
                >
                  戻る
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowTracking(true)}
                className="gap-1"
              >
                <Truck className="size-3" />
                発送処理
              </Button>
            )}
          </>
        )}
        {order.status === "shipped" && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateStatus("delivered")}
            disabled={loading}
            className="gap-1"
          >
            {loading ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <CheckCircle className="size-3" />
            )}
            配達完了
          </Button>
        )}
      </div>
    </div>
  );
}
