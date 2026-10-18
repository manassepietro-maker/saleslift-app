import { NextResponse, type NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { grantAccessFromSession } from "@/lib/grant-access";

export const dynamic = "force-dynamic";

// Stripe sends buyers here after paying. We confirm the payment with Stripe,
// unlock the course (creating the account if they paid before signing up),
// and log them straight in (once, within an hour of checkout), then ask them
// to create a password. After that, they log in with email and password.
export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) return NextResponse.redirect(`${origin}/#pricing`);

  let result: Awaited<ReturnType<typeof grantAccessFromSession>> = null;
  let created = 0;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    created = session.created;
    result = await grantAccessFromSession(session);
  } catch (err) {
    console.error("Checkout success handling failed", err);
  }
  if (!result) return NextResponse.redirect(`${origin}/login?paid=pending`);

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user?.id === result.userId) return NextResponse.redirect(`${origin}/dashboard?welcome=1`);

  const fresh = Date.now() / 1000 - created < 60 * 60;
  if (fresh && result.email) {
    const admin = createAdminClient();
    const { data: existing } = await admin.auth.admin.getUserById(result.userId);
    const alreadyUsed = existing?.user?.app_metadata?.checkout_login === sessionId;
    if (!alreadyUsed) {
      await admin.auth.admin.updateUserById(result.userId, {
        app_metadata: { ...(existing?.user?.app_metadata ?? {}), checkout_login: sessionId },
      });
      const { data: link } = await admin.auth.admin.generateLink({ type: "magiclink", email: result.email });
      const tokenHash = link?.properties?.hashed_token;
      if (tokenHash) {
        const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: "email" });
        // New buyers choose a password next (/set-password skips this if they have one).
        if (!error) return NextResponse.redirect(`${origin}/set-password`);
        console.error("Auto-login after checkout failed", error);
      }
    }
  }

  return NextResponse.redirect(`${origin}/login?paid=1`);
}
