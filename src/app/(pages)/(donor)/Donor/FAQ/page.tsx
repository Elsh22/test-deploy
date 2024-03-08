"use client";
import React from 'react';
import Link from 'next/link'

const faqData = [
  {
    question: 'How can I donate?',
    answer: 'There are many ways to donate. You can donate online, by phone, or by mail. You can also make a gift of stock or include us in your will. Visit our Ways to Give page to learn more about each option.',
  },
];

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen mt-10">
      <div className="mb-10">
      <Link href="/Donor" >
        <button className=" mt-5">Back</button>
      </Link>
        <h1 className="text-3xl font-semibold mb-6 ">Frequently Asked Questions</h1>
      </div>
      
      <div className="w-full  mx-auto space-y-6">
        {faqData.map((faq, index) => (
          <details key={index} className="group bg-white border border-gray-300 rounded-md p-6">
            <summary className="text-lg cursor-pointer font-medium flex justify-between items-center text-black">
              {faq.question}
              <span className="transition-transform transform group-open:rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 text-black">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 ">Contact Information</h2>
        <div className="space-y-2 text-lg">
          <p>Phone: 571-830-8084</p>
          <p>Email: vcu.dmc@gmail.com</p>
          <p>Mail: 900 Park Ave, Richmond, VA 23284</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
