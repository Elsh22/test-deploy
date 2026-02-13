"use client";
import React from "react";
import CheckoutForm from "../../../../components/Donor/CheckoutForm";

export default function DonationPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top gold bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600" />

      <div className="mx-auto max-w-5xl px-6 md:px-12 py-12 md:py-16">

        {/* HEADER */}
        <div className="mb-10">
          <p className="text-yellow-400 font-semibold tracking-widest uppercase text-sm">
            DMC Donor Portal
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
            Our Mission Statement
          </h1>

          <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600" />
        </div>

        {/* MISSION TEXT */}
        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-200">
          <p>
            <span className="font-bold text-yellow-400">For over eight years</span>, our student organization
            has been dedicated to the holistic development of men of color—fostering growth in professional,
            social, academic, and community engagement spheres. Since our foundation in September 2018,
            we’ve grown to over <span className="font-semibold text-white">900+ active members</span> and supported{" "}
            <span className="font-semibold text-white">400+ alumni</span>.
          </p>

          <p>
            <span className="font-bold text-yellow-400">With your support</span>, we can continue our mission to
            empower and uplift our members, providing opportunities for personal and professional advancement.
            Your donation enables us to expand our reach and provide vital resources to students and professionals alike.
          </p>

          <p>
            <span className="font-bold text-yellow-400">Join us</span> in cultivating excellence and creating
            positive change. With your generosity, we can continue to make a lasting difference in the lives
            of men of color—locally and beyond.
          </p>
        </div>

        {/* WHERE DONATION GOES */}
        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400">
            Where your donation goes
          </h2>

          <ul className="space-y-4 text-lg md:text-xl text-gray-200 leading-relaxed list-disc pl-6">
            <li>
              <span className="font-semibold text-white">Professional Attire Events:</span>{" "}
              Providing suits, dress shirts, ties, shoes, and attire-focused development events.
            </li>

            <li>
              <span className="font-semibold text-white">Resource Rally Events:</span>{" "}
              Supporting professional development, academic resources, and career readiness programming.
            </li>

            <li>
              <span className="font-semibold text-white">General Body Meetings:</span>{" "}
              Funding large gatherings, venues, refreshments, and engagement programming.
            </li>

            <li>
              <span className="font-semibold text-white">Workshops & Training:</span>{" "}
              Adobe, technology, and professional development workshops for members.
            </li>

            <li>
              <span className="font-semibold text-white">Programs & Initiatives:</span>{" "}
              Networking events, mentorship programs, scholarships, and community service.
            </li>
          </ul>

          <p className="mt-8 text-gray-200 text-lg leading-relaxed">
            By donating, you’re directly supporting the success and empowerment of men of color in our community.
            Your support strengthens future leaders and expands the opportunities we provide at DMC.
          </p>
        </div>

        {/* DONATION BOX BELOW EVERYTHING */}
        <div className="mt-16 rounded-2xl border border-yellow-400/20 bg-white/5 p-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400">
            Make a Donation
          </h2>

          <p className="text-gray-200 mt-3 text-lg">
            Every contribution helps us build programs, mentorship, and opportunities that change lives.
          </p>

          <div className="mt-6">
            <CheckoutForm uiMode="hosted" />
          </div>

          <p className="mt-6 text-sm text-gray-400">
            Secure checkout • Your support powers DMC programming and community impact.
          </p>
        </div>

        {/* Bottom gold accent */}
        <div className="mt-10 h-2 w-full rounded-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600" />

      </div>
    </div>
  );
}
