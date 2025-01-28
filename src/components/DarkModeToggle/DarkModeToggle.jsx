"use client"
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const DarkModeToggle = () => {
    const { toggle, mode } = useContext(ThemeContext);
    return (
      <div className="w-10 h-6 border border-green-300 rounded-full flex items-center justify-between p-0.5 relative cursor-pointer" onClick={toggle}>
        <div className="text-xs select-none">🌙</div>
        <div className="text-xs select-none">🔆</div>
        <div className={`w-3.5 h-3.5 bg-green-500 rounded-full absolute select-none  ${mode === "light" ? "left-1" : "right-1"}`}/>
      </div>
    );
  };
  
  export default DarkModeToggle;