'use client';
import React from 'react';
import Image from 'next/image';

import Sam from '../../../../assets/Sam2025.jpg';

const WellnessDirectorPage = () => {
  return (
    <div className="min-h-screen bg-white py-20 px-6 flex justify-center items-start">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Picture on the left */}
        <div className="flex justify-center">
          <div className="w-64 h-64 rounded-full overflow-hidden shadow-xl border-4 border-yellow-500">
            <Image
              src={Sam}
              alt="Goode"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Bio on the right */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Samuel Brannen
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            {/* Replace this with the actual bio */}
            
          </p>
        </div>

      </div>
    </div>
  );
};

export default WellnessDirectorPage;
