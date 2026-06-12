import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "account.updated") {
    const account = event.data.object;
    if (account.charges_enabled && account.payouts_enabled) {
      await supabaseAdmin
        .from("market_profiles")
        .update({ stripe_onboarding_complete: true })
        .eq("stripe_account_id", account.id);
    }
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata || {};

    if (metadata.type === "product") {
      // 物販の注文処理
      const { productId, userId, quantity, subtotal, taxAmount, shippingFee } = metadata;

      if (productId && userId) {
        // 注文番号生成
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
        const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
        const orderNumber = `ORD-${dateStr}-${rand}`;

        // 配送先情報を取得
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const shippingDetails = (session as any).shipping_details as {
          name?: string;
          phone?: string;
          address?: {
            postal_code?: string;
            state?: string;
            city?: string;
            line1?: string;
            line2?: string;
          };
        } | undefined;

        const shippingAddress = shippingDetails?.address
          ? [
              shippingDetails.address.state,
              shippingDetails.address.city,
              shippingDetails.address.line1,
              shippingDetails.address.line2,
            ]
              .filter(Boolean)
              .join("")
          : null;

        // 注文レコード作成
        const { error } = await supabaseAdmin.from("orders").insert({
          order_number: orderNumber,
          user_id: userId,
          product_id: productId,
          quantity: Number(quantity) || 1,
          subtotal: Number(subtotal) || 0,
          tax_amount: Number(taxAmount) || 0,
          shipping_fee: Number(shippingFee) || 0,
          total: session.amount_total || 0,
          stripe_session_id: session.id,
          status: "paid",
          shipping_name: shippingDetails?.name || null,
          shipping_postal_code: shippingDetails?.address?.postal_code || null,
          shipping_address: shippingAddress,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          shipping_phone: (session as any).customer_details?.phone || null,
        });

        if (error) {
          console.error("Failed to record order:", error);
          return NextResponse.json({ error: "Failed to record order" }, { status: 500 });
        }

        // 在庫減算
        const qty = Number(quantity) || 1;
        const { data: currentProduct } = await supabaseAdmin
          .from("products")
          .select("stock")
          .eq("id", productId)
          .single();

        if (currentProduct) {
          await supabaseAdmin
            .from("products")
            .update({ stock: Math.max(0, currentProduct.stock - qty) })
            .eq("id", productId);
        }

        // 売上通知メール
        try {
          const { data: product } = await supabaseAdmin
            .from("products")
            .select("name")
            .eq("id", productId)
            .single();

          if (product && process.env.RESEND_API_KEY) {
            const resend = new Resend(process.env.RESEND_API_KEY);
            await resend.emails.send({
              from: "MedApp Market <onboarding@resend.dev>",
              to: process.env.SALE_NOTIFICATION_EMAIL!,
              subject: `📦 商品が売れました！「${product.name}」`,
              html: `
                <h2>商品が購入されました</h2>
                <table style="border-collapse:collapse;margin:16px 0;">
                  <tr><td style="padding:8px;font-weight:bold;">商品名</td><td style="padding:8px;">${product.name}</td></tr>
                  <tr><td style="padding:8px;font-weight:bold;">注文番号</td><td style="padding:8px;">${orderNumber}</td></tr>
                  <tr><td style="padding:8px;font-weight:bold;">金額</td><td style="padding:8px;">¥${(session.amount_total || 0).toLocaleString()}</td></tr>
                  <tr><td style="padding:8px;font-weight:bold;">配送先</td><td style="padding:8px;">${shippingDetails?.name || "-"}<br/>〒${shippingDetails?.address?.postal_code || "-"}<br/>${shippingAddress || "-"}</td></tr>
                  <tr><td style="padding:8px;font-weight:bold;">日時</td><td style="padding:8px;">${now.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}</td></tr>
                </table>
                <p><a href="https://medapp-market.vercel.app/dashboard/developer/orders">注文管理を確認する</a></p>
              `,
            });
          }
        } catch (emailError) {
          console.error("Failed to send sale notification email:", emailError);
        }
      }
    } else {
      // 既存のアプリ購入処理
      const { appId, userId } = metadata;

      if (appId && userId) {
        const { error } = await supabaseAdmin.from("purchases").upsert(
          {
            user_id: userId,
            app_id: appId,
            stripe_session_id: session.id,
            amount: session.amount_total || 0,
          },
          { onConflict: "user_id,app_id" }
        );

        if (error) {
          console.error("Failed to record purchase:", error);
          return NextResponse.json(
            { error: "Failed to record purchase" },
            { status: 500 }
          );
        }

        // 売上通知メールを送信
        try {
          const { data: app } = await supabaseAdmin
            .from("apps")
            .select("name, price")
            .eq("id", appId)
            .single();

          if (app && process.env.RESEND_API_KEY) {
            const resend = new Resend(process.env.RESEND_API_KEY);
            const amount = session.amount_total || app.price || 0;
            await resend.emails.send({
              from: "MedApp Market <onboarding@resend.dev>",
              to: process.env.SALE_NOTIFICATION_EMAIL!,
              subject: `🎉 アプリが売れました！「${app.name}」`,
              html: `
                <h2>アプリが購入されました</h2>
                <table style="border-collapse:collapse;margin:16px 0;">
                  <tr><td style="padding:8px;font-weight:bold;">アプリ名</td><td style="padding:8px;">${app.name}</td></tr>
                  <tr><td style="padding:8px;font-weight:bold;">金額</td><td style="padding:8px;">¥${amount.toLocaleString()}</td></tr>
                  <tr><td style="padding:8px;font-weight:bold;">日時</td><td style="padding:8px;">${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}</td></tr>
                </table>
                <p><a href="https://medapp-market.vercel.app/dashboard/developer">ダッシュボードを確認する</a></p>
              `,
            });
          }
        } catch (emailError) {
          console.error("Failed to send sale notification email:", emailError);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
