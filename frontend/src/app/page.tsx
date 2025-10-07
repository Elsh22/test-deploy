'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import all your sections
import Home from "../components/Home/Home";
import CommitteeAbout from "../components/Committee/CommitteeAbout";
import Commitee from "../components/Committee/Commitee";
import Calendar from "../components/Calendar/Calendar";
import Mentorship from "../components/Mentorship/Mentorship";
import Sports from "../components/Sports/Sports";
import Contact from "../components/Contact/Contact";
import About from "../components/About/About";
import Mission from "../components/Mission/Mission";
import Donor from "../components/Donor/Donor";
import FlyerPost from "../components/Calendar/flyer";
import Youtube from "../components/Youtube/youtube";
import Highlight from "../components/Highlights/Highlight";
import Professional from "../components/ProfessionalAcademy/Professional";
import VideoSection from "../components/VideoSection/VideoSection";
import SundaySpotlight from "../components/SundaySpotlight/SundaySpotlight";
import OtherChapters from "../components/OtherChapters/chapters.jsx";
import NonProfitCard from '../components/NonProfit/NonProfitCard';

// ------------------------
// LoadingScreen Component
// ------------------------
interface LoadingScreenProps {
  onFinish: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => onFinish(), 4000); // 4 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <motion.h1
        className="text-5xl md:text-8xl font-extrabold text-yellow-400 text-center tracking-wide"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{
          textShadow: `
            0 0 10px #FFD700,
            0 0 20px #FFD700,
            0 0 40px #FFC300,
            0 0 80px #FFB800
          `,
          animation: "glowPulse 2.5s ease-in-out infinite alternate"
        }}
      >
        Excellence is Our Standard
      </motion.h1>

      <style jsx global>{`
        @keyframes glowPulse {
          0% {
            text-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 40px #FFC300;
          }
          100% {
            text-shadow: 0 0 20px #FFD700, 0 0 40px #FFD700, 0 0 80px #FFB800;
          }
        }
      `}</style>
    </div>
  );
};

// ------------------------
// HomePage Component
// ------------------------
const HomePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <>
      {/* Splash screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main content fades in once loading is done */}
      <div
        className={`overflow-x-hidden transition-opacity duration-1000 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Home id="home" />
        <VideoSection />
        <Mission id="about" />
        <Professional id="professional" />
        <SundaySpotlight />
        <Highlight />
        <Donor />
        <Youtube />
        <CommitteeAbout id="committee" />
        <Commitee />
        <Mentorship id="mentorship" />
        <FlyerPost />
        <Calendar id="calendar" />
        <Sports id="sports" />
        <Contact id="contact" />
        <About />
        <NonProfitCard />
        <OtherChapters />
      </div>
    </>
  );
};

export default HomePage;
