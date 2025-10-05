import type { Stripe } from "stripe";
import Link from 'next/link'
import PrintObject from "../../../../../components/Donor/PrintObject";
import { stripe } from "../../../../models/lib/stripe";
import img from '../../../../../assets/EBOARD2024/Prof.jpg'

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}): Promise<JSX.Element> {
  if (!searchParams.session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent"],
    });

  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;
 

  return (
      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 mt-10 p-4">
        <div className="md:flex-1 md:mx-10 text-center md:text-left">
          <h1 className="font-semibold text-3xl leading-tight my-6">Thank you for your Donation</h1>
          <h2 className="text-gray-500 my-2">Status: {paymentIntent.status}</h2>
          <p className="mb-6">Your generous donation will help us continue our mission and make a lasting impact. We appreciate your contribution.</p>
          <Link href="/">
            <button className="inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-300">Back to Home</button>
          </Link>
        </div>
        <div className="md:flex-1 mt-10">
          <img src={img.src} alt="Group of people" className="w-full h-auto max-w-md mx-auto" />
        </div>
      </div>
  );
}

