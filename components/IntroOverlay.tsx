'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function IntroOverlay() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    const params = new URLSearchParams(window.location.search);
    return !(params.has('capture') || window.navigator.webdriver);
  });

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 3200);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999] overflow-hidden bg-[#020202]"
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(48% 42% at 50% 42%, rgba(0, 60, 200, 0.18) 0%, rgba(0, 214, 255, 0.06) 34%, rgba(0,0,0,0) 74%), linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0) 24%, rgba(0,0,0,0.28) 100%)',
            }}
          />

          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 h-[56vh] w-[56vh] max-h-[620px] max-w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]"
          />

          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.84 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 h-[36vh] w-[36vh] max-h-[420px] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,80,255,0.18)_0%,rgba(0,214,255,0.05)_42%,rgba(0,0,0,0)_74%)] blur-[42px]"
          />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              className="relative mb-8 flex items-center justify-center"
            >
              <motion.div
                aria-hidden
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1.04 }}
                transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute h-[220px] w-[220px] rounded-full border border-white/[0.05] sm:h-[320px] sm:w-[320px]"
              />
              <div className="relative h-[150px] w-[260px] sm:h-[210px] sm:w-[420px]">
                <Image
                  src="/assets/sony-product-hero.png"
                  alt=""
                  fill
                  sizes="(max-width: 640px) 260px, 420px"
                  className="object-contain opacity-[0.52]"
                  priority
                />
              </div>
            </motion.div>

          {/* Sony logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <Image
                src="/assets/sony-logo-white.png"
                alt="Sony"
                width={140}
                height={24}
                className="h-6 md:h-7 w-auto opacity-90"
                priority
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-[10px] tracking-[0.38em] uppercase text-white/28"
            >
              Signature Noise Cancelling
            </motion.p>

          {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-8 h-[1px] w-[min(78vw,280px)] rounded-full bg-white/10 overflow-hidden"
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.25, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-brand-blue via-brand-cyan to-white/80"
              />
            </motion.div>

          {/* Model name reveal */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 flex flex-col items-center gap-3 text-center"
            >
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/35">
                WH-1000XM6
              </p>
              <p className="max-w-[28rem] text-[13px] md:text-[14px] tracking-tight text-white/48">
                Calibrando materia, silencio y movimiento antes de entrar en la experiencia.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.7 }}
              className="mt-8 flex items-center gap-3 text-[9px] tracking-[0.28em] uppercase text-white/22"
            >
              <span className="h-[1px] w-8 bg-white/10" />
              <span>Editorial Product Sequence</span>
              <span className="h-[1px] w-8 bg-white/10" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
