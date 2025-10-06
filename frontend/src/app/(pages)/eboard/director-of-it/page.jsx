'use client';
import React from 'react';
import Image from 'next/image';
import Shawn from '../../../../assets/EBOARD2025/Shawn2025.jpg';

const DirectorOfITPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-black px-6 py-16 gap-10">
      
      <div className="w-full md:w-1/2 flex justify-center">
        <a
          href="https://www.linkedin.com/in/shawn-watson-3a16292b0/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg"
        >
          <Image
            src={Shawn}
            alt="Shawn Watson"
            className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover cursor-pointer"
          />
        </a>
      </div>

      <div className="w-full md:w-1/2 text-white flex flex-col justify-center max-w-lg">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-2 text-center md:text-left">
          Shawn Watson
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-yellow-400 text-center md:text-left">
          Director of IT
        </h2>
        
        <ul className="list-disc list-inside space-y-2 text-lg md:text-xl leading-relaxed">
          <li>Major: Computer Science & Mathematics; Minor: AI</li>
          <li>Class: Junior</li>
          <li>Org Position: President, Delta Upsilon Chapter of Phi Beta Sigma Fraternity, Inc.</li>
          <li>Org Position: Student Director, Emerging Leaders Program</li>
          <li>Org Position: Member, National Society of Black Engineers</li>
          <li>Future Plans: Start a video game company and become a professor at an HBCU</li>
          <li>
            Email:{" "}
            <a href="mailto:watsonsm2@vcu.edu" className="text-blue-400 hover:underline">
              watsonsm2@vcu.edu
            </a>
          </li>
          <li>
            Phone: 757-310-7370
          </li>
          <li>
            Instagram:{" "}
            <a href="https://instagram.com/realshawnnnn" className="text-blue-400 hover:underline">
              @realshawnnnn
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DirectorOfITPage;
