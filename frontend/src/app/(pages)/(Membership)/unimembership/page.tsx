'use client';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Building2, 
  GraduationCap,
  Plus,
  ArrowRight,
  Search
} from 'lucide-react';

const UniversityMembershipPage = () => {
  const router = useRouter();
  const chaptersRef = useRef(null);
  const containerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    bounce: 0
  });

  const scrollToChapters = () => {
    chaptersRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const slideInFromSides = {
    hidden: { opacity: 0, x: -100 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    })
  };

  const expandOut = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const rotateInCards = {
    hidden: { opacity: 0, rotateY: 90 },
    visible: (i: number) => ({
      opacity: 1,
      rotateY: 0,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    })
  };

  const structureRoles = [
    {
      title: "Executive Board",
      roles: [
        "President",
        "Vice President",
        "Secretary",
        "Treasurer",
        "Mentorship Director",
        "Public Relations Coordinator",
        "Social Media Chair",
        "Membership Chair",
        "Wellness Director",
        "Event Coordinator",
        "Director of IT",
        "Faculty Advisor",
        "Second Advisor"
      ],
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Committees",
      roles: [
        "Academic Committee",
        "Information Technology Committee",
        "Community Service Committee",
        "Professional Development",
        "Social Committee"
      ],
      icon: <Building2 className="w-6 h-6" />
    }
  ];

  const chapters = [
    {
      name: "VCU",
      members: 120,
      status: "Active",
      joinLink: "https://vcu.edu/join-chapter"
    },
    {
      name: "ODU",
      members: 85,
      status: "Active",
      joinLink: "https://odu.edu/join-chapter"
    },
    {
      name: "JMU",
      members: 95,
      status: "Active",
      joinLink: "https://jmu.edu/join-chapter"
    }
  ];

  const initiatives = [
    {
      title: "Tech Mentorship",
      description: "Connecting students with industry professionals",
      image: "/api/placeholder/400/300"
    },
    {
      title: "Hackathon Series",
      description: "Annual coding competitions across chapters",
      image: "/api/placeholder/400/300"
    },
    {
      title: "Community Outreach",
      description: "Local tech education programs",
      image: "/api/placeholder/400/300"
    }
  ];

  const filteredChapters = chapters.filter(chapter =>
    chapter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={containerRef} className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <motion.section 
          className="min-h-screen flex flex-col items-center justify-center relative px-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
        >
          <motion.div
            className="absolute inset-0 bg-blue-600 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 100 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.div
            className="text-center max-w-3xl mx-auto relative z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold mb-6 text-white">
              University Chapters
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Join a community of innovators and leaders shaping the future of technology
            </p>
            <button 
              onClick={scrollToChapters}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg transition-colors duration-200"
            >
              Find Your Chapter
            </button>
          </motion.div>
        </motion.section>
      </div>

      {/* Structure Section */}
      <motion.section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold mb-16 text-center"
            variants={expandOut}
            initial="hidden"
            whileInView="visible"
          >
            Chapter Structure
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {structureRoles.map((section, index) => (
              <motion.div
                key={section.title}
                custom={index}
                variants={slideInFromSides}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="bg-white rounded-lg shadow-lg p-8 h-full">
                  <div className="flex items-center mb-6">
                    {section.icon}
                    <h3 className="text-2xl font-bold ml-4">{section.title}</h3>
                  </div>
                  <ul className="space-y-4">
                    {section.roles.map((role) => (
                      <motion.li
                        key={role}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{role}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Initiatives Section */}
      <motion.section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold mb-16 text-center"
            variants={expandOut}
            initial="hidden"
            whileInView="visible"
          >
            Student Initiatives
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ 
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.2
                  }
                }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <motion.img
                    src={initiative.image}
                    alt={initiative.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{initiative.title}</h3>
                    <p className="text-gray-600">{initiative.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Chapters Section */}
      <motion.section ref={chaptersRef} className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold mb-16 text-center"
            variants={expandOut}
            initial="hidden"
            whileInView="visible"
          >
            Active Chapters
          </motion.h2>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search chapters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Chapters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredChapters.map((chapter, index) => (
              <motion.div
                key={chapter.name}
                custom={index}
                variants={rotateInCards}
                initial="hidden"
                whileInView="visible"
                whileHover={{ 
                  rotateY: 10,
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <h3 className="text-2xl font-bold mb-2">{chapter.name}</h3>
                  <p className="text-gray-600 mb-4">{chapter.members} Members</p>
                  <a 
                    href={chapter.joinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Join Chapter
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredChapters.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              No chapters found matching your search.
            </div>
          )}
        </div>
      </motion.section>

      {/* Start a Chapter CTA */}
      <motion.section 
        className="min-h-screen py-20 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { 
                opacity: 1, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }
              }
            }}
          >
            <Plus className="w-16 h-16 mx-auto mb-8 text-white" />
            <h2 className="text-4xl font-bold mb-6 text-white">Start a New Chapter</h2>
            <p className="text-xl mb-8 text-white/90">
              Don't see your university? Lead the change by starting a new chapter at your institution.
            </p>
            <button 
              onClick={() => router.push('/newchapter')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg transition-colors duration-200"
            >
              Start a Chapter
            </button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default UniversityMembershipPage;