"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");

  const handleNav = () => {
    setNav(!nav);
    if (dropdown) setDropdown(false);
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("#ffffff");
        setTextColor("#000000");
      } else {
        setColor("transparent");
        setTextColor("white");
      }
    };
    window.addEventListener("scroll", changeColor);
    changeColor();
    return () => window.removeEventListener("scroll", changeColor);
  }, []);

  return (
    <div
      style={{ backgroundColor: color }}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md shadow-md"
    >
      <div className="max-w-[1240px] mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/">
          <h1
            className="font-extrabold text-4xl tracking-wide cursor-pointer transition-all duration-300 hover:text-yellow-400"
            style={{ color: textColor }}
          >
            DMC
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul
          className="hidden md:flex space-x-8 text-lg font-semibold"
          style={{ color: textColor }}
        >
          <li className="hover:text-yellow-400 transition-colors">
            <Link href="/">Home</Link>
          </li>
          <li className="relative group cursor-pointer">
            <div className="flex items-center hover:text-yellow-400 transition-colors">
              Committees
              <AiOutlineDown className="ml-1 mt-1 text-sm group-hover:rotate-180 transition-transform duration-200" />
            </div>
            {/* Dropdown */}
            <ul className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-white text-black shadow-lg rounded-lg p-2 w-60 z-50">
              <Link href="/#committee" className="hover:text-yellow-600 p-2">Committee</Link>
              <Link href="/ACACommittee" className="hover:text-yellow-600 p-2">Academic Committee</Link>
              <Link href="/CommCommittee" className="hover:text-yellow-600 p-2">Community Service</Link>
              <Link href="/ITCommittee" className="hover:text-yellow-600 p-2">Information Tech</Link>
              <Link href="/ProfCommittee" className="hover:text-yellow-600 p-2">Professional Dev</Link>
              <Link href="/SocCommittee" className="hover:text-yellow-600 p-2">Social Committee</Link>
              </ul>
          </li>
          <li className="hover:text-yellow-400 transition-colors">
            <Link href="/#mentorship">Mentorship</Link>
          </li>
          <li className="hover:text-yellow-400 transition-colors">
            <Link href="/#sports">Sports</Link>
          </li>
          <li className="hover:text-yellow-400 transition-colors">
            <Link href="/#contact">Contact</Link>
          </li>
          <li className="hover:text-yellow-400 transition-colors">
            <Link href="/#about">About</Link>
          </li>
          <li className="hover:text-yellow-400 transition-colors">
            <Link href="/gallery">Gallery</Link>
          </li>
          <li className="hover:text-yellow-400 transition-colors">
            <Link href="/eboard">E-Board</Link>
          </li>
        </ul>

        {/* Right-side icons */}
        <div className="flex items-center">
          <DarkModeToggle />
          <div onClick={handleNav} className="md:hidden z-10 cursor-pointer ml-4">
            {nav ? (
              <AiOutlineClose size={25} style={{ color: "#fff" }} />
            ) : (
              <AiOutlineMenu size={25} style={{ color: textColor }} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`${
          nav
            ? "fixed left-0 top-0 w-full h-screen bg-black/90 text-white flex flex-col justify-center items-center transition-all duration-500"
            : "fixed left-[-100%]"
        }`}
      >
        <ul className="text-center space-y-8 text-3xl font-semibold">
          <li onClick={handleNav}><Link href="/">Home</Link></li>
          <li onClick={toggleDropdown} className="flex flex-col items-center">
            Committees <AiOutlineDown className="mt-2" />
            {dropdown && (
              <ul className="mt-3 space-y-3 text-2xl">
                <li onClick={handleNav}><Link href="/#committee">Committee</Link></li>
                <li onClick={handleNav}><Link href="/ACACommittee">Academic Committee</Link></li>
                <li onClick={handleNav}><Link href="/CommCommittee">Community Service</Link></li>
                <li onClick={handleNav}><Link href="/ITCommittee">Information Tech</Link></li>
                <li onClick={handleNav}><Link href="/ProfCommittee">Professional Dev</Link></li>
                <li onClick={handleNav}><Link href="/SocCommittee">Social Committee</Link></li>
              </ul>
            )}
          </li>
          <li onClick={handleNav}><Link href="/#mentorship">Mentorship</Link></li>
          <li onClick={handleNav}><Link href="/#sports">Sports</Link></li>
          <li onClick={handleNav}><Link href="/#contact">Contact</Link></li>
          <li onClick={handleNav}><Link href="/#about">About</Link></li>
          <li onClick={handleNav}><Link href="/gallery">Gallery</Link></li>
          <li onClick={handleNav}><Link href="/eboard">E-Board</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;



