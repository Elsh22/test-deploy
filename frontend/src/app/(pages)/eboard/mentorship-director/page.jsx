'use client';
import React from 'react';
import Image from 'next/image';

import Thurman from '../../../../assets/Thurman.jpg';

const MentorshipDirectorPage = () => {
   return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-white px-6 py-16 gap-10 pt-28">
      
      {/* Left Side - Full Picture with LinkedIn */}
      <div className="w-full md:w-1/2 flex justify-center">
        <a
          href="https://www.linkedin.com/in/thurmansmithjr/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:shadow-[0_0_30px_#FFD700] rounded-lg"
        >
          <Image
            src={Thurman}
            alt="Thurman Smith Jr."
            className="rounded-lg shadow-lg w-full h-auto object-contain cursor-pointer"
          />
        </a>
      </div>

      {/* Right Side - Bio */}
      <div className="w-full md:w-1/2 text-black flex flex-col justify-center">
        <h1 className="text-8xl font-extrabold text-center mb-4">
          Thurman Smith Jr.
        </h1>
        <h2 className="text-6xl font-semibold text-center mb-8">
          Mentorship Director
        </h2>
        
        <ul className="list-disc list-inside space-y-3 text-3xl leading-relaxed">
          <li>Bachelor of Science in Electrical Engineering</li>
          <li>Junior, Class of 2027</li>
          <li>Vice President, National Society of Black Engineers @ VCU</li>
          <li>Vice President, Black Student Union @ VCU</li>
          <li>
            Plans: Work with father as an Electrical Contractor or pursue a career as an Electrical Design Engineer
          </li>
          <li>
            School Email:{" "}
            <a
              href="mailto:smithjrte@vcu.edu"
              className="text-blue-600 hover:underline"
            >
              smithjrte@vcu.edu
            </a>
          </li>
          <li>
            Work Email:{" "}
            <a
              href="mailto:tjsmithjr125@gmail.com"
              className="text-blue-600 hover:underline"
            >
              tjsmithjr125@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MentorshipDirectorPage;
