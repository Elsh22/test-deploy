'use client';
import React from 'react';
import Image from 'next/image';

import Sam from '../../../../assets/Sam2025.jpg';

const WellnessDirectorPage = () => {
   return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-white px-6 py-16 gap-10 pt-28">
      
      {/* Left Side - Full Picture with LinkedIn */}
      <div className="w-full md:w-1/2 flex justify-center">
        <a
          href="https://www.linkedin.com/in/samuel-brannen-ba47b82b4/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:shadow-[0_0_30px_#FFD700] rounded-lg"
        >
          <Image
            src={Sam}
            alt="Samuel Brannen"
            className="rounded-lg shadow-lg w-full h-auto object-contain cursor-pointer"
          />
        </a>
      </div>

      {/* Right Side - Bio */}
      <div className="w-full md:w-1/2 text-black flex flex-col justify-center">
        <h1 className="text-8xl font-extrabold text-center mb-4">
          Samuel Brannen
        </h1>
        <h2 className="text-6xl font-semibold text-center mb-8">
          Wellness Director
        </h2>
        
        <ul className="list-disc list-inside space-y-3 text-3xl leading-relaxed">
          <li>Computer Science major with a concentration in Cybersecurity</li>
          <li>Junior</li>
          <li>Member, NSBA</li>
          <li>Plans: pursue a career in Cybersecurity</li>
          <li>
            Instagram:{" "}
            <a
              href="https://instagram.com/samuellbrannen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              @samuellbrannen
            </a>
          </li>
          <li>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/samuel-brannen-ba47b82b4/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              samuel-brannen
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WellnessDirectorPage;
