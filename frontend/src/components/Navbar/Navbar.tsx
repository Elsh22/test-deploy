 "use client";

import Link from "next/link";
import { Bebas_Neue, Lora } from "next/font/google";
import { useState } from "react";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const navItems = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Resources", href: "/resources" },
  { label: "Leadership", href: "/leadership" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-black shadow-[0_12px_36px_rgba(0,0,0,0.35)]">
      <nav
        className={`relative grid w-full overflow-hidden bg-black px-4 text-white transition-all duration-300 md:px-6 ${
          mobileOpen
            ? "h-[31rem] py-3"
            : "h-20 py-3"
        }`}
      >
        <div className="relative z-10 flex items-center justify-between">
          <Link
            href="/"
            aria-label="DMC home"
            className={`${bebasNeue.className} flex items-center text-3xl leading-none text-yellow-400 md:text-5xl`}
          >
            Developing Men of Color
          </Link>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 md:gap-9 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`${lora.className} inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-yellow-400 transition hover:text-white md:text-base`}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/donate"
              className={`${lora.className} bg-yellow-400 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition hover:scale-105 hover:bg-white md:px-6 md:text-sm`}
            >
              Donate
            </Link>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((isOpen) => !isOpen);
            }}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 lg:hidden"
          >
            <span className="grid gap-1.5">
              <span
                className={`block h-0.5 w-5 bg-white transition ${
                  mobileOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition ${
                  mobileOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <div
          className={`relative z-10 border-t border-white/10 transition duration-300 lg:hidden ${
            mobileOpen
              ? "mt-4 opacity-100"
              : "pointer-events-none mt-0 opacity-0"
          }`}
        >
          <div className="grid gap-4 px-2 pt-5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-['PolySans'] text-xl font-black uppercase tracking-[0.14em] text-white"
              >
                {item.label}
              </Link>
            ))}

            <div className="grid gap-3 border-t border-white/10 pt-4">
              <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.2em] text-yellow-400">
                Featured
              </p>
              {[
                ["Professional Academy", "/programs#professional-academy"],
                ["Committees", "/programs#committees"],
                ["Opportunities", "/resources#opportunities"],
                ["Highlights", "/resources#highlights"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="font-['PolySans'] text-sm font-medium text-zinc-300"
                >
                  {label}
                </Link>
              ))}
            </div>

            <Link
              href="/donate"
              onClick={() => setMobileOpen(false)}
              className={`${lora.className} mt-2 inline-flex items-center justify-center bg-yellow-400 px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-black`}
            >
              Donate
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
