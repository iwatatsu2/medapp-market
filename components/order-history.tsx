"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Order } from "@/lib/types";
import { ORDER_STATUS_LABELS } from "@/lib/types";

const statusColors: Record<Order["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export function OrderHistory({ userId }: { userId: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("orders")
      .select("*, product:products(name, thumbnail_url)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setOrders((data ?? []) as Order[]);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return null;
  if (orders.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="font-serif text-lg font-medium">注文履歴</h2>
      <div className="mt-4 space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">
                    {order.order_number}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[order.status]}`}
                  >
                    {ORDER_STATUS_LABELS[order.status]}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium">
                  {(order.product as { name?: string })?.name || "商品"}
                </p>
                <p className="text-sm">¥{order.total.toLocaleString()}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(order.created_at).toLocaleDateString("ja-JP")}
              </span>
            </div>
            {order.tracking_number && (
              <p className="mt-2 text-xs text-muted-foreground">
                追跡番号: <span className="font-mono">{order.tracking_number}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
