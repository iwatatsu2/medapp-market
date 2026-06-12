import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { productId, quantity = 1 } = await req.json();
    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: product } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .eq("is_published", true)
      .single();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.stock < quantity) {
      return NextResponse.json({ error: "在庫が不足しています" }, { status: 400 });
    }

    const taxIncluded = Math.floor(product.price * (1 + product.tax_rate / 100));
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const lineItems = [
      {
        price_data: {
          currency: "jpy",
          product_data: {
            name: product.name,
            description: product.description || undefined,
          },
          unit_amount: taxIncluded,
        },
        quantity,
      },
    ];

    if (product.shipping_fee > 0) {
      lineItems.push({
        price_data: {
          currency: "jpy" as const,
          product_data: {
            name: "送料（全国一律）",
            description: undefined,
          },
          unit_amount: product.shipping_fee,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create(
      {
        payment_method_types: ["card"],
        line_items: lineItems as typeof lineItems,
        mode: "payment",
        shipping_address_collection: {
          allowed_countries: ["JP"],
        },
        phone_number_collection: {
          enabled: true,
        },
        invoice_creation: {
          enabled: true,
        },
        success_url: `${appUrl}/shop/order-complete?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/shop/${product.slug}`,
        metadata: {
          type: "product",
          productId: product.id,
          userId: user.id,
          quantity: String(quantity),
          subtotal: String(product.price * quantity),
          taxAmount: String((taxIncluded - product.price) * quantity),
          shippingFee: String(product.shipping_fee),
        },
      },
      {
        idempotencyKey: `product_${user.id}_${productId}_${Date.now()}`,
      }
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Product checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
