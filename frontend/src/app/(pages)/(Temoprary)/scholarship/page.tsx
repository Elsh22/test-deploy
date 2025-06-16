import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import Img from '../../../../newassest/social2.png';
import { AttachMoney, School, Diversity3, AttachMoneySharp, DateRange } from '@mui/icons-material';

const ScholarshipPage = () => {
  return (
    <div className="min-h-screen bg-dmc-light-gray">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-dmc-black via-dmc-charcoal to-dmc-black text-dmc-white pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h1 className="text-dmc-hero font-dmc-primary text-dmc-gold mb-6">
                DMC Scholarship Program
              </h1>
              <p className="text-dmc-h4 text-dmc-silver mb-8 leading-relaxed">
                This scholarship opportunity provides a <span className="text-dmc-gold font-bold">$1,000 award</span> to 
                individuals who are current members of the DMC. Applicants must demonstrate a financial need for the scholarship.
              </p>
              <Link href="/scholarship/apply" passHref>
                <button className="btn-dmc-primary text-lg px-8 py-4 mr-4">
                  Apply Now
                </button>
              </Link>
              <Link href="/Donor" passHref>
                <button className="btn-dmc-secondary text-lg px-8 py-4">
                  Support Our Scholarship
                </button>
              </Link>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-dmc-gold/20 rounded-dmc-xl transform -rotate-3"></div>
              <Image
                src={Img}
                alt="DMC Scholarship Recipients"
                width={600}
                height={400}
                className="relative rounded-dmc-xl shadow-dmc-elegant border-4 border-dmc-gold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-dmc-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Eligibility Section */}
          <div className="mb-16">
            <h2 className="text-dmc-h1 font-dmc-primary text-dmc-gold text-center mb-12">
              Eligibility Requirements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-dmc group">
                <div className="w-16 h-16 bg-dmc-gold rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <AttachMoney className="w-8 h-8 text-dmc-black" />
                </div>
                <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-4">Financial Need</h3>
                <p className="text-dmc-body text-dmc-dark-gray leading-relaxed">
                  Demonstrate financial need through a personal statement and optional reference letter. 
                  We understand the financial challenges students face and aim to support those who need it most.
                </p>
              </div>

              <div className="card-dmc group">
                <div className="w-16 h-16 bg-dmc-gold rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <School className="w-8 h-8 text-dmc-black" />
                </div>
                <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-4">DMC Membership</h3>
                <p className="text-dmc-body text-dmc-dark-gray leading-relaxed">
                  Must be enrolled at Virginia Commonwealth University and be an active member of 
                  Developing Men of Color at VCU with demonstrated engagement in our programs.
                </p>
              </div>
            </div>
          </div>

          {/* Application Process */}
          <div className="mb-16">
            <h2 className="text-dmc-h1 font-dmc-primary text-dmc-gold text-center mb-12">
              Application Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-dmc group">
                <div className="w-16 h-16 bg-dmc-gold rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <AttachMoneySharp className="w-8 h-8 text-dmc-black" />
                </div>
                <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-4">Application Timeline</h3>
                <p className="text-dmc-body text-dmc-dark-gray leading-relaxed">
                  The application process begins on March 18, with submissions due by April 11. 
                  Our review and interview phase runs from April 12-17, followed by winner announcements on April 18.
                  Ensure your application is comprehensive and submitted within the deadline.
                </p>
              </div>

              <div className="card-dmc group">
                <div className="w-16 h-16 bg-dmc-gold rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Diversity3 className="w-8 h-8 text-dmc-black" />
                </div>
                <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-4">Interview Process</h3>
                <p className="text-dmc-body text-dmc-dark-gray leading-relaxed">
                  If selected as a finalist, you will participate in an interview with our scholarship committee. 
                  This allows us to better understand your needs, qualifications, and how the scholarship will impact your educational journey.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h2 className="text-dmc-h1 font-dmc-primary text-dmc-gold text-center mb-12">
              Application Timeline
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-dmc-gold"></div>
                
                {/* Timeline items */}
                <div className="space-y-12">
                  <div className="relative flex items-center">
                    <div className="w-16 h-16 bg-dmc-gold rounded-full flex items-center justify-center mr-8 flex-shrink-0 shadow-dmc-gold">
                      <DateRange className="w-8 h-8 text-dmc-black" />
                    </div>
                    <div className="bg-dmc-light-gray p-6 rounded-dmc-lg flex-1">
                      <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-2">Applications Open</h3>
                      <p className="text-dmc-body text-dmc-dark-gray">March 18, 2024</p>
                      <p className="text-sm text-dmc-medium-gray mt-2">Begin your application and gather required materials</p>
                    </div>
                  </div>

                  <div className="relative flex items-center">
                    <div className="w-16 h-16 bg-dmc-gold rounded-full flex items-center justify-center mr-8 flex-shrink-0 shadow-dmc-gold">
                      <DateRange className="w-8 h-8 text-dmc-black" />
                    </div>
                    <div className="bg-dmc-light-gray p-6 rounded-dmc-lg flex-1">
                      <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-2">Applications Close</h3>
                      <p className="text-dmc-body text-dmc-dark-gray">April 11, 2024</p>
                      <p className="text-sm text-dmc-medium-gray mt-2">Final deadline for all application materials</p>
                    </div>
                  </div>

                  <div className="relative flex items-center">
                    <div className="w-16 h-16 bg-dmc-gold rounded-full flex items-center justify-center mr-8 flex-shrink-0 shadow-dmc-gold">
                      <DateRange className="w-8 h-8 text-dmc-black" />
                    </div>
                    <div className="bg-dmc-light-gray p-6 rounded-dmc-lg flex-1">
                      <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-2">Winners Announced</h3>
                      <p className="text-dmc-body text-dmc-dark-gray">April 18, 2024</p>
                      <p className="text-sm text-dmc-medium-gray mt-2">Scholarship recipients will be notified</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-dmc-black to-dmc-charcoal rounded-dmc-xl p-12">
              <h3 className="text-dmc-h2 font-dmc-primary text-dmc-gold mb-4">
                Ready to Apply?
              </h3>
              <p className="text-dmc-body text-dmc-silver mb-8 max-w-2xl mx-auto leading-relaxed">
                Take the first step towards your educational goals. Our scholarship program is designed 
                to support dedicated DMC members in their academic journey and future success.
              </p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <Link href="/scholarship/apply" passHref>
                  <button className="btn-dmc-primary text-lg px-12 py-4 w-full sm:w-auto">
                    Start Your Application
                  </button>
                </Link>
                <Link href="/#contact" passHref>
                  <button className="btn-dmc-secondary text-lg px-12 py-4 w-full sm:w-auto">
                    Have Questions?
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipPage;