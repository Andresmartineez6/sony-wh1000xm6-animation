'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '#overview', label: 'Inicio' },
  { href: '#technology', label: 'Tecnología' },
  { href: '#showcase', label: 'Producto' },
  { href: '#specs', label: 'Especificaciones' },
  { href: '#crafted', label: 'Sobre mí' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? 'glass' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-[1320px] h-16 md:h-[72px] px-5 md:px-8 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-4 group">
          <Image
            src="/assets/sony-logo-white.png"
            alt="Sony"
            width={140}
            height={24}
            className="h-6 md:h-7 w-auto opacity-95 group-hover:opacity-100 transition-opacity"
            priority
          />
          <span className="hidden md:inline h-5 w-px bg-white/20" />
          <span className="hidden md:inline text-[12px] tracking-[0.18em] font-medium text-white/60 group-hover:text-white/90 transition-colors">
            WH&#8209;1000XM6
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-[13px] tracking-tight font-medium text-white/65 hover:text-white transition-colors duration-300">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#buy" className="relative hidden md:inline-flex items-center gap-2 h-9 px-5 rounded-full ring-gradient text-[13px] font-semibold text-white/95 hover:text-white transition-colors">
            <span className="relative z-10">Descubrir</span>
            <span className="relative z-10 text-white/60">&rarr;</span>
          </a>
          <button
            aria-label="Abrir menú"
            onClick={() => setOpen((s) => !s)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/80"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass border-t border-white/5"
          >
            <ul className="px-5 py-5 flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a onClick={() => setOpen(false)} href={l.href} className="text-sm font-medium text-white/75 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a onClick={() => setOpen(false)} href="#buy" className="inline-flex items-center gap-2 h-9 px-4 rounded-full ring-gradient text-sm font-semibold text-white">
                  Descubrir WH&#8209;1000XM6 &rarr;
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
