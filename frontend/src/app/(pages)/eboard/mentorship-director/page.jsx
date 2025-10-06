'use client';
import React from 'react';
import Image from 'next/image';
import Thurman from '../../../../assets/EBOARD2025/Thurman.jpg';

const ThurmanPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-black px-6 py-16 gap-10">
      
      {/* Left Side - Picture */}
      <div className="w-full md:w-1/2 flex justify-center">
        <a
          href="https://www.linkedin.com/in/thurmansmithjr/" // Replace with actual LinkedIn
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg"
        >
          <Image
            src={Thurman}
            alt="Thurman"
            className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover cursor-pointer"
          />
        </a>
      </div>

      {/* Right Side - Bio */}
      <div className="w-full md:w-1/2 text-white flex flex-col justify-center max-w-lg">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-2 text-center md:text-left">
          Thurman Smith Jr.
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-yellow-400 text-center md:text-left">
          Director of Mentorship
        </h2>
        
        <ul className="list-disc list-inside space-y-2 text-lg md:text-xl leading-relaxed">
          <li>Major: Electrical Engineering</li>
          <li>Class:  Junior</li>
          <li>Org Positions: Vice President, National Society of Black Engineers @ VCU</li>
          <li>Org Position: Vice President, Black Student Union @ VCU</li>
          <li>Future Plans: Work with father as an Electrical Contractor or pursue a career as an Electrical Design Engineer</li>
          <li>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/thurmansmithjr/" // Replace with actual
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Thurman Smith Jr.
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ThurmanPage;
