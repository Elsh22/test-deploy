'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutJmu = () => {
  // Replace with actual JMU board members
  const team = [
    { 
      name: 'JMU Board Member 1', 
      role: 'President', 
      image: '../../../../assets/XaiverHeadshotUpdated.jpg', 
      linkedin: 'https://www.linkedin.com/in/member1' 
    },
    // Add more JMU board members here
  ];

  return (
    <div className="flex flex-col items-center py-12 bg-white">
      <motion.h1 
        className="text-3xl font-bold text-gray-900 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Meet the JMU Board
      </motion.h1>

      {/* Group Photo - Replace with actual JMU board photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-5xl mb-12"
      >
        <div className="w-full h-[400px] bg-gray-200 rounded-lg shadow-xl flex items-center justify-center">
          <p className="text-gray-500">JMU Board Photo</p>
        </div>
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
              <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                <p className="text-gray-500">Photo</p>
              </div>
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

export default AboutJmu;