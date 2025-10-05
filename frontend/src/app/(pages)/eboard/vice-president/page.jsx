'use client';
import React from 'react';
import Image from 'next/image';

import Xavier from '../../../../assets/EBOARD2025/Xavier2025.jpg';

const VicePresidentPage = () => {
   return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-white px-6 py-16 gap-10 pt-28">
      
      {/* Left Side - Full Picture with LinkedIn */}
      <div className="w-full md:w-1/2 flex justify-center">
        <a
          href="https://www.linkedin.com/in/xaviermlewis/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:shadow-[0_0_30px_#FFD700] rounded-lg"
        >
          <Image
            src={Xavier}
            alt="Xavier Lewis"
            className="rounded-lg shadow-lg w-full h-auto object-contain cursor-pointer"
          />
        </a>
      </div>

      {/* Right Side - Bio */}
      <div className="w-full md:w-1/2 text-black flex flex-col justify-center">
        <h1 className="text-8xl font-extrabold text-center mb-4">
          Xavier Lewis
        </h1>
        <h2 className="text-6xl font-semibold text-center mb-8">
          Vice President
        </h2>
        
        <ul className="list-disc list-inside space-y-3 text-3xl leading-relaxed">
          <li>Major: Biology major, with minors in Chemistry and Pre-Dentistry</li>
          <li>Class: Senior</li>
          <li>Org Position: President, Eta Xi Chapter of Kappa Alpha Psi Fraternity, Inc.</li>
          <li>Org Position: Pre-Dental Ambassador, Black Men in Medicine</li>
          <li>Org Position: Academic Chair, National Pan-Hellenic Council</li>
          <li>Future plans: Attend dental school and attain a D.D.S.</li>
          <li>
            Email:{" "}
            <a 
              href="mailto:lewisxm@vcu.edu" 
              className="text-blue-600 hover:underline"
            >
              lewisxm@vcu.edu
            </a>
          </li>
          <li>
            Instagram:{" "}
            <a 
              href="https://instagram.com/xvrlws" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline"
            >
              @xvrlws
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VicePresidentPage;
