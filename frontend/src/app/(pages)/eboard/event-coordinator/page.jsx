'use client';
import React from 'react';
import Image from 'next/image';
import Clyde from '../../../../assets/EBOARD2025/Clyde2025.jpg';

const ClydeClarkPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-black px-6 py-16 gap-10">
      
      {/* Left Side - Picture */}
      <div className="w-full md:w-1/2 flex justify-center">
        <a
          href="https://www.linkedin.com/in/clyde-clark-iii-9072b6202/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg"
        >
          <Image
            src={Clyde}
            alt="Clyde Clark III"
            className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover cursor-pointer"
          />
        </a>
      </div>

      {/* Right Side - Bio */}
      <div className="w-full md:w-1/2 text-white flex flex-col justify-center max-w-lg">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-2 text-center md:text-left">
          Clyde Clark III
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-yellow-400 text-center md:text-left">
          President
        </h2>
        
        <ul className="list-disc list-inside space-y-2 text-lg md:text-xl leading-relaxed">
          <li>Major: Political Science / Pre-Law</li>
          <li>Class: Senior</li>
          <li>Org Positions: DMC, Student Government Association</li>
          <li>Future Plans: pursue a career in law or public policy</li>
          <li>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/clyde-clark-iii-9072b6202/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Clyde Clark III
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ClydeClarkPage;
