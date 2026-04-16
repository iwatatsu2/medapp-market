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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("market_profiles")
      .select("stripe_account_id, stripe_onboarding_complete")
      .eq("id", user.id)
      .single();

    if (!profile?.stripe_account_id) {
      return NextResponse.json({ connected: false, onboarding_complete: false });
    }

    // Check actual status from Stripe
    const account = await stripe.accounts.retrieve(profile.stripe_account_id);
    const isComplete = account.charges_enabled && account.payouts_enabled;

    // Update DB if status changed
    if (isComplete && !profile.stripe_onboarding_complete) {
      await supabase
        .from("market_profiles")
        .update({ stripe_onboarding_complete: true })
        .eq("id", user.id);
    }

    return NextResponse.json({
      connected: true,
      onboarding_complete: isComplete,
      charges_enabled: account.charges_enabled,
      payouts_enabled: account.payouts_enabled,
    });
  } catch (error) {
    console.error("Stripe Connect status error:", error);
    return NextResponse.json(
      { error: "Failed to check status" },
      { status: 500 }
    );
  }
}
