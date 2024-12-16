"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser, AiOutlineDown } from 'react-icons/ai';
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
//import img1 from '../../newassest/person.jpg';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [color, setColor] = useState('#000000');
  const [textColor, setTextColor] = useState('white'); 
  const [iconColor, setIconColor] = useState('white'); 


  const handleNav = () => {
    setNav(!nav);
    if (dropdown) setDropdown(false); // Close dropdown when nav is toggled
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
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
/*
<Link href='/login'>
          <AiOutlineUser  className='rounded-full cursor-pointer' size={20} style={{ color: `${iconColor}`, marginLeft: '2rem' }} />
          </Link> 

          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
          
*/
  return (
    <div style={{ backgroundColor: `${color}` }} className='fixed left-0 top-0 w-full z-10 ease-in duration-300'>
      <div className='max-w-[1240px] m-auto flex justify-between items-center p-4'>
        <Link href='/'>
          <h1 style={{ color: `${textColor}` }} className='font-bold text-4xl'>DMC</h1>
        </Link>

        <div className='flex items-center'> 
        <DarkModeToggle  />
          <div onClick={handleNav} className='z-10 cursor-pointer ml-4'> 
            {nav ? (
              <AiOutlineClose size={20} style={{ color: 'white' }} />
            ) : (
              <AiOutlineMenu size={20} style={{ color: `${iconColor}` }} />
            )}
          </div>
        </div>

        <div className={nav ? 'absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300' : 'absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'}>
          <ul style={{ color: 'white' }}>
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500 select-none'>
              <Link href='/'>Home</Link>
            </li>
            <li className='p-4 text-4xl hover:text-gray-500 select-none flex items-center'>
            <span onClick={toggleDropdown} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              Committees
              <AiOutlineDown className={`ml-2 ${dropdown ? 'rotate-180' : ''}`} />
            </span>
              {dropdown && (
                <ul className='bg-black text-white text-3xl space-y-2'>
                  <li onClick={handleNav} className='p-2 text-4xl hover:text-gray-500 select-none flex items-center'><Link href='/#committee'>Committee</Link></li>
                  <li onClick={handleNav} className='p-2 text-4xl hover:text-gray-500 select-none flex items-center'><Link href='/ACACommittee'>Academic Committee</Link></li>
                  <li onClick={handleNav} className='p-2 text-4xl hover:text-gray-500 select-none flex items-center'><Link href='/CommCommittee'>Community Service Committee</Link></li>
                  <li onClick={handleNav} className='p-2 text-4xl hover:text-gray-500 select-none flex items-center'><Link href='/ITCommittee'>Information Technology Committee</Link></li>
                  <li onClick={handleNav} className='p-2 text-4xl hover:text-gray-500 select-none flex items-center'><Link href='/ProfCommittee'>Professional Development</Link></li>
                  <li onClick={handleNav} className='p-2 text-4xl hover:text-gray-500 select-none flex items-center'><Link href='/SocCommittee'>Social Committee</Link></li>
                </ul>
              )}
            </li>
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500 select-none'>
              <Link href='/#mentorship'>Mentorship</Link>
            </li>
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500 select-none'>
              <Link href='/#sports'>Sports</Link>
            </li>
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500 select-none'>
              <Link href='/#contact'>Contact</Link>
            </li>
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500 select-none'>
              <Link href='/#about'>About</Link>
            </li>
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500 select-none'>
              <Link href='/gallery'>Gallery</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

/*
<li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500 select-none'>
              <Link href='/scholarship'>Scholarship</Link>
            </li>
*/