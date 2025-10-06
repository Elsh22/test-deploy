'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import VirginiaTech from "../../assets/OtherChapters/VT.png";
import ODU from "../../assets/OtherChapters/ODU.png";
import JMU from "../../assets/OtherChapters/JMU.png";

export default function SchoolsPage() {
  const schools = [
    { name: "Virginia Tech", image: VirginiaTech, link: null },
    { name: "James Madison University", image: JMU, link: "https://www.instagram.com/jmu.dmc" },
    { name: "Old Dominion University", image: ODU, link: "https://www.instagram.com/odu.dmc" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black border-t-8 border-b-8 border-yellow-400 p-10">
      <h1 className="text-5xl md:text-6xl font-bold mb-16 text-yellow-400 text-center">
        Other DMC Chapters
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 justify-items-center items-center">
        {schools.map((school, index) => (
          school.link ? (
            <Link
              key={index}
              href={school.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center transition-transform transform hover:scale-105"
            >
              <Image
                src={school.image}
                alt={school.name}
                width={200}
                height={200}
              />
              <p className="mt-4 text-xl font-semibold text-yellow-400 text-center">
                {school.name}
              </p>
            </Link>
          ) : (
            <div
              key={index}
              className="flex flex-col items-center"
            >
              <Image
                src={school.image}
                alt={school.name}
                width={200}
                height={200}
              />
              <p className="mt-4 text-xl font-semibold text-yellow-400 text-center">
                {school.name}
              </p>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
