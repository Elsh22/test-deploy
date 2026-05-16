"use client";

import type Stripe from "stripe";

import React, { useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

import { formatAmountForDisplay } from "../../utils/stripe-helpers";
import * as config from "../../utils/index";
import { createCheckoutSession } from "./stripe";
import getStripe from "../../utils/get-stripejs";

interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
}

const presetAmounts = [25, 50, 100, 250];

export default function CheckoutForm(props: CheckoutFormProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState({ customDonation: 100 });
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const updateDonation = (amount: number): void => {
    const clamped = Math.min(config.MAX_AMOUNT, Math.max(config.MIN_AMOUNT, amount));
    setInput({ customDonation: clamped });
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event): void => {
    updateDonation(Number(event.currentTarget.value));
  };

  const formAction = async (data: FormData): Promise<void> => {
    setLoading(true);

    try {
      const uiMode = data.get("uiMode") as Stripe.Checkout.SessionCreateParams.UiMode;
      const { client_secret, url } = await createCheckoutSession(data);

      if (uiMode === "embedded") {
        setClientSecret(client_secret);
        return;
      }

      window.location.assign(url as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="uiMode" value={props.uiMode} />
        <input type="hidden" name="customDonation" value={input.customDonation} />

        <div>
          <label className="mb-3 block text-sm font-black uppercase tracking-[0.18em] text-yellow-500">
            Choose amount
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => updateDonation(amount)}
                className={`border px-4 py-4 text-lg font-black transition ${
                  input.customDonation === amount
                    ? "border-yellow-400 bg-yellow-400 text-black"
                    : "border-[var(--dmc-border)] hover:border-yellow-400"
                }`}
              >
                {formatAmountForDisplay(amount, config.CURRENCY)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-4">
            <label htmlFor="customDonationNumber" className="text-sm font-black uppercase tracking-[0.18em] text-yellow-500">
              Custom amount
            </label>
            <span className="text-2xl font-black">
              {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-[150px_1fr] sm:items-center">
            <input
              id="customDonationNumber"
              type="number"
              min={config.MIN_AMOUNT}
              max={config.MAX_AMOUNT}
              step={config.AMOUNT_STEP}
              value={input.customDonation}
              onChange={handleInputChange}
              className="w-full border border-[var(--dmc-border)] bg-transparent px-4 py-4 text-lg font-black outline-none transition focus:border-yellow-400"
            />
            <input
              type="range"
              min={config.MIN_AMOUNT}
              max={500}
              step={config.AMOUNT_STEP}
              value={Math.min(input.customDonation, 500)}
              onChange={handleInputChange}
              className="h-2 w-full accent-yellow-400"
              aria-label="Donation amount slider"
            />
          </div>
          <p className="dmc-muted mt-3 text-sm">
            Donations are processed securely through Stripe.
          </p>
        </div>

        <button
          className="inline-flex w-full items-center justify-center gap-3 bg-yellow-400 px-6 py-4 text-lg font-black text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={loading}
        >
          {loading ? "Opening secure checkout..." : `Donate ${formatAmountForDisplay(input.customDonation, config.CURRENCY)}`}
          {loading ? <LockKeyhole className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
        </button>
      </form>

      {clientSecret ? (
        <div className="mt-8">
          <EmbeddedCheckoutProvider stripe={getStripe()} options={{ clientSecret }}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      ) : null}
    </>
  );
}
