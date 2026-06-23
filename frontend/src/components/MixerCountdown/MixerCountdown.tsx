"use client";

import { useEffect, useState } from "react";

export default function MixerCountdown() {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPastHero(window.scrollY > window.innerHeight * 0.85);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      aria-label="DMC Mixer countdown tag"
      className={`fixed left-0 right-0 top-[3.9rem] z-40 px-4 transition duration-500 md:px-8 ${
        isPastHero
          ? "pointer-events-none -translate-y-20 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="mx-auto h-7 w-full max-w-xl bg-yellow-400 shadow-[0_14px_35px_rgba(0,0,0,0.28)]" />
    </section>
  );
}
