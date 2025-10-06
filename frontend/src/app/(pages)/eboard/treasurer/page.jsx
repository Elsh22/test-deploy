'use client';
import React from 'react';
import Image from 'next/image';
import Sean from '../../../../assets/EBOARD2025/Sean2025.jpg';

const SeanPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-black px-6 py-16 gap-10">
      <div className="w-full md:w-1/2 flex justify-center">
        <a
          href="https://www.linkedin.com/in/sean-goffigan-9734b7316/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg"
        >
          <Image
            src={Sean}
            alt="Sean"
            className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover cursor-pointer"
          />
        </a>
      </div>
      <div className="w-full md:w-1/2 text-white flex flex-col justify-center max-w-lg">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-2 text-center md:text-left">
          Sean Goffigna
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-yellow-400 text-center md:text-left">
          Director of Finances
        </h2>
        <ul className="list-disc list-inside space-y-2 text-lg md:text-xl leading-relaxed">
          <li>Major: Finance major</li>
          <li>Class: Sophomore</li>
          <li>Org Positions: Member, Student Managed Investment Portfolio</li>
          <li>Future Plans: Equity Research or Wealth/Asset Management</li>
          <li>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/sean-goffigan-9734b7316/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Sean Goffigan
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SeanPage;
