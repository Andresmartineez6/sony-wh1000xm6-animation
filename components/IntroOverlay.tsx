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
    const timer = setTimeout(() => setVisible(false), 2600);
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
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#020202]"
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(40% 35% at 50% 45%, rgba(0, 60, 200, 0.12) 0%, rgba(0,0,0,0) 70%)',
            }}
          />

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

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-8 w-32 h-[1px] bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-gradient-to-r from-brand-blue to-brand-cyan rounded-full"
            />
          </motion.div>

          {/* Model name reveal */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-[10px] tracking-[0.35em] uppercase text-white/35"
          >
            WH-1000XM6
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
