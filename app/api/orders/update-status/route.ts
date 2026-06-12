import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { orderId, status, trackingNumber } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const validTransitions: Record<string, string[]> = {
      paid: ["shipped", "cancelled"],
      shipped: ["delivered"],
    };

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 注文を取得して権限チェック
    const { data: order } = await supabase
      .from("orders")
      .select("*, product:products(seller_id)")
      .eq("id", orderId)
      .single();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const sellerId = (order.product as { seller_id: string })?.seller_id;
    if (sellerId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const allowed = validTransitions[order.status];
    if (!allowed || !allowed.includes(status)) {
      return NextResponse.json({ error: "Invalid status transition" }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (status === "shipped") {
      updateData.shipped_at = new Date().toISOString();
      if (trackingNumber) {
        updateData.tracking_number = trackingNumber;
      }
    }

    const { error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", orderId);

    if (error) {
      console.error("Failed to update order:", error);
      return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
