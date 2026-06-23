import "server-only";

import Stripe from "stripe";

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
    appInfo: {
      name: "Developing Men of Color Donation Portal",
      url: "https://www.dmcvcu.com",
    },
  });
}
