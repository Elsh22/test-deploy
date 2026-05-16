"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Mail, MapPin, Phone } from "lucide-react";

const faqData = [
  {
    question: "How can I donate?",
    answer:
      "Use the secure donation form on the donor page. You can choose a preset amount or enter a custom amount before continuing to Stripe Checkout.",
  },
  {
    question: "What does my donation support?",
    answer:
      "Donations support professional attire events, academic resources, general body meetings, workshops, mentorship, scholarships, and community service programming.",
  },
  {
    question: "Can I ask about sponsorships or in-kind support?",
    answer:
      "Yes. Reach out to DMC by email and we can discuss sponsorships, partnerships, supplies, attire donations, or program-specific support.",
  },
];

const Page = () => {
  return (
    <main className="dmc-dark-section min-h-screen px-6 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Link href="/Donor" className="mb-8 inline-flex items-center gap-3 font-black text-yellow-400 transition hover:text-yellow-300">
          <ArrowLeft className="h-5 w-5" />
          Back to Donate
        </Link>

        <div className="mb-12">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-yellow-400">
            Donor FAQ
          </p>
          <h1 className="text-5xl font-black leading-tight md:text-7xl">
            Questions before giving.
          </h1>
          <p className="dmc-muted mt-5 max-w-3xl text-lg leading-8">
            A quick guide to how donations work and how to contact DMC about
            larger gifts or partnerships.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq) => (
            <details key={faq.question} className="dmc-card group border p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-black">
                {faq.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-yellow-400 transition group-open:rotate-180" />
              </summary>
              <p className="dmc-muted mt-4 leading-7">{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="dmc-card-solid mt-10 grid gap-5 border p-6 md:grid-cols-3">
          <a href="tel:5718308084" className="flex items-center gap-3 font-bold transition hover:text-yellow-400">
            <Phone className="h-5 w-5 text-yellow-400" />
            571-830-8084
          </a>
          <a href="mailto:vcu.dmc@gmail.com" className="flex items-center gap-3 font-bold transition hover:text-yellow-400">
            <Mail className="h-5 w-5 text-yellow-400" />
            vcu.dmc@gmail.com
          </a>
          <p className="flex items-center gap-3 font-bold">
            <MapPin className="h-5 w-5 text-yellow-400" />
            900 Park Ave, Richmond, VA 23284
          </p>
        </div>
      </div>
    </main>
  );
};

export default Page;
