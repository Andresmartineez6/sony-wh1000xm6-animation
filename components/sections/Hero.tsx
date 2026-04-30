'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.08 },
  }),
};

export default function Hero() {
  return (
    <section
      id="overview"
      className="relative isolate min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 40%, rgba(0, 80, 255, 0.10) 0%, rgba(0, 214, 255, 0.04) 40%, rgba(0,0,0,0) 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 inset-x-0 bottom-[-20%] h-[60%]"
        style={{
          background:
            'radial-gradient(50% 40% at 50% 50%, rgba(0, 214, 255, 0.06) 0%, rgba(0,0,0,0) 70%)',
        }}
      />

      {/* Sony logo flag */}
      <div className="absolute top-20 md:top-28 left-0 right-0 flex justify-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="flex items-center gap-2 md:gap-3 text-[10px] md:text-[11px] tracking-[0.3em] text-white/50 uppercase"
        >
          <span className="h-[1px] w-5 md:w-8 bg-white/20" />
          <Image
            src="/assets/sony-logo-white.png"
            alt="Sony"
            width={80}
            height={14}
            className="h-[11px] md:h-[13px] w-auto opacity-85"
          />
          <span className="text-white/40 hidden sm:inline">Flagship &middot; Cancelación de Ruido</span>
          <span className="h-[1px] w-5 md:w-8 bg-white/20" />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-6 text-center">
        <motion.h1
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-gradient font-display font-bold tracking-tightest leading-[0.92] text-[13vw] sm:text-[10vw] md:text-[9vw] lg:text-[8rem] xl:text-[9.5rem]"
        >
          WH&#8209;1000XM6
        </motion.h1>

        <motion.p
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-4 md:mt-6 text-white/80 font-light tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-[2.75rem]"
        >
          Silencio, perfeccionado.
        </motion.p>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-4 md:mt-5 mx-auto max-w-xl text-white/55 text-[14px] md:text-[16.5px] leading-relaxed"
        >
          Cancelación de ruido inalámbrica flagship, rediseñada para un mundo que no se detiene.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
        >
          <a
            href="#technology"
            className="relative inline-flex items-center gap-2 h-11 md:h-12 px-6 md:px-7 rounded-full ring-gradient text-[13px] md:text-[14px] font-semibold text-white"
          >
            <span>Descubrir WH&#8209;1000XM6</span>
            <span aria-hidden>&rarr;</span>
          </a>
          <a
            href="#specs"
            className="text-[13px] md:text-[14px] font-medium text-white/60 hover:text-white transition-colors"
          >
            Ver especificaciones
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Desliza</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse-slow" />
      </motion.div>
    </section>
  );
}
