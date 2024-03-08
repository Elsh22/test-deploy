"use client";

import type Stripe from "stripe";

import React, { useState } from "react";

import CustomDonationInput from "./CustomDonationInput";

import { formatAmountForDisplay } from "../../utils/stripe-helpers";
import * as config from "../../utils/index";
import { createCheckoutSession } from "./stripe";
import getStripe from "../../utils/get-stripejs";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
}

export default function CheckoutForm(props: CheckoutFormProps): JSX.Element {
  const [loading] = useState<boolean>(false);
  const [input, setInput] = useState({ customDonation: 100,});
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ): void =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const formAction = async (data: FormData): Promise<void> => {
    const uiMode = data.get(
      "uiMode",
    ) as Stripe.Checkout.SessionCreateParams.UiMode;
    const { client_secret, url } = await createCheckoutSession(data);

    if (uiMode === "embedded") return setClientSecret(client_secret);

    window.location.assign(url as string);
  };

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="uiMode" value={props.uiMode} />
        <input type="number" name="customDonation" value={input.customDonation} onChange={handleInputChange} className="my-1 w-full text-[#8f6ed5] font-bold" placeholder="$0.00" />
        <CustomDonationInput
          className="text-[#8f6ed5] border border-[#8f6ed5] my-1 w-full"
          name="customDonation"
          min={config.MIN_AMOUNT}
          max={config.MAX_AMOUNT}
          step={config.AMOUNT_STEP}
          currency={config.CURRENCY}
          onChange={handleInputChange}
          value={input.customDonation}
        />
        <button
          className="bg-[#8f6ed5] transition-shadow duration-[var(--transition-duration)] hover:shadow-custom  text-white text-lg font-semibold border-0 py-3 px-4 mt-2.5 cursor-pointer  block w-full rounded"
          type="submit"
          disabled={loading}
        >
          Donate {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
        </button>
      </form>
      {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={getStripe()}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : null}
    </>
  );
}

//<input type="hidden" name="uiMode" value={props.uiMode} />