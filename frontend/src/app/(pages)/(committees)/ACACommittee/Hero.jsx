import React, { useState, useEffect } from 'react';
import { FaArrowDown } from 'react-icons/fa';

const HomePage = () => {
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollPrompt(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('../../../../assets/books.jpg')"
      }}
    >
      <div className="text-center z-10">
        <h1 className="text-dmc-hero font-dmc-primary text-dmc-gold mb-6 animate-dmc-fade-in">
          Academic Committee
        </h1>
        <p className="text-dmc-h4 text-dmc-white max-w-3xl mx-auto mb-8 px-6 animate-dmc-slide-up">
          Empowering academic excellence through peer support, tutoring, and educational resources
        </p>
      </div>
      
      {showScrollPrompt && (
        <div
          className="flex flex-col items-center text-dmc-white animate-dmc-fade-in mt-8 cursor-pointer hover:text-dmc-gold transition-colors duration-300"
          onClick={handleScrollDown}
        >
          <FaArrowDown className="text-3xl mb-2 animate-bounce" />
          <p className="text-lg font-medium">Scroll down to learn more</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;