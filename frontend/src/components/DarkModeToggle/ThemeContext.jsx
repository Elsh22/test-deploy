// src/context/ThemeContext.jsx
"use client";
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const toggle = () => setMode((prev) => (prev === "dark" ? "light" : "dark"));

  useEffect(() => {
    const savedMode = window.localStorage.getItem("dmc-theme");
    if (savedMode === "light" || savedMode === "dark") {
      setMode(savedMode);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("dmc-theme", mode);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(mode);
    document.body.classList.add("theme");
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
