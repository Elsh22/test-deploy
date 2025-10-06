'use client';
import React from 'react';
import Image from 'next/image';
import Paul from '../../../../assets/EBOARD2025/Paul2025.jpg';

const PaulPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-black px-6 py-16 gap-10">
      <div className="w-full md:w-1/2 flex justify-center">
        <a
          href="https://www.linkedin.com/in/paul-adeugba/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg"
        >
          <Image
            src={Paul}
            alt="Paul"
            className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover cursor-pointer"
          />
        </a>
      </div>
      <div className="w-full md:w-1/2 text-white flex flex-col justify-center max-w-lg">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-2 text-center md:text-left">
          Paul Adelugba
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-yellow-400 text-center md:text-left">
          Social Media Director
        </h2>
        <ul className="list-disc list-inside space-y-2 text-lg md:text-xl leading-relaxed">
          <li>Major: Mechanical Engineering major; minors in Mathematics & Aerospace Engineering</li>
          <li>Class: Senior</li>
          <li>Org Positions: Member, ASU, NSU, NSBE</li>
          <li>Future Plans: pursue further education into a Master’s degree</li>
          <li>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/paul-adeugba/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Paul Adelugba
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PaulPage;
