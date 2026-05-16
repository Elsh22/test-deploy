import React from 'react';
import Link from 'next/link';
import { AiFillInstagram, AiFillLinkedin, AiFillYoutube } from 'react-icons/ai';

const footerGroups = [
  {
    title: 'DMC',
    links: [
      { href: '/#about', label: 'About' },
      { href: '/#calendar', label: 'Calendar' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/eboard', label: 'E-Board' },
    ],
  },
  {
    title: 'Programs',
    links: [
      { href: '/#mentorship', label: 'Mentorship' },
      { href: '/ProfCommittee', label: 'Professional Development' },
      { href: '/#sports', label: 'Sports' },
      { href: '/Donor', label: 'Donate' },
    ],
  },
  {
    title: 'Committees',
    links: [
      { href: '/ACACommittee', label: 'Academic' },
      { href: '/CommCommittee', label: 'Community Service' },
      { href: '/ITCommittee', label: 'Information Tech' },
      { href: '/SocCommittee', label: 'Social' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="dmc-panel-section border-t border-[var(--dmc-border)] px-6 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1.85fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center bg-yellow-400 text-xl font-black text-black">
                DMC
              </span>
              <span className="text-lg font-black">Developing Men of Color</span>
            </Link>
            <p className="dmc-muted mt-5 max-w-md leading-7">
              A VCU brotherhood built around excellence, mentorship, service, and
              professional growth.
            </p>

            <div className="mt-6 flex gap-3">
              <a href="https://www.instagram.com/vcu.dmc/" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center border border-[var(--dmc-border)] transition hover:border-yellow-400 hover:text-yellow-400" aria-label="DMC Instagram">
                <AiFillInstagram size={24} />
              </a>
              <a href="https://www.linkedin.com/in/d-m-c-007824230/" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center border border-[var(--dmc-border)] transition hover:border-yellow-400 hover:text-yellow-400" aria-label="DMC LinkedIn">
                <AiFillLinkedin size={24} />
              </a>
              <a href="https://www.youtube.com/@vcudevelopingmenofcolor3402" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center border border-[var(--dmc-border)] transition hover:border-yellow-400 hover:text-yellow-400" aria-label="DMC YouTube">
                <AiFillYoutube size={24} />
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h4 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-yellow-400">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="dmc-muted font-bold transition hover:text-yellow-400">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-[var(--dmc-border)] pt-6 text-sm font-bold text-[var(--dmc-muted)] md:flex-row">
          <p>© {new Date().getFullYear()} Developing Men of Color.</p>
          <Link href="/#contact" className="transition hover:text-yellow-400">
            Contact DMC
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
