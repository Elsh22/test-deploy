'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Import images
import Thomas from '../../../../assets/Thomas.jpg';
import Hazim from '../../../../assets/Hazim.jpeg';
import James from '../../../../assets/James.jpeg';
import Stone from '../../../../assets/Stone.jpeg';
import Khalid from '../../../../assets/Khalid.jpeg';
import Elijah from '../../../../assets/Elijah.jpeg';
import Kyle from '../../../../assets/Kyle.jpeg';
import Jalen from '../../../../assets/Jalen.jpeg';
import Caleb from '../../../../assets/CalebBarnes.jpeg';
import Goode from '../../../../assets/Goode.jpg';
import Marko from '../../../../assets/Marko.jpeg';
import Eboard from '../../../../assets/DMCNONPROFITphoto.jpeg';

const AboutNonProfit = () => {
  const team = [
    { name: 'Dr. Carlton Goode', role: 'Founder/Strategic Advisor', image: Goode, linkedin: 'https://www.linkedin.com/in/carlton-goode-ed-d-69172815/' },
    { name: 'Thomas Chatman', role: 'CEO', image: Thomas, linkedin: 'https://www.linkedin.com/in/thomaschatman/' },
    { name: 'Hazim Oraibi', role: 'COO', image: Hazim, linkedin: 'https://www.linkedin.com/in/hazimoraibi/' },
    { name: 'James Mbualungu', role: 'CFO', image: James, linkedin: 'https://www.linkedin.com/in/james-mbualungu/' },
    { name: 'Stone Brickhouse', role: 'VP of Marketing and Communications', image: Stone, linkedin: 'https://www.linkedin.com/in/stone-brickhouse/overlay/about-this-profile/' },
    { name: 'Marko Alvarenga', role: 'Mentorship Director', image: Marko , linkedin: 'https://www.linkedin.com/in/marko-alvarenga-5211621a6/' },
    { name: 'Khalid Elshowaya', role: 'VP of Business Development', image: Khalid, linkedin: 'https://www.linkedin.com/in/khalid-elshowaya/' },
    { name: 'Elijah Gartrell', role: 'VP of Chapter Development', image: Elijah, linkedin: 'https://www.linkedin.com/in/elijah-gartrell-8aa628230/' },
    { name: 'Kyle Weldon', role: 'Director of Administration', image: Kyle, linkedin: 'https://www.linkedin.com/in/weldonkylevcu/overlay/photo/' },
    { name: 'Jalen Gray', role: 'Director of Alumni & Community Engagement', image: Jalen, linkedin: 'https://www.linkedin.com/in/jalen-bray007/' },
    { name: 'Caleb Barnes', role: 'Director of IT', image: Caleb, linkedin: 'https://www.linkedin.com/in/caleb-barnes1/' },

  ];

  return (
    <div className="flex flex-col items-center py-12 bg-white">
      <motion.h1 
        className="text-3xl font-bold text-gray-900 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Meet the VCU Board
      </motion.h1>

      {/* Eboard Group Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-5xl mb-12"
      >
        <Image
          src={Eboard}
          alt="DMC VCU Board"
          width={1000}
          height={600}
          className="rounded-lg shadow-xl w-full h-auto"
        />
      </motion.div>

      {/* Individual Board Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-40 h-40 mb-4 rounded-full overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={member.image}
                alt={member.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-full" />
            </a>
            <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                {member.name}
              </a>
            </h3>
            <p className="text-gray-600 mt-1">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutNonProfit;