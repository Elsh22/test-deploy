import React, { useState, useEffect } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import './hero.css'; 

const HomePage = () => {
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);

  // Function to handle the scroll
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollPrompt(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ACACommittee-img flex flex-col items-center justify-center h-screen bg-cover bg-center">
      <h1 className="text-5xl font-bold text-white animate-fadeIn">Academic Committee</h1>
      {showScrollPrompt && (
        <div
          className="flex flex-col items-center text-white animate-fadeInAndUp mt-8 cursor-pointer"
          onClick={handleScrollDown}
        >
          <FaArrowDown className="text-3xl" />
          <p className="mt-2">Scroll down to learn more</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
