'use client';

import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.1 },
  }),
};

export default function Hero() {
  return (
    <section
      id="overview"
      className="relative isolate h-[100svh] overflow-hidden"
    >
      {/* Fullscreen video background */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/sony-product-hero.png"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/_Smoothly_transition_from_sony.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
      </div>

      {/* Content — centered, minimal */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-[12vh] px-6 text-center">
        <motion.p
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-5"
        >
          Wireless Noise Cancelling
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="font-display font-bold tracking-tightest leading-[0.88] text-white text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[6rem] xl:text-[7.5rem]"
        >
          WH-1000XM6
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-4 text-white/60 font-light text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] max-w-[520px] leading-relaxed"
        >
          Silencio de referencia, afinado como una pieza de estudio.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-8 flex items-center gap-4"
        >
          <a href="#technology" className="btn-primary">
            Descubrir
          </a>
          <a href="#showcase" className="btn-secondary">
            Ver producto
          </a>
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-10 flex items-center gap-8 text-[10px] tracking-[0.2em] uppercase text-white/30"
        >
          <span>30h batería</span>
          <span className="w-[1px] h-3 bg-white/15" />
          <span>12 micrófonos</span>
          <span className="w-[1px] h-3 bg-white/15" />
          <span>253g</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-6 bg-gradient-to-b from-white/20 to-transparent animate-pulse-slow" />
      </motion.div>
    </section>
  );
}
