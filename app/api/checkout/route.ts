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

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
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
