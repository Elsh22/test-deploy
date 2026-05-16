"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, BriefcaseBusiness, HandHeart, LockKeyhole, UsersRound } from "lucide-react";
import CheckoutForm from "../../../../components/Donor/CheckoutForm";
import DonorImage from "../../../../assets/DMCMIXER8/DMCMIXER20.jpg";

const impactItems = [
  {
    icon: BriefcaseBusiness,
    title: "Professional attire",
    text: "Suits, dress shirts, ties, shoes, and confidence-building career events.",
  },
  {
    icon: BookOpen,
    title: "Academic resources",
    text: "Study sessions, resource fairs, workshops, and tools members can use immediately.",
  },
  {
    icon: UsersRound,
    title: "Mentorship and service",
    text: "Programs that connect members with guidance, community service, and leadership opportunities.",
  },
];

export default function DonationPage(): JSX.Element {
  return (
    <main className="dmc-dark-section">
      <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:px-8 lg:px-12">
        <div className="absolute inset-0">
          <Image src={DonorImage} alt="DMC community event" fill priority className="object-cover opacity-35" />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.78)_48%,rgba(0,0,0,0.42)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 border border-yellow-400/35 bg-black/35 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-yellow-300">
              <HandHeart className="h-4 w-4" />
              DMC Donor Portal
            </div>
            <h1 className="text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-8xl">
              Invest in the next generation of men of color.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-200 md:text-xl">
              For over eight years, DMC has supported students through professional
              development, academic guidance, service, mentorship, and brotherhood.
              Your donation helps us expand that work.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-4xl font-black text-yellow-300">900+</p>
                <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-gray-300">Active members</p>
              </div>
              <div className="border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-4xl font-black text-yellow-300">400+</p>
                <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-gray-300">Alumni</p>
              </div>
              <div className="border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-4xl font-black text-yellow-300">8</p>
                <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-gray-300">Years of impact</p>
              </div>
            </div>
          </div>

          <div className="dmc-card-solid border p-6 shadow-2xl md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-500">
                  Secure donation
                </p>
                <h2 className="mt-2 text-3xl font-black">Make a gift</h2>
              </div>
              <LockKeyhole className="h-7 w-7 text-yellow-500" />
            </div>
            <CheckoutForm uiMode="hosted" />
            <p className="dmc-muted mt-5 text-sm leading-6">
              You will be redirected to Stripe Checkout to complete your donation.
            </p>
          </div>
        </div>
      </section>

      <section className="dmc-light-section px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-yellow-600">
                Where your gift goes
              </p>
              <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                Practical support members can feel.
              </h2>
            </div>
            <p className="dmc-muted max-w-md text-lg leading-8">
              Donations support programs that remove barriers, create access, and help
              members build momentum.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {impactItems.map(({ icon: Icon, title, text }) => (
              <div key={title} className="dmc-card-solid border p-6">
                <Icon className="mb-5 h-8 w-8 text-yellow-500" />
                <h3 className="text-2xl font-black">{title}</h3>
                <p className="dmc-muted mt-3 leading-7">{text}</p>
              </div>
            ))}
          </div>

          <div className="dmc-card mt-10 border p-6 md:p-8">
            <h3 className="text-3xl font-black">Questions before giving?</h3>
            <p className="dmc-muted mt-3 max-w-3xl leading-7">
              We are happy to talk through partnerships, sponsorships, in-kind support,
              or how your contribution can support a specific program.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/Donor/FAQ" className="inline-flex items-center justify-center gap-3 bg-yellow-400 px-6 py-4 font-black text-black transition hover:bg-black hover:text-white">
                Donation FAQ
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/#contact" className="inline-flex items-center justify-center gap-3 border border-[var(--dmc-border)] px-6 py-4 font-black transition hover:border-yellow-400 hover:text-yellow-500">
                Contact DMC
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
