'use client';
import React from 'react';
import Image from 'next/image';

import Clyde from '../../../../assets/Clyde2025.jpg';

const EventCoordinatorPage = () => {
   return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-white px-6 py-16 gap-10 pt-28">
      
      {/* Left Side - Full Picture with LinkedIn */}
      <div className="w-full md:w-1/2 flex justify-center">
        <a
          href="https://www.linkedin.com/in/clyde-clark-iii-a0185122b/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:shadow-[0_0_30px_#FFD700] rounded-lg"
        >
          <Image
            src={Clyde}
            alt="Clyde Clark III"
            className="rounded-lg shadow-lg w-full h-auto object-contain cursor-pointer"
          />
        </a>
      </div>

      {/* Right Side - Bio */}
      <div className="w-full md:w-1/2 text-black flex flex-col justify-center">
        <h1 className="text-8xl font-extrabold text-center mb-4">
          Clyde Clark III
        </h1>
        <h2 className="text-6xl font-semibold text-center mb-8">
          Event Coordinator
        </h2>
        
        <ul className="list-disc list-inside space-y-3 text-3xl leading-relaxed">
          <li>Major: Business Management major with a focus in Finance</li>
          <li>Class: Junior</li>
          <li>Org Positions: VCU Professional Selling Team, VCU Young Democrats</li>
          <li>Future Plans: Pursue a career in Banking</li>
          <li>
            Instagram:{" "}
            <a
              href="https://instagram.com/clyde.c3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              @clyde.c3
            </a>
          </li>
          <li>
            Email:{" "}
            <a
              href="mailto:clarkct2@vcu.edu"
              className="text-blue-600 hover:underline"
            >
              clarkct2@vcu.edu
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EventCoordinatorPage;
