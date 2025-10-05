'use client';
import React from 'react';
import Image from 'next/image';

import Kwame from '../../../../assets/EBOARD2025/Kwame2025.jpg';

const ParliamentarianPage = () => {
   return (
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-white px-6 py-16 gap-10 pt-28">
        
        {/* Left Side - Full Picture with LinkedIn */}
        <div className="w-full md:w-1/2 flex justify-center">
          <a
            href="https://www.linkedin.com/in/mensahko/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:shadow-[0_0_30px_#FFD700] rounded-lg"
          >
            <Image
              src={Kwame}
              alt="Kwame Mensah"
              className="rounded-lg shadow-lg w-full h-auto object-contain cursor-pointer"
            />
          </a>
        </div>
  
        {/* Right Side - Bio */}
        <div className="w-full md:w-1/2 text-black flex flex-col justify-center">
          <h1 className="text-8xl font-extrabold text-center mb-4">
            Kwame Mensah
          </h1>
          <h2 className="text-6xl font-semibold text-center mb-8">
            Parliamentarian
          </h2>
          
          <ul className="list-disc list-inside space-y-3 text-3xl leading-relaxed">
            <li>Major: Computer Science major; concentration in Cybersecurity and Minor in General Business</li>
            <li>Class: Senior</li>
            <li>
              Future Plans: Aspiring Ethical Hacker/Penetration Tester, move to Charlotte, NC or Dallas, TX, travel the world, build own business
            </li>
            <li>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/mensahko/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                mensahko
              </a>
            </li>
            <li>
              Instagram:{" "}
              <a
                href="https://instagram.com/its.kwame"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                its.kwame
              </a>
            </li>
            <li>
              Email:{" "}
              <a
                href="mailto:mensahko@vcu.edu"
                className="text-blue-600 hover:underline"
              >
                mensahko@vcu.edu
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default ParliamentarianPage;
