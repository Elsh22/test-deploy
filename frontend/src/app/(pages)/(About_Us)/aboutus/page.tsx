'use client';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import AboutVcu from './AboutVcu';
import AboutJmu from './AboutJmu';
import AboutOdu from './AboutOdu';
import AboutNonProfit from './AboutNonProfit';
import Image from 'next/image';

const AboutUsPage = () => {
  const [selectedBoard, setSelectedBoard] = useState('vcu');
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 100, damping: 30, bounce: 0 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const goals = [
    { 
      title: "Academic Excellence", 
      description: "Supporting academic achievement through mentorship and resources, fostering a culture of learning and growth." 
    },
    { 
      title: "Community Service", 
      description: "Actively engaging in local communities through mentoring, volunteering, and participating in service events." 
    },
    { 
      title: "Professional Development", 
      description: "Building career readiness and professional skills through networking, workshops, and industry connections." 
    },
    { 
      title: "Networking", 
      description: "Creating meaningful connections within our brotherhood and professional community." 
    }
  ];

  const values = ["Academic", "Community Service", "Professional Development", "Networking"];

  const renderSelectedBoard = () => {
    switch(selectedBoard) {
      case 'vcu':
        return <AboutVcu />;
      case 'jmu':
        return <AboutJmu />;
      case 'odu':
        return <AboutOdu />;
      case 'nonprofit':
        return <AboutNonProfit />;
      default:
        return <AboutVcu />;
    }
  };

  return (
    <div ref={containerRef} className="bg-dmc-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-dmc-gold origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />

      {/* Hero Section with Mission */}
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center px-4 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="text-center max-w-screen-lg mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold mb-6 text-dmc-gradient heading-dmc-primary">
            Our Mission
          </h1>
          <p className="text-xl text-dmc-slate-gray leading-relaxed mb-8 body-dmc-professional">
            DMC was made to create an organization in which men of color can interact and grow as a community, 
            our goal is to equip these individuals with the means and resources needed in order to thrive in 
            the college setting. We plan to do so by providing academic advice from other successful members 
            and faculty, insight into how to navigate the undergraduate years, means to professional development 
            and most importantly, provide a brotherhood of students striving together.
          </p>
          <p className="text-xl text-dmc-slate-gray leading-relaxed body-dmc-professional">
            A critical aspect of our organization is our commitment to community service, 
            this is shown by our consistent mentoring at nearby underserved public schools, 
            our volunteering in the local Richmond community, and our participation in service 
            events held by other organizations.
          </p>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10"
        >
          <ChevronDown className="w-8 h-8 text-dmc-warm-brown" />
        </motion.div>
      </motion.section>

      {/* Goals Section */}
      <motion.section 
        className="py-20 bg-dmc-pearl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center heading-dmc-secondary">Our Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.title}
                className="card-dmc-professional"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-bold mb-4 text-dmc-warm-brown">{goal.title}</h3>
                <p className="text-dmc-slate-gray body-dmc-professional">{goal.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Core Values Section */}
      <motion.section 
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center heading-dmc-secondary">Core Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value}
                className="bg-dmc-professional text-dmc-white p-8 rounded-dmc-lg shadow-dmc-elegant text-center"
                initial={{ rotateY: 90, opacity: 0 }}
                whileInView={{ rotateY: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, rotateY: 15 }}
              >
                <h3 className="text-xl font-bold">{value}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Board Selection Section */}
      <section className="py-20 bg-dmc-pearl">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center heading-dmc-secondary">Our Leadership</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <motion.button
              onClick={() => setSelectedBoard('vcu')}
              className={`btn-dmc-primary ${
                selectedBoard === 'vcu' ? '' : 'btn-dmc-secondary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VCU Board
            </motion.button>
            <motion.button
              onClick={() => setSelectedBoard('jmu')}
              className={`btn-dmc-primary ${
                selectedBoard === 'jmu' ? '' : 'btn-dmc-secondary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              JMU Board
            </motion.button>
            <motion.button
              onClick={() => setSelectedBoard('odu')}
              className={`btn-dmc-primary ${
                selectedBoard === 'odu' ? '' : 'btn-dmc-secondary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ODU Board
            </motion.button>
            <motion.button
              onClick={() => setSelectedBoard('nonprofit')}
              className={`btn-dmc-primary ${
                selectedBoard === 'nonprofit' ? '' : 'btn-dmc-secondary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Non-Profit Board
            </motion.button>
          </div>
          <motion.div
            key={selectedBoard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderSelectedBoard()}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;