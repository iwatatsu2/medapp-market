import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(
        new URL("/auth/login", process.env.NEXT_PUBLIC_APP_URL)
      );
    }

    const { data: profile } = await supabase
      .from("market_profiles")
      .select("stripe_account_id")
      .eq("id", user.id)
      .single();

    if (!profile?.stripe_account_id) {
      return NextResponse.redirect(
        new URL("/dashboard/developer/settings", process.env.NEXT_PUBLIC_APP_URL)
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const accountLink = await stripe.accountLinks.create({
      account: profile.stripe_account_id,
      refresh_url: `${appUrl}/api/stripe/connect/refresh`,
      return_url: `${appUrl}/dashboard/developer/settings`,
      type: "account_onboarding",
    });

    return NextResponse.redirect(accountLink.url);
  } catch (error) {
    console.error("Stripe Connect refresh error:", error);
    return NextResponse.redirect(
      new URL("/dashboard/developer/settings", process.env.NEXT_PUBLIC_APP_URL)
    );
  }
}
