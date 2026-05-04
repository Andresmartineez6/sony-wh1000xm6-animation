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
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto max-w-[1480px] px-4 md:px-6 pt-3 md:pt-4">
        <nav className={`glass-panel relative overflow-hidden rounded-[22px] md:rounded-full px-4 md:px-6 h-[68px] md:h-[78px] flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'shadow-[0_24px_70px_rgba(0,0,0,0.32)]' : 'shadow-[0_12px_40px_rgba(0,0,0,0.18)]'
        }`}>
          <div aria-hidden className="absolute inset-y-0 right-[18%] w-[24%] bg-[radial-gradient(circle_at_center,rgba(143,216,255,0.1),rgba(0,0,0,0))] blur-2xl" />
          <a href="#top" className="relative z-10 flex items-center gap-4 md:gap-5 group">
            <div className="relative">
              <div aria-hidden className="absolute -inset-x-5 -inset-y-4 rounded-full bg-white/[0.04] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              <Image
                src="/assets/sony-logo-white.png"
                alt="Sony"
                width={176}
                height={30}
                className="relative h-6 md:h-7 lg:h-8 w-auto opacity-95 group-hover:opacity-100 transition-opacity"
                priority
              />
            </div>
            <span className="hidden md:inline h-7 w-px bg-white/12" />
            <div className="hidden md:flex flex-col">
              <span className="text-[11px] tracking-[0.24em] font-semibold text-white/86 transition-colors group-hover:text-white">
                WH&#8209;1000XM6
              </span>
              <span className="text-[9px] tracking-[0.24em] uppercase text-white/34">
                Signature Noise Cancelling
              </span>
            </div>
          </a>

          <ul className="relative z-10 hidden md:flex items-center gap-7 lg:gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[12px] tracking-[0.08em] uppercase font-medium text-white/52 hover:text-white transition-colors duration-300 py-1">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex items-center gap-3">
            <a href="#buy" className="hidden md:inline-flex btn-primary !h-[42px] !px-5 !text-[11.5px]">
              <span>Comprar</span>
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" className="opacity-60"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <button
              aria-label="Abrir menú"
              onClick={() => setOpen((s) => !s)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] text-white/80"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                {open ? (
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                ) : (
                  <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden mx-4 mt-2"
          >
            <div className="glass-panel rounded-[22px] px-5 py-5">
              <ul className="flex flex-col gap-4">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a onClick={() => setOpen(false)} href={l.href} className="text-[13px] tracking-[0.12em] uppercase font-medium text-white/70 hover:text-white transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <a onClick={() => setOpen(false)} href="#buy" className="btn-primary !h-11 !text-[12px] w-full">
                    Comprar WH&#8209;1000XM6
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
