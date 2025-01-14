'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Import images
import Xavier from '../../../../assets/XaiverHeadshotUpdated.jpg';
import Zion from '../../../../assets/Zion.jpg';
import Kabir from '../../../../assets/KabirHeadshotUpdated.jpg';
import David from '../../../../assets/DavidHeadshotUpdated.jpg';
import Josh from '../../../../assets/Josh.png';
import DeAngelo from '../../../../assets/DeangleoHeadshotUpdated.jpg';
import Jason from '../../../../assets/JasonHeadshotUpdated.jpg';
import Stephen from '../../../../assets/StephHeadshotUpdated.jpg';
import Kaleb from '../../../../assets/KalebHeadshotUpdated.jpg';
import Neho from '../../../../assets/NehoHeadshotUpdated.jpg';
import Mohamed from '../../../../assets/MohamedHeadshotUpdated.jpg';
import Goode from '../../../../assets/Goode.jpg';
import Thomas from '../../../../assets/Thomas.jpg';
import Eboard from '../../../../assets/eboardpic.jpg';

const AboutVcu = () => {
  const team = [
    { name: 'Xavier Lewis', role: 'President', image: Xavier, linkedin: 'https://www.linkedin.com/in/xavier-lewis-9916bb253/' },
    { name: 'Zion Segears', role: 'Vice President', image: Zion, linkedin: 'https://www.linkedin.com/in/zion-segears-767bb7242/' },
    { name: 'Kabir Munjwani', role: 'Secretary', image: Kabir, linkedin: 'https://www.linkedin.com/in/kabir-munjwani-2389bb319/' },
    { name: 'David Foster', role: 'Treasurer', image: David, linkedin: 'https://www.linkedin.com/in/david-foster-b063b0226/' },
    { name: 'Josh Hines', role: 'Mentorship Director', image: Josh, linkedin: 'https://www.linkedin.com/in/joshhines4/' },
    { name: 'DeAngelo Bailey', role: 'Public Relations Coordinator', image: DeAngelo, linkedin: 'https://www.linkedin.com/in/deangelo-bailey-5686ba253/' },
    { name: 'Jason Gallardo Gonzalez', role: 'Social Media Chair', image: Jason, linkedin: 'https://www.linkedin.com/in/jason-gallardo-gonzalez/' },
    { name: 'Stephen Kouevi', role: 'Membership Chair', image: Stephen, linkedin: 'https://www.linkedin.com/in/stephenkouevi/' },
    { name: 'Kaleb Brown', role: 'Wellness Director', image: Kaleb, linkedin: 'https://www.linkedin.com/in/kaleb--brown/' },
    { name: 'Nehemiah Kibler', role: 'Event Coordinator', image: Neho, linkedin: 'https://www.linkedin.com/in/nehemiah-kibler-ba8764253/' },
    { name: 'Mohamed Elnafe', role: 'Director of IT', image: Mohamed, linkedin: 'https://www.linkedin.com/in/mohamed-elnafe-364892215/' },
    { name: 'Dr. Carlton Goode', role: 'Faculty Advisor', image: Goode, linkedin: 'https://www.linkedin.com/in/carlton-goode-ed-d-69172815/' },
    { name: 'Thomas Chatman', role: 'Second Advisor', image: Thomas, linkedin: 'https://www.linkedin.com/in/thomas--chatman/' },
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

export default AboutVcu;