'use client';
import React from 'react';
import Image from 'next/image';

import Naod from '../../../../assets/Naod2025.jpg';

const MembershipChairPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-white px-6 py-16 gap-10 pt-28">
      
      {/* Left Side - Full Picture with LinkedIn */}
      <div className="w-full md:w-1/2 flex justify-center">
        <a
          href="https://www.linkedin.com/in/naod-daniel/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:shadow-[0_0_30px_#FFD700] rounded-lg"
        >
          <Image
            src={Naod}
            alt="Naod Daniel"
            className="rounded-lg shadow-lg w-full h-auto object-contain cursor-pointer"
          />
        </a>
      </div>

      {/* Right Side - Bio */}
      <div className="w-full md:w-1/2 text-black flex flex-col justify-center">
        <h1 className="text-8xl font-extrabold text-center mb-4">
          Naod Daniel
        </h1>
        <h2 className="text-6xl font-semibold text-center mb-8">
          Membership Chair
        </h2>
        
        <ul className="list-disc list-inside space-y-3 text-3xl leading-relaxed">
          <li>Mechanical Engineering major</li>
          <li>Member, National Society of Black Engineers (NSBE)</li>
          <li>Member, Eritrean Student Association (ESA)</li>
          <li>Junior</li>
          <li>
            Long-term goal: take over father’s construction business and grow it into a 
            multi-million-dollar company using an engineering background to expand, modernize, and create opportunities
          </li>
          <li>
            Email:{" "}
            <a 
              href="mailto:danielnt@vcu.edu" 
              className="text-blue-600 hover:underline"
            >
              danielnt@vcu.edu
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MembershipChairPage;
