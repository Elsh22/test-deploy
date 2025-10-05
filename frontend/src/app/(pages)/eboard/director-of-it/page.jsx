'use client';
import React from 'react';
import Image from 'next/image';

import Shawn from '../../../../assets/EBOARD2025/Shawn2025.jpg';

const DirectorOfITPage = () => {
    return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-white px-6 py-16 gap-10 pt-28">
      
      {/* Left Side - Full Picture with LinkedIn */}
      <div className="w-full md:w-1/2 flex justify-center">
        <a
          href="https://www.linkedin.com/in/shawn-watson-3a16292b0/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:shadow-[0_0_30px_#FFD700] rounded-lg"
        >
          <Image
            src={Shawn}
            alt="Shawn Watson"
            className="rounded-lg shadow-lg w-full h-auto object-contain cursor-pointer"
          />
        </a>
      </div>

      {/* Right Side - Bio */}
      <div className="w-full md:w-1/2 text-black flex flex-col justify-center">
        <h1 className="text-8xl font-extrabold text-center mb-4">
          Shawn Watson
        </h1>
        <h2 className="text-6xl font-semibold text-center mb-8">
          Director of IT
        </h2>
        
        <ul className="list-disc list-inside space-y-3 text-3xl leading-relaxed">
          <li>Major: Computer Science major w/ a concentration in Software Engineering, Mathematics major with a minor in Applied Mathematics, Minor in Artificial Intelligence</li>
          <li>Class: Junior</li>
          <li>Org Position: President, Delta Upsilon Chapter of Phi Beta Sigma Fraternity, Inc.</li>
          <li>Org Position: Student Director, Emerging Leaders Program</li>
          <li>Org Position: Member, National Society of Black Engineers</li>
          <li>
            Future Plans: Startup a video game company and become a professor at an HBCU
          </li>
          <li>
            Email:{" "}
            <a
              href="mailto:watsonsm2@vcu.edu"
              className="text-blue-600 hover:underline"
            >
              watsonsm2@vcu.edu
            </a>
          </li>
          <li>Phone: 757-310-7370</li>
          <li>
            Instagram:{" "}
            <a
              href="https://instagram.com/realshawnnnn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              @realshawnnnn
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DirectorOfITPage;
