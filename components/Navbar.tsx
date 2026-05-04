'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
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
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastY;
    setLastY(latest);
    if (latest < 80) {
      setScrolled(false);
      setHidden(false);
      return;
    }
    setScrolled(true);
    if (diff > 8 && latest > 300) setHidden(true);
    if (diff < -4) setHidden(false);
  });

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <nav className={`relative flex items-center justify-between px-5 md:px-8 lg:px-12 h-[52px] md:h-[56px] transition-all duration-400 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/[0.06]' : 'bg-transparent'
      }`}>
        <a href="#top" className="relative z-10 flex items-center group">
          <Image
            src="/assets/sony-logo-white.png"
            alt="Sony"
            width={200}
            height={34}
            className="h-[22px] md:h-[26px] w-auto opacity-95 group-hover:opacity-100 transition-opacity"
            priority
          />
        </a>

        <ul className="relative z-10 hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-[10.5px] tracking-[0.1em] uppercase font-medium text-white/45 hover:text-white transition-colors duration-300">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="relative z-10 flex items-center gap-3">
          <a href="#buy" className="hidden md:inline-flex btn-primary !h-[34px] !px-4 !text-[9.5px]">
            Comprar
          </a>
          <button
            aria-label="Abrir menú"
            onClick={() => setOpen((s) => !s)}
            className="md:hidden flex items-center justify-center w-8 h-8 text-white/70"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              {open ? (
                <path d="M4 4l10 10M14 4l-10 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              ) : (
                <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-md border-b border-white/[0.06]"
          >
            <ul className="flex flex-col px-5 py-4 gap-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a onClick={() => setOpen(false)} href={l.href} className="block text-[11px] tracking-[0.12em] uppercase font-medium text-white/60 hover:text-white transition-colors py-1">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
