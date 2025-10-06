'use client';
import React from 'react';
import Image from 'next/image';
import Goode from '../../../../assets/EBOARD2025/Goode2025.jpg';

const DrGoodePage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-black px-6 py-16 gap-10">
      
      {/* Left Side - Picture */}
      <div className="w-full md:w-1/2 flex justify-center">
        <a
          href="https://www.linkedin.com/in/carlton-goode-ed-d-69172815/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg"
        >
          <Image
            src={Goode}
            alt="Dr. Carlton Goode"
            className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover cursor-pointer"
          />
        </a>
      </div>

      {/* Right Side - Bio */}
      <div className="w-full md:w-1/2 text-white flex flex-col justify-center max-w-lg">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-2 text-center md:text-left">
          Dr. Carlton Goode
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-yellow-400 text-center md:text-left">
          Faculty Advisor
        </h2>
        
        <ul className="list-disc list-inside space-y-2 text-lg md:text-xl leading-relaxed">
          <li>Director of Intercultural Success & Initiatives</li>
          <li>Bachelor of Arts in Psychology — Shaw University</li>
          <li>Master of Science in Student Development — University of Iowa</li>
          <li>Doctorate in Education Leadership — Virginia Commonwealth University</li>
          <li>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/carlton-goode-ed-d-69172815/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Dr. Carlton Goode
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DrGoodePage;
