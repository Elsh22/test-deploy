'use client';
import React from 'react';
import Image from 'next/image';
import Naod from '../../../../assets/EBOARD2025/Naod2025.jpg';

const NaodTeklePage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-black px-6 py-16 gap-10">
      
      {/* Left Side - Picture */}
      <div className="w-full md:w-1/2 flex justify-center">
        <a
          href="https://www.linkedin.com/in/naod-tekle-12345678/" // Replace with Naod's actual LinkedIn
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg"
        >
          <Image
            src={Naod}
            alt="Naod Tekle"
            className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover cursor-pointer"
          />
        </a>
      </div>

      {/* Right Side - Bio */}
      <div className="w-full md:w-1/2 text-white flex flex-col justify-center max-w-lg">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-2 text-center md:text-left">
          Naod Tekle
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-yellow-400 text-center md:text-left">
          Vice President
        </h2>
        
        <ul className="list-disc list-inside space-y-2 text-lg md:text-xl leading-relaxed">
          <li>Major: Computer Science</li>
          <li>Class: Junior</li>
          <li>Org Positions: DMC, Coding Club</li>
          <li>Future Plans: pursue a career in software development or AI research</li>
          <li>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/naod-tekle-12345678/" // Replace with actual
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Naod Tekle
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NaodTeklePage;
