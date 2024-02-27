import React from 'react';
import Link from 'next/link';
import { AiFillInstagram, AiFillLinkedin, AiFillYoutube } from 'react-icons/ai';
// come back to and add the full url to reaplce routes it goes to

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">Developing Men of Color</h4>
            <ul>
              <li><Link href="/#about" className="hover:text-gray-300">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Get Help</h4>
            <ul>
              <li><Link href="/#contact" className="hover:text-gray-300">Contact Us</Link></li>
              <li><Link href="/#calendar" className="hover:text-gray-300">Calendar</Link></li>
              <li><Link href="/#sports" className="hover:text-gray-300">Sports</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Programs</h4>
            <ul>
              <li><Link href="#mentorship" className="hover:text-gray-300">Mentorship</Link></li>
              <li><Link href="/ProfCommittee" className="hover:text-gray-300">Professional Development</Link></li>
              <li><Link href="/SocCommittee" className="hover:text-gray-300">Social Committee</Link></li>
              <li><Link href="/CommCommittee" className="hover:text-gray-300">Community Service Committee</Link></li>
              <li><Link href="/ACACommittee" className="hover:text-gray-300">Academic Committee</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Follow us</h4>
            <div className="flex">
            <a href="https://www.instagram.com/vcu.dmc/" target="_blank" rel="noopener noreferrer" className="mr-4 hover:text-gray-300">
                <AiFillInstagram size={48} />
              </a>
              <a href="https://www.linkedin.com/in/d-m-c-007824230/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <AiFillLinkedin size={48} />
              </a>
              <a href="https://www.youtube.com/@vcudevelopingmenofcolor3402" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <AiFillYoutube size={48} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

