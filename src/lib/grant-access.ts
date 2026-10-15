import type Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/server";

// Server-only. Given a finished Stripe Checkout Session, makes sure the buyer
// has a SalesLift account and that it's unlocked. Safe to call more than once
// for the same session (the webhook and the success page both call it, so
// access is granted even if one of them is slow or misconfigured).
//
// Buyers who were logged in when they paid are matched by client_reference_id.
// Buyers who paid first are matched (or created) by the email they gave Stripe.
export async function grantAccessFromSession(session: Stripe.Checkout.Session) {
  const paid = session.status === "complete" && session.payment_status !== "unpaid";
  if (!paid) return null;

  const email = (session.customer_details?.email ?? session.customer_email ?? "").toLowerCase();
  const admin = createAdminClient();

  let userId = session.client_reference_id ?? session.metadata?.supabase_user_id ?? null;
  if (!userId) {
    if (!email) return null;
    userId = await findOrCreateUser(email);
  }

  await admin.from("purchases").upsert(
    {
      user_id: userId,
      has_access: true,
      stripe_customer_id: typeof session.customer === "string" ? session.customer : session.customer?.id ?? null,
      stripe_subscription_id:
        typeof session.subscription === "string" ? session.subscription : session.subscription?.id ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  return { userId, email };
}

async function findOrCreateUser(email: string): Promise<string> {
  const admin = createAdminClient();

  const existing = await findUserId(email);
  if (existing) return existing;

  // email_confirm: they proved the address by paying with it, so no
  // confirmation email is needed. The database trigger creates their
  // profiles + purchases rows.
  const { data, error } = await admin.auth.admin.createUser({ email, email_confirm: true });
  if (data?.user) return data.user.id;

  // Someone else (webhook vs. success page) may have created it a moment ago.
  const retry = await findUserId(email);
  if (retry) return retry;
  throw error ?? new Error("Could not create user");
}

async function findUserId(email: string) {
  const admin = createAdminClient();
  // Supabase stores auth emails lowercased, and profiles copies them as-is.
  const { data } = await admin.from("profiles").select("id").eq("email", email.toLowerCase()).maybeSingle();
  return (data?.id as string | undefined) ?? null;
}
