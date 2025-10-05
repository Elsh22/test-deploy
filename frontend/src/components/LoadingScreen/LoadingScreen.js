"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onFinish }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-yellow-400"
        initial={{ opacity: 0, textShadow: "0 0 0px #FFD700" }}
        animate={{ opacity: 1, textShadow: "0 0 20px #FFD700" }}
        transition={{ duration: 2 }}
      >
        Excellence is our Standard
      </motion.h1>
    </motion.div>
  );
};

const HomeWithLoading = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // stays for 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      {!loading && children}
    </>
  );
};

export default HomeWithLoading;
