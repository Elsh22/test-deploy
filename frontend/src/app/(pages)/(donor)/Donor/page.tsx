"use client"
import React from 'react';
import CheckoutForm from '../../../../components/Donor/CheckoutForm';

export default function DonationPage(): JSX.Element {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
      <div className="flex flex-col justify-center p-6 mt-10">
        <h1 className="text-3xl font-bold mb-6">Our Mission Statement</h1>
        <h2 className="mb-4 text-2xl">
         <strong>For over five years</strong>, our student organization has been dedicated to the holistic development of men of color,
          fostering growth in professional, social, academic, and community engagement spheres. Since our foundation
          in September 2018, we've grown to over 550 active members and supported 200 alumni.
        </h2>
        <h2 className="mb-4 text-2xl">
          <strong>With your support</strong>, we can continue our mission to empower and uplift our members, providing invaluable opportunities
          for personal and professional advancement. Together, we can strengthen our commitment to developing future leaders
          who will positively impact their communities. Your donation will enable us to expand our reach, offer more programs,
          and provide vital resources to students and professionals alike.
        </h2>
        <h2 className="mb-4 text-2xl">
         <strong>Join us</strong> in our journey to cultivate excellence and foster positive change. With your generosity, we can continue
          to make a lasting difference in the lives of men of color, both locally and globally.
        </h2>

        <h2 className="text-2xl font-semibold mb-4">Breakdown of where funds will be allocated:</h2>
        <h3 className="font-bold text-xl">Professional Attire Events:</h3>
        <p className="mb-2 text-xl">Organizing events for professional attire, including suits, dress shirts, ties, and shoes.</p>
        <h3 className="font-bold text-xl">Resource Rally Events:</h3>
        <p className="mb-2">Supporting regular meetings for professional and personal development, career services, academic support, and more.</p>
        <h3 className="font-bold text-xl">General Body Meetings:</h3>
        <p className="mb-2">Funding for regular large gatherings, venue rental, refreshments, and audio-visual equipment.</p>
        <h3 className="font-bold  text-xl">Adobe and Professional Workshops:</h3>
        <p className="mb-2">Workshops for professional skills development including Adobe software training and more.</p>
        <h3 className="font-bold text-xl">Other Programs and Initiatives:</h3>
        <p className="mb-2">Supporting networking events, mentorship programs, scholarship opportunities, and community service projects.</p>
        
        <p className="mt-4 text-xl">
          By donating to our organization, you're directly contributing to the success and empowerment of men of color in our community.
          Your support enables us to continue providing valuable resources and opportunities that help our members thrive personally and professionally.
          Together, we can make a meaningful difference in the lives of aspiring leaders and change-makers.
        </p>
      </div>

      <div className="flex flex-col justify-center bg-gray-100 p-6">
        <h2 className="text-3xl font-bold mb-6 text-black">Join Our Mission to Make a Difference</h2>
        <CheckoutForm uiMode='hosted' />
      </div>
    </div>
  );
}

/*
<Link href="/Donor/FAQ" >
        <button className="bg-blue-500 text-white mt-5 mb-10">FAQ</button>
      </Link>
*/