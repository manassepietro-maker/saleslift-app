import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

// Creates a Stripe Checkout Session for the €42 one-time purchase
// (lifetime access). The price is defined here, so no Stripe price ID is
// needed; change PRICE_CENTS to change the price.
// Works whether or not the visitor has an account: logged-in students are
// linked by user id; new buyers pay first and get their account created on
// /checkout/success (and by the webhook) from the email they give Stripe.
const PRICE_CENTS = 4200;

export async function POST(req: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: PRICE_CENTS,
            product_data: {
              name: "SalesLift: the full system",
              description: "All five modules, every template, and lifetime access including future updates.",
            },
          },
        },
      ],
      customer_creation: "always",
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
    return NextResponse.json({ error: "Checkout is unavailable right now. Try again in a minute." }, { status: 500 });
  }
}
