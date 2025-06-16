import React from 'react';
import Link from 'next/link';
import { AiFillInstagram, AiFillLinkedin, AiFillYoutube } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-dmc-black to-dmc-charcoal text-dmc-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-dmc-h4 font-dmc-primary text-dmc-gold mb-4">
              Developing Men of Color
            </h4>
            <ul>
              <li>
                <Link href="/#about" className="text-dmc-silver hover:text-dmc-gold transition-colors duration-300">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-dmc-h4 font-dmc-primary text-dmc-gold mb-4">Get Help</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#contact" className="text-dmc-silver hover:text-dmc-gold transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/#calendar" className="text-dmc-silver hover:text-dmc-gold transition-colors duration-300">
                  Calendar
                </Link>
              </li>
              <li>
                <Link href="/#sports" className="text-dmc-silver hover:text-dmc-gold transition-colors duration-300">
                  Sports
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-dmc-h4 font-dmc-primary text-dmc-gold mb-4">Programs</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#mentorship" className="text-dmc-silver hover:text-dmc-gold transition-colors duration-300">
                  Mentorship
                </Link>
              </li>
              <li>
                <Link href="/ProfCommittee" className="text-dmc-silver hover:text-dmc-gold transition-colors duration-300">
                  Professional Development
                </Link>
              </li>
              <li>
                <Link href="/SocCommittee" className="text-dmc-silver hover:text-dmc-gold transition-colors duration-300">
                  Social Committee
                </Link>
              </li>
              <li>
                <Link href="/CommCommittee" className="text-dmc-silver hover:text-dmc-gold transition-colors duration-300">
                  Community Service
                </Link>
              </li>
              <li>
                <Link href="/ACACommittee" className="text-dmc-silver hover:text-dmc-gold transition-colors duration-300">
                  Academic Committee
                </Link>
              </li>
              <li>
                <Link href="/ITCommittee" className="text-dmc-silver hover:text-dmc-gold transition-colors duration-300">
                  IT Committee
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-dmc-h4 font-dmc-primary text-dmc-gold mb-4">Follow us</h4>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/vcu.dmc/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-dmc-silver hover:text-dmc-gold transition-colors duration-300"
              >
                <AiFillInstagram size={32} />
              </a>
              <a 
                href="https://www.linkedin.com/in/d-m-c-007824230/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-dmc-silver hover:text-dmc-gold transition-colors duration-300"
              >
                <AiFillLinkedin size={32} />
              </a>
              <a 
                href="https://www.youtube.com/@vcudevelopingmenofcolor3402" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-dmc-silver hover:text-dmc-gold transition-colors duration-300"
              >
                <AiFillYoutube size={32} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-dmc-gold/30 mt-8 pt-8 text-center">
          <p className="text-dmc-silver">
            © 2025 Developing Men of Color. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
