'use client';
import React from 'react';
import Image from 'next/image';
import Sam from '../../../../assets/EBOARD2025/Sam2025.jpg';

const SamPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-black px-6 py-16 gap-10">
      <div className="w-full md:w-1/2 flex justify-center">
        <a
          href="https://www.linkedin.com/in/samuel-brannen-ba47b82b4/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg"
        >
          <Image
            src={Sam}
            alt="Sam"
            className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover cursor-pointer"
          />
        </a>
      </div>
      <div className="w-full md:w-1/2 text-white flex flex-col justify-center max-w-lg">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-2 text-center md:text-left">
          Sam Brannen
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-yellow-400 text-center md:text-left">
          Director of Wellness
        </h2>
        <ul className="list-disc list-inside space-y-2 text-lg md:text-xl leading-relaxed">
          <li>Major: Computer Science major with a concentration in Cybersecurity</li>
          <li>Class:  Junior</li>
          <li>Org Positions: Member NSBA</li>
          <li>Future Plans: Pursue a career in Cybersecurity</li>
          <li>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/samuel-brannen-ba47b82b4/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Sam Brannen
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SamPage;
