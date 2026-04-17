import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

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
    const { appId, userId } = session.metadata || {};

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
    }
  }

  return NextResponse.json({ received: true });
}
