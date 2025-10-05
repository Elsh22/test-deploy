'use client';
import React from 'react';
import Image from 'next/image';
import Kaleb from '../../../../assets/EBOARD2025/Kaleb2025.jpg';

const PresidentPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-white px-6 py-16 gap-10 pt-28">
      
      {/* Left Side - Full Picture with LinkedIn */}
      <div className="w-full md:w-1/2 flex justify-center">
        <a
          href="https://www.linkedin.com/in/kaleb--brown/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:shadow-[0_0_30px_#FFD700] rounded-lg"
        >
          <Image
            src={Kaleb}
            alt="Kaleb Brown"
            className="rounded-lg shadow-lg w-full h-auto object-contain cursor-pointer"
          />
        </a>
      </div>

      {/* Right Side - Bio */}
      <div className="w-full md:w-1/2 text-black flex flex-col justify-center">
        <h1 className="text-8xl font-extrabold text-center mb-4">
          Kaleb Brown
        </h1>
        <h2 className="text-6xl font-semibold text-center mb-8">
          President
        </h2>
        
        <ul className="list-disc list-inside space-y-3 text-3xl leading-relaxed">
          <li>Major: Information Systems major with a Sports Management minor</li>
          <li>Class: Junior</li>
          <li>Org Position: Students Providing Aid (SPAid) – Vice President</li>
          <li>Org Position: NSBE – Member</li>
          <li>
            Future Plans: pursue a career in IT or Business and eventually 
            create a scholarship fund to help students from his hometown break 
            financial barriers
          </li>
          <li>Phone: (757) 646-6483</li>
          <li>Work Email: <a href="mailto:Kalebbrown2023@gmaii.com" className="text-blue-600 hover:underline">Kalebbrown2023@gmaii.com</a></li>
          <li>School Email: <a href="mailto:Brownkj7@vcu.edu" className="text-blue-600 hover:underline">Brownkj7@vcu.edu</a></li>
        </ul>
      </div>
    </div>
  );
};

export default PresidentPage;

