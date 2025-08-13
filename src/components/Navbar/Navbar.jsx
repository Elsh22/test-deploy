"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineMenu, AiOutlineClose, AiOutlineDown } from 'react-icons/ai';
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import DMCParallelogramTransition from '../Transition/DMCParallelogramTransition';

const Navbar = () => {
  const pathname = usePathname();
  const [nav, setNav] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [color, setColor] = useState('#000000');
  const [textColor, setTextColor] = useState('white');
  const [iconColor, setIconColor] = useState('white');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNav = () => {
    setNav(!nav);
    setActiveDropdown(null);
  };

  const handleTransitionProgress = () => {
    window.location.href = '/';
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (pathname !== '/') {
      setIsTransitioning(true);
      // Navigation will be triggered by the transition component
    }
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90 || nav) {
        setColor('#ffffff');
        setTextColor('#000000');
        setIconColor('#000000');
      } else {
        setColor('#000000');
        setTextColor('white');
        setIconColor('white');
      }
    };
    window.addEventListener('scroll', changeColor);
    changeColor();
    return () => window.removeEventListener('scroll', changeColor);
  }, [nav]);

  useEffect(() => {
    setNav(false);
    setActiveDropdown(null);
  }, [pathname]);

  const navigationItems = [
    {
      title: 'About Us',
      path: '/aboutus',
      type: 'link'
    },
    {
      title: 'Membership',
      type: 'dropdown',
      items: [
        { title: 'University', path: '/unimembership' },
        { title: 'Non-Profit', path: '/non_profitmembership' }
      ]
    },
    {
      title: 'Events',
      path: '/event',
      type: 'link'
    },
    {
      title: 'Partnership',
      path: '/partnership',
      type: 'link'
    },
    {
      title: 'Blog',
      path: '/blog',
      type: 'link'
    },
    {
      title: 'Contact Us',
      path: '/contactus',
      type: 'link'
    },
    {
      title: 'Start a Chapter',
      path: '/newchapter',
      type: 'link'
    },
    {
      title: 'Resources',
      path: '/resources',
      type: 'link'
    }
  ];

  return (
    <>
      <DMCParallelogramTransition 
        isLoading={isTransitioning} 
        onTransitionProgress={handleTransitionProgress}
      />
      
      {/* Conference Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-amber-400 text-white py-2 text-center">
        <p className="text-sm md:text-base font-medium">
          Join us for our Fall Conference! 
          <span className="mx-2 font-bold">September 7th</span>
          <Link href="/event/8th-annual-dmc-mixer" className="underline ml-2 hover:text-blue-200">
            Register Now
          </Link>
        </p>
      </div>

      {/* Main Navbar */}
      <div 
        style={{ backgroundColor: `${color}` }} 
        className="fixed left-0 top-10 w-full z-40 ease-in duration-300"
      >
        <div className="max-w-[1240px] m-auto flex justify-between items-center p-4">
          <Link href="/" onClick={handleLogoClick}>
            <h1 style={{ color: `${textColor}` }} className="font-bold text-4xl">
              DMC
            </h1>
          </Link>

          {/* Desktop Navigation - Only show above 1022px */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative">
                {item.type === 'link' ? (
                  <Link 
                    href={item.path}
                    style={{ color: `${textColor}` }}
                    className="hover:opacity-80 transition-opacity"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(item.title)}
                      style={{ color: `${textColor}` }}
                      className="flex items-center hover:opacity-80 transition-opacity"
                    >
                      {item.title}
                      <AiOutlineDown 
                        className={`ml-1 transition-transform duration-200 ${
                          activeDropdown === item.title ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    {activeDropdown === item.title && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden">
                        {item.items.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.path}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <DarkModeToggle />
          </nav>

          {/* Mobile Menu Button - Show below 1022px */}
          <div className="lg:hidden flex items-center space-x-4">
            <DarkModeToggle />
            <button 
              onClick={handleNav}
              className="cursor-pointer p-2"
              aria-label="Toggle Menu"
            >
              {nav ? (
                <AiOutlineClose size={25} style={{ color: 'white' }} />
              ) : (
                <AiOutlineMenu size={25} style={{ color: `${iconColor}` }} />
              )}
            </button>
          </div>
        </div>

        {/* Full Screen Mobile Menu */}
        {nav && (
          <div className="lg:hidden fixed inset-0 bg-black/95 z-50">
            <div className="flex flex-col items-center justify-center min-h-screen">
              {navigationItems.map((item, index) => (
                <div key={index} className="py-4 text-center">
                  {item.type === 'link' ? (
                    <Link
                      href={item.path}
                      onClick={handleNav}
                      className="text-4xl text-white hover:text-gray-300 transition-colors"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(item.title)}
                        className="text-4xl text-white hover:text-gray-300 flex items-center gap-2"
                      >
                        {item.title}
                        <AiOutlineDown className={`transition-transform duration-200 ${
                          activeDropdown === item.title ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {activeDropdown === item.title && (
                        <div className="mt-4 space-y-4">
                          {item.items.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.path}
                              onClick={handleNav}
                              className="block text-3xl text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-28" />
    </>
  );
};

export default Navbar;