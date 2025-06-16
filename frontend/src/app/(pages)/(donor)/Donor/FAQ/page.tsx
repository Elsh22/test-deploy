"use client";
import React from 'react';
import Link from 'next/link'
import { AiOutlinePhone, AiOutlineMail, AiOutlineEnvironment, AiOutlineArrowLeft } from 'react-icons/ai';

const faqData = [
  {
    question: 'How can I donate to DMC?',
    answer: 'There are many ways to support DMC. You can donate online through our secure donation portal, by phone, or by mail. You can also make a gift of stock or include us in your will. Visit our donation page to learn more about each option and choose what works best for you.',
  },
  {
    question: 'Is my donation tax-deductible?',
    answer: 'Yes! DMC is a 501(c)(3) non-profit organization. All donations are tax-deductible to the full extent allowed by law. You will receive a receipt for your donation that you can use for tax purposes.',
  },
  {
    question: 'How will my donation be used?',
    answer: 'Your donation directly supports our programs including professional development workshops, academic support, community service initiatives, mentorship programs, and scholarship opportunities for our members. We are committed to transparency and can provide detailed information about how funds are allocated.',
  },
  {
    question: 'Can I make a recurring donation?',
    answer: 'Absolutely! Recurring donations help us plan and provide consistent support to our programs. You can set up monthly or annual recurring donations through our online portal.',
  },
  {
    question: 'Do you accept corporate sponsorships?',
    answer: 'Yes, we welcome partnerships with corporations that share our values and mission. Corporate sponsorships help fund our major events and programs. Please contact us to discuss sponsorship opportunities.',
  },
];

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-dmc-light-gray">
      {/* Header */}
      <div className="bg-gradient-to-r from-dmc-black via-dmc-charcoal to-dmc-black text-dmc-white pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/Donor" className="inline-flex items-center text-dmc-silver hover:text-dmc-gold transition-colors duration-300 mb-6">
            <AiOutlineArrowLeft className="w-5 h-5 mr-2" />
            Back to Donation Page
          </Link>
          <h1 className="text-dmc-hero font-dmc-primary text-dmc-gold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-dmc-h4 text-dmc-silver">
            Everything you need to know about supporting DMC
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="bg-dmc-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-6 mb-16">
            {faqData.map((faq, index) => (
              <details key={index} className="group bg-dmc-light-gray border-2 border-dmc-silver rounded-dmc-lg overflow-hidden hover:border-dmc-gold transition-all duration-300">
                <summary className="text-dmc-h4 cursor-pointer font-medium flex justify-between items-center text-dmc-black p-6 hover:bg-dmc-gold hover:text-dmc-black transition-all duration-300">
                  <span>{faq.question}</span>
                  <span className="transition-transform transform group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="p-6 pt-0 bg-dmc-white">
                  <p className="text-dmc-body text-dmc-dark-gray leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-dmc-black to-dmc-charcoal rounded-dmc-xl p-8">
            <h2 className="text-dmc-h2 font-dmc-primary text-dmc-gold mb-8 text-center">
              Still Have Questions?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-dmc-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <AiOutlinePhone className="w-8 h-8 text-dmc-black" />
                </div>
                <h3 className="text-dmc-h4 font-dmc-primary text-dmc-white mb-2">Call Us</h3>
                <p className="text-dmc-body text-dmc-silver">571-830-8084</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-dmc-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <AiOutlineMail className="w-8 h-8 text-dmc-black" />
                </div>
                <h3 className="text-dmc-h4 font-dmc-primary text-dmc-white mb-2">Email Us</h3>
                <p className="text-dmc-body text-dmc-silver">vcu.dmc@gmail.com</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-dmc-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <AiOutlineEnvironment className="w-8 h-8 text-dmc-black" />
                </div>
                <h3 className="text-dmc-h4 font-dmc-primary text-dmc-white mb-2">Visit Us</h3>
                <p className="text-dmc-body text-dmc-silver">900 Park Ave, Richmond, VA 23284</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
