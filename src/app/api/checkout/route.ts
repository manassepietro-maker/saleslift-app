import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

// Creates a Stripe Checkout Session for the €37/mo course subscription.
// Works whether or not the visitor has an account: logged-in students are
// linked by user id; new buyers pay first and get their account created on
// /checkout/success (and by the webhook) from the email they give Stripe.
export async function POST(req: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      ...(user
        ? {
            customer_email: user.email,
            client_reference_id: user.id,
            metadata: { supabase_user_id: user.id },
          }
        : {}),
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#pricing`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session failed", err);
    return NextResponse.json({ error: "Checkout is unavailable right now — try again in a minute." }, { status: 500 });
  }
}
