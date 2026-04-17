import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { appId } = await req.json();
    if (!appId) {
      return NextResponse.json({ error: "appId is required" }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get app details
    const { data: app } = await supabase
      .from("apps")
      .select("*")
      .eq("id", appId)
      .single();

    if (!app || app.price === 0) {
      return NextResponse.json(
        { error: "App not found or is free" },
        { status: 400 }
      );
    }

    // Check if already purchased
    const { data: existing } = await supabase
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("app_id", appId)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Already purchased" },
        { status: 400 }
      );
    }

    // Get developer's Stripe Connect account
    const { data: developerProfile } = await supabase
      .from("market_profiles")
      .select("stripe_account_id, stripe_onboarding_complete")
      .eq("id", app.developer_id)
      .single();

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const sessionParams: Parameters<typeof stripe.checkout.sessions.create>[0] = {
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: app.name,
              description: app.tagline,
            },
            unit_amount: app.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${appUrl}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/apps/${app.slug}`,
      metadata: {
        appId: app.id,
        userId: user.id,
      },
    };

    // If developer has connected Stripe, split revenue (80% developer, 20% platform)
    if (
      developerProfile?.stripe_account_id &&
      developerProfile.stripe_onboarding_complete
    ) {
      const platformFee = Math.round(app.price * 0.2);
      sessionParams.payment_intent_data = {
        application_fee_amount: platformFee,
        transfer_data: {
          destination: developerProfile.stripe_account_id,
        },
      };
    }

    // Idempotency key to prevent double purchases from rapid clicks
    const idempotencyKey = `checkout_${user.id}_${appId}`;
    const session = await stripe.checkout.sessions.create(sessionParams, {
      idempotencyKey,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
