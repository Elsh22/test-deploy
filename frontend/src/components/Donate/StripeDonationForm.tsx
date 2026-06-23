"use client";

import { useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { createCheckoutSession } from "@/components/Donate/stripe";
import {
  AMOUNT_STEP,
  CURRENCY,
  MAX_AMOUNT,
  MIN_AMOUNT,
  formatAmountForDisplay,
} from "@/lib/stripe-helpers";

const presetAmounts = [25, 50, 100, 250];

export default function StripeDonationForm() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(100);
  const [error, setError] = useState("");

  const updateAmount = (nextAmount: number) => {
    const clampedAmount = Math.min(
      MAX_AMOUNT,
      Math.max(MIN_AMOUNT, Number.isFinite(nextAmount) ? nextAmount : MIN_AMOUNT),
    );

    setAmount(clampedAmount);
  };

  const formAction = async (data: FormData) => {
    setLoading(true);
    setError("");

    try {
      const { url } = await createCheckoutSession(data);

      if (!url) {
        throw new Error("Unable to open Stripe checkout.");
      }

      window.location.assign(url);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to open Stripe checkout.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="uiMode" value="hosted" />
      <input type="hidden" name="customDonation" value={amount} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {presetAmounts.map((presetAmount) => (
          <button
            key={presetAmount}
            type="button"
            onClick={() => updateAmount(presetAmount)}
            className={`border px-4 py-4 text-lg font-black transition ${
              amount === presetAmount
                ? "border-yellow-400 bg-yellow-400 text-black"
                : "border-white/10 text-white hover:border-yellow-400"
            }`}
          >
            {formatAmountForDisplay(presetAmount, CURRENCY)}
          </button>
        ))}
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between gap-4">
          <label
            htmlFor="customDonationAmount"
            className="font-['PolySans'] text-xs font-black uppercase tracking-[0.16em] text-zinc-400"
          >
            Custom Amount
          </label>
          <span className="font-['PolySans'] text-2xl font-black text-white">
            {formatAmountForDisplay(amount, CURRENCY)}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-[150px_1fr] sm:items-center">
          <input
            id="customDonationAmount"
            type="number"
            min={MIN_AMOUNT}
            max={MAX_AMOUNT}
            step={AMOUNT_STEP}
            value={amount}
            onChange={(event) => updateAmount(Number(event.currentTarget.value))}
            className="w-full border border-white/10 bg-transparent px-4 py-4 text-lg font-black text-white outline-none transition focus:border-yellow-400"
          />
          <input
            type="range"
            min={MIN_AMOUNT}
            max={500}
            step={AMOUNT_STEP}
            value={Math.min(amount, 500)}
            onChange={(event) => updateAmount(Number(event.currentTarget.value))}
            className="h-2 w-full accent-yellow-400"
            aria-label="Donation amount slider"
          />
        </div>
      </div>

      {error ? <p className="text-sm font-semibold text-red-300">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-3 bg-yellow-400 px-6 py-4 font-black uppercase tracking-[0.12em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Opening Checkout" : `Donate ${formatAmountForDisplay(amount, CURRENCY)}`}
        {loading ? <LockKeyhole className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
      </button>
    </form>
  );
}
