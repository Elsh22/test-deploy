import type { Stripe } from "stripe";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { stripe } from "../../../../models/lib/stripe";
import img from "../../../../../assets/EBOARD2025/EBoard2025.jpg";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}): Promise<JSX.Element> {
  if (!searchParams.session_id) {
    throw new Error("Please provide a valid session_id.");
  }

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent"],
    });

  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;

  return (
    <main className="dmc-dark-section min-h-screen px-6 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.92fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 border border-emerald-400/35 bg-emerald-400/10 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            Donation received
          </div>
          <h1 className="text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl">
            Thank you for supporting DMC.
          </h1>
          <p className="dmc-muted mt-6 max-w-3xl text-lg leading-8 md:text-xl">
            Your contribution helps us keep building programs, mentorship, service,
            and opportunities for men of color at VCU.
          </p>

          <div className="dmc-card mt-8 border p-5">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-400">
              Payment status
            </p>
            <p className="mt-2 text-2xl font-black">{paymentIntent.status}</p>
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-3 bg-yellow-400 px-6 py-4 font-black text-black transition hover:bg-white"
          >
            Back to Home
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="relative">
          <div className="absolute -right-4 -top-4 h-full w-full border border-yellow-400" />
          <Image
            src={img}
            alt="DMC E-Board"
            className="relative aspect-[4/3] w-full object-cover"
            priority={false}
          />
        </div>
      </div>
    </main>
  );
}
