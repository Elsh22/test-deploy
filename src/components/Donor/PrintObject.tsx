import type { Stripe } from "stripe";

export default function PrintObject({
  content,
}: {
  content: Stripe.PaymentIntent | Stripe.Checkout.Session;
}): JSX.Element {
  const formattedContent: string = JSON.stringify(content, null, 2);
  return <pre className="font-mono text-xs bg-gray-100 p-3 rounded-[var(--radius)] max-h-[500px] overflow-auto text-black">{formattedContent}</pre>;
}