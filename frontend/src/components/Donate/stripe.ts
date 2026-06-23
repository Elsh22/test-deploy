"use server";

import type Stripe from "stripe";
import { headers } from "next/headers";
import { getStripe } from "@/app/models/lib/stripe";
import {
  CURRENCY,
  MAX_AMOUNT,
  MIN_AMOUNT,
  formatAmountForStripe,
} from "@/lib/stripe-helpers";

export async function createCheckoutSession(
  data: FormData,
): Promise<{ client_secret: string | null; url: string | null }> {
  const uiMode = data.get(
    "uiMode",
  ) as Stripe.Checkout.SessionCreateParams.UiMode;
  const donationAmount = Number(data.get("customDonation"));
  const origin = headers().get("origin") as string;

  if (
    !Number.isFinite(donationAmount) ||
    donationAmount < MIN_AMOUNT ||
    donationAmount > MAX_AMOUNT
  ) {
    throw new Error(`Donation amount must be between $${MIN_AMOUNT} and $${MAX_AMOUNT}.`);
  }

  const stripe = getStripe();

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "donate",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: "Developing Men of Color Donation",
          },
          unit_amount: formatAmountForStripe(donationAmount, CURRENCY),
        },
      },
    ],
    ...(uiMode === "hosted" && {
      success_url: `${origin}/donate?donation=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate?donation=cancelled`,
    }),
    ...(uiMode === "embedded" && {
      return_url: `${origin}/donate?donation=success&session_id={CHECKOUT_SESSION_ID}`,
    }),
    ui_mode: uiMode,
  });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}
