// src/context/ThemeContext.jsx
"use client";
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark"); // start in dark

  const toggle = () => setMode((prev) => (prev === "dark" ? "light" : "dark"));

  // Update body class whenever mode changes
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(mode);
    document.body.classList.add("theme"); // ensures transition applies
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
