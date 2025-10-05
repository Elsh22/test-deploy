import React from "react";
import Image from "next/image";
import Link from "next/link";
import VirginiaTech from "../../assets/OtherChapters/VT.png";
import ODU from "../../assets/OtherChapters/ODU.png";
import JMU from "../../assets/OtherChapters/JMU.png";

export default function SchoolsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-10">
      <h1 className="text-4xl font-bold mb-12 text-black text-center">
        Other Chapters
      </h1>

      {/* LOGO GRID */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-16">
        {/* Virginia Tech (no link) */}
        <div className="flex flex-col items-center transition-transform hover:scale-105">
          <Image
            src={VirginiaTech}
            alt="Virginia Tech"
            width={200}
            height={200}
            className="rounded-lg shadow-lg"
          />
          <p className="mt-3 text-lg font-semibold text-gray-800">
            Virginia Tech
          </p>
        </div>

        {/* JMU (linked to Instagram) */}
        <Link
          href="https://www.instagram.com/jmu.dmc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center transition-transform hover:scale-105"
        >
          <Image
            src={JMU}
            alt="James Madison University"
            width={200}
            height={200}
            className="rounded-lg shadow-lg"
          />
          <p className="mt-3 text-lg font-semibold text-gray-800 hover:text-purple-600">
            James Madison University
          </p>
        </Link>

        {/* ODU (linked to Instagram) */}
        <Link
          href="https://www.instagram.com/odu.dmc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center transition-transform hover:scale-105"
        >
          <Image
            src={ODU}
            alt="Old Dominion University"
            width={200}
            height={200}
            className="rounded-lg shadow-lg"
          />
          <p className="mt-3 text-lg font-semibold text-gray-800 hover:text-blue-600">
            Old Dominion University
          </p>
        </Link>
      </div>
    </div>
  );
}
