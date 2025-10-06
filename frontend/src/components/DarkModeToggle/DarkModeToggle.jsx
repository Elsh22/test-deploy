"use client";
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const DarkModeToggle = () => {
  const { toggle, mode } = useContext(ThemeContext);

  return (
    <div
      className="w-12 h-6 border border-gray-500 rounded-full flex items-center justify-between p-0.5 relative cursor-pointer select-none"
      onClick={toggle}
    >
      <div className="text-xs ml-1">🌙</div>
      <div className="text-xs mr-1">🔆</div>
      <div
        className={`w-5 h-5 bg-green-500 rounded-full absolute top-0.5 transition-all duration-500 ${
          mode === "light" ? "left-0.5" : "right-0.5"
        }`}
      />
    </div>
  );
};

export default DarkModeToggle;
