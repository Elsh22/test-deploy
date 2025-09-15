'use client';
import React from 'react';
import Image from 'next/image';

import Paul from '../../../../assets/Paul2025.jpg';

const SocialMediaChairPage = () => {
   return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-white px-6 py-16 gap-10 pt-28">
      
      {/* Left Side - Full Picture with LinkedIn */}
      <div className="w-full md:w-1/2 flex justify-center">
        <a
          href="https://www.linkedin.com/in/paul-adeugba/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:shadow-[0_0_30px_#FFD700] rounded-lg"
        >
          <Image
            src={Paul}
            alt="Paul Adelugba"
            className="rounded-lg shadow-lg w-full h-auto object-contain cursor-pointer"
          />
        </a>
      </div>

      {/* Right Side - Bio */}
      <div className="w-full md:w-1/2 text-black flex flex-col justify-center">
        <h1 className="text-8xl font-extrabold text-center mb-4">
        Paul Adelugba
        </h1>
        <h2 className="text-6xl font-semibold text-center mb-8">
        Social Media Chair
        </h2>
        <p className="text-lg leading-relaxed text-justify">
          {/* Bio content here */}
        </p>
      </div>
    </div>
  );
};

export default SocialMediaChairPage;
