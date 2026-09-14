import Stripe from "stripe";

// Server-side only — never import this into a client component.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});
