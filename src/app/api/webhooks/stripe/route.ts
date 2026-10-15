import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/server";
import { grantAccessFromSession } from "@/lib/grant-access";
import type Stripe from "stripe";

// Stripe calls this route directly (server-to-server), never the browser —
// that's why it's the only place allowed to flip `purchases.has_access` to
// true (using the Supabase service role key, which bypasses Row Level
// Security). Configure this URL as a webhook endpoint in the Stripe
// Dashboard: Developers > Webhooks > Add endpoint > <your-domain>/api/webhooks/stripe
// Events to send: checkout.session.completed, customer.subscription.deleted
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createAdminClient();

  if (event.type === "checkout.session.completed") {
    // Unlocks the course — and creates the account if they paid before signing up.
    await grantAccessFromSession(event.data.object as Stripe.Checkout.Session);
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    await supabase
      .from("purchases")
      .update({ has_access: false, updated_at: new Date().toISOString() })
      .eq("stripe_subscription_id", subscription.id);
  }

  return NextResponse.json({ received: true });
}
