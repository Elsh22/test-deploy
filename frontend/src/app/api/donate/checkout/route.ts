import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  CURRENCY,
  MAX_AMOUNT,
  MIN_AMOUNT,
  formatAmountForStripe,
} from "@/lib/stripe-helpers";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured yet." },
      { status: 500 },
    );
  }

  const { amount } = (await request.json()) as { amount?: number };
  const donationAmount = Number(amount);

  if (
    !Number.isFinite(donationAmount) ||
    donationAmount < MIN_AMOUNT ||
    donationAmount > MAX_AMOUNT
  ) {
    return NextResponse.json(
      { error: `Donation amount must be between $${MIN_AMOUNT} and $${MAX_AMOUNT}.` },
      { status: 400 },
    );
  }

  const origin = new URL(request.url).origin;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

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
          unit_amount: formatAmountForStripe(donationAmount),
        },
      },
    ],
    success_url: `${origin}/donate?donation=success`,
    cancel_url: `${origin}/donate?donation=cancelled`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
