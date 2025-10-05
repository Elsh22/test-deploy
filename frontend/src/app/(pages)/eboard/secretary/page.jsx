'use client';
import React from 'react';
import Image from 'next/image';

import Kabir from '../../../../assets/EBOARD2025/Kabir2025.jpg';

const SecretaryPage = () => {
    return (
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-white px-6 py-16 gap-10 pt-28">
        
        {/* Left Side - Full Picture with LinkedIn */}
        <div className="w-full md:w-1/2 flex justify-center">
          <a
            href="https://www.linkedin.com/in/kabir-munjwani-2389bb319/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:shadow-[0_0_30px_#FFD700] rounded-lg"
          >
            <Image
              src={Kabir}
              alt="Kabir Munjwani"
              className="rounded-lg shadow-lg w-full h-auto object-contain cursor-pointer"
            />
          </a>
        </div>
  
        {/* Right Side - Bio */}
        <div className="w-full md:w-1/2 text-black flex flex-col justify-center">
          <h1 className="text-8xl font-extrabold text-center mb-4">
            Kabir Munjwani
          </h1>
          <h2 className="text-6xl font-semibold text-center mb-8">
            Secretary
          </h2>
          
          <ul className="list-disc list-inside space-y-3 text-3xl leading-relaxed">
            <li>Major: HPEX major with a concentration in Health Science, Chemistry minor, Pre-Dental track</li>
            <li>Class: Senior</li>
            <li>Org Position: President, Katie’s Art Project Chapter at VCU</li>
            <li>Future plans: Attend dental school</li>
            <li>
              Email:{" "}
              <a 
                href="mailto:munjwanikp@vcu.edu" 
                className="text-blue-600 hover:underline"
              >
                munjwanikp@vcu.edu
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default SecretaryPage;
