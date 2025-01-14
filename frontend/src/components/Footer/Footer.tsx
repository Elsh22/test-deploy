import React from 'react';
import Link from 'next/link';
import { AiFillInstagram, AiFillLinkedin, AiFillYoutube } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Main Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/aboutus" className="hover:text-gray-300">About Us</Link></li>
              <li><Link href="/event" className="hover:text-gray-300">Events</Link></li>
              <li><Link href="/blog" className="hover:text-gray-300">Blog</Link></li>
              <li><Link href="/contactus" className="hover:text-gray-300">Contact Us</Link></li>
            </ul>
          </div>

          {/* Membership & Partnership */}
          <div>
            <h4 className="text-lg font-bold mb-4">Join DMC</h4>
            <ul className="space-y-2">
              <li><Link href="/unimembership" className="hover:text-gray-300">University Membership</Link></li>
              <li><Link href="/non_profitmembership" className="hover:text-gray-300">Non-Profit Membership</Link></li>
              <li><Link href="/newchapter" className="hover:text-gray-300">Start a Chapter</Link></li>
              <li><Link href="/partnership" className="hover:text-gray-300">Partnership/Sponsorship</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/resources" className="hover:text-gray-300">Resources Hub</Link></li>
              <li><Link href="/ProfCommittee" className="hover:text-gray-300">Professional Development</Link></li>
              <li><Link href="/ACACommittee" className="hover:text-gray-300">Academic Resources</Link></li>
              <li><Link href="/CommCommittee" className="hover:text-gray-300">Community Service</Link></li>
              <li><Link href="/ITCommittee" className="hover:text-gray-300">IT Resources</Link></li>
              <li><Link href="/SocCommittee" className="hover:text-gray-300">Social Committee</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/vcu.dmc/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gray-300 transition-colors"
                aria-label="Instagram"
              >
                <AiFillInstagram size={48} />
              </a>
              <a 
                href="https://www.linkedin.com/in/d-m-c-007824230/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gray-300 transition-colors"
                aria-label="LinkedIn"
              >
                <AiFillLinkedin size={48} />
              </a>
              <a 
                href="https://www.youtube.com/@vcudevelopingmenofcolor3402" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gray-300 transition-colors"
                aria-label="YouTube"
              >
                <AiFillYoutube size={48} />
              </a>
            </div>
            <div className="mt-6">
              <Link 
                href="/contactus" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Developing Men of Color. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
