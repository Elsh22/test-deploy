'use client';
import React from 'react';
import Image from 'next/image';

import Xavier from '../../../../assets/Xavier2025.jpg';

const VicePresidentPage = () => {
   return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-white px-6 py-16 gap-10 pt-28">
      
      {/* Left Side - Full Picture */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={Xavier}
          alt="Xavier Lewis"
          className="rounded-lg shadow-lg w-full h-auto object-contain"
        />
      </div>

      {/* Right Side - Bio */}
      <div className="w-full md:w-1/2 text-black flex flex-col justify-center">
        <h1 className="text-8xl font-extrabold text-center mb-4">
          Xavier Lewis
        </h1>
        <h2 className="text-6xl font-semibold text-center mb-8">
          Vice President
        </h2>
        <p className="text-lg leading-relaxed text-justify">
          
        </p>
      </div>
    </div>
  );
};

export default VicePresidentPage;
