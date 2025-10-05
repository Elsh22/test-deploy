"use client";

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

// ------------------------
// LoadingScreen Component
// ------------------------
interface LoadingScreenProps {
  onFinish: () => void; // explicitly type the prop
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5000); // 5 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <motion.h1
        className="text-6xl md:text-9xl font-extrabold text-yellow-400 text-center"
        initial={{ opacity: 0, textShadow: "0 0 0px #FFD700" }}
        animate={{ opacity: 1, textShadow: "0 0 25px #FFD700" }}
        transition={{ duration: 2 }}
      >
        Excellence is our Standard
      </motion.h1>
    </motion.div>
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
        <Professional />
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
        <OtherChapters />
      </div>
    </>
  );
};

export default HomePage;
