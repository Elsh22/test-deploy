"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const committeeLinks = [
    { href: "/#committee", label: "Committee" },
    { href: "/ACACommittee", label: "Academic Committee" },
    { href: "/CommCommittee", label: "Community Service" },
    { href: "/ITCommittee", label: "Information Tech" },
    { href: "/ProfCommittee", label: "Professional Dev" },
    { href: "/SocCommittee", label: "Social Committee" },
    { href: "/HealthCommittee", label: "Health Committee" },
  ];

  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/#mentorship", label: "Mentorship" },
    { href: "/#sports", label: "Sports" },
    { href: "/gallery", label: "Gallery" },
    { href: "/eboard", label: "E-Board" },
    { href: "/#contact", label: "Contact" },
  ];

  const handleNav = () => {
    setNav(!nav);
    if (dropdown) setDropdown(false);
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    const changeColor = () => {
      setScrolled(window.scrollY >= 60);
    };
    window.addEventListener("scroll", changeColor);
    changeColor();
    return () => window.removeEventListener("scroll", changeColor);
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--dmc-border)] bg-[var(--dmc-panel)] text-[var(--dmc-text)] shadow-sm backdrop-blur-xl"
          : "border-b border-white/10 bg-black/15 text-white backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center bg-yellow-400 text-xl font-black text-black">
            DMC
          </span>
          <span className="hidden text-sm font-bold uppercase tracking-[0.22em] sm:block">
            Developing Men of Color
          </span>
        </Link>

        <ul className="hidden items-center gap-6 text-sm font-bold uppercase tracking-[0.12em] lg:flex">
          {mainLinks.slice(0, 1).map((link) => (
            <li key={link.href} className="transition-colors hover:text-yellow-500">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <li className="relative group cursor-pointer">
            <div className="flex items-center transition-colors hover:text-yellow-500">
              Committees
              <AiOutlineDown className="ml-1 mt-1 text-sm group-hover:rotate-180 transition-transform duration-200" />
            </div>
            <ul className="dmc-card-solid absolute left-0 top-full hidden w-64 flex-col border p-3 shadow-xl group-hover:flex">
              {committeeLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm normal-case tracking-normal transition hover:bg-yellow-400 hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
            </ul>
          </li>
          {mainLinks.slice(1).map((link) => (
            <li key={link.href} className="transition-colors hover:text-yellow-500">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/#calendar"
            className={`hidden border px-4 py-2 text-sm font-extrabold uppercase tracking-[0.12em] transition md:inline-flex ${
              scrolled
                ? "border-current hover:bg-yellow-400 hover:text-black"
                : "border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black"
            }`}
          >
            Events
          </Link>
          <DarkModeToggle />
          <button
            onClick={handleNav}
            className="z-10 flex h-11 w-11 items-center justify-center border border-current lg:hidden"
            aria-label="Open navigation menu"
          >
            {nav ? (
              <AiOutlineClose size={24} className="text-white" />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>
        </div>
      </div>

      <div
        className={`${
          nav
            ? "fixed left-0 top-0 flex h-screen w-full flex-col items-center justify-center bg-black/95 text-white transition-all duration-500"
            : "fixed left-[-100%]"
        }`}
      >
        <ul className="max-h-[86vh] space-y-6 overflow-y-auto px-6 text-center text-3xl font-semibold">
          {mainLinks.slice(0, 1).map((link) => (
            <li key={link.href} onClick={handleNav}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <li onClick={toggleDropdown} className="flex flex-col items-center">
            Committees <AiOutlineDown className="mt-2" />
            {dropdown && (
              <ul className="mt-4 space-y-3 text-xl text-yellow-200">
                {committeeLinks.map((link) => (
                  <li key={link.href} onClick={handleNav}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {mainLinks.slice(1).map((link) => (
            <li key={link.href} onClick={handleNav}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;



