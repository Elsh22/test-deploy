"use client";

import React, { useContext } from "react";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "./ThemeContext";

const DarkModeToggle = () => {
  const { toggle, mode } = useContext(ThemeContext);
  const isLight = mode === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      aria-pressed={isLight}
      title={`Switch to ${isLight ? "dark" : "light"} mode`}
      className="relative inline-flex h-11 w-20 items-center border border-current bg-white/10 px-1.5 transition hover:bg-yellow-400 hover:text-black"
    >
      <span
        className={`absolute top-1.5 flex h-8 w-8 items-center justify-center bg-yellow-400 text-black transition-all duration-300 ${
          isLight ? "left-10" : "left-1.5"
        }`}
      >
        {isLight ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </span>
      <Moon className="ml-1 h-4 w-4" />
      <Sun className="ml-auto mr-1 h-4 w-4" />
    </button>
  );
};

export default DarkModeToggle;
