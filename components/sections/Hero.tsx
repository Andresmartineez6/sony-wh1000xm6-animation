'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.1 },
  }),
};

const HERO_PILLS: string[] = ['Cancelación adaptativa', 'Hi-Res Wireless', '30h con ANC'];

const HERO_STATS: Array<{ value: string; label: string }> = [
  { value: '30h', label: 'Batería ANC' },
  { value: '12', label: 'Micrófonos' },
  { value: 'QN3', label: 'Procesador' },
  { value: '253g', label: 'Ultra ligero' },
];

export default function Hero() {
  return (
    <section
      id="overview"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      {/* Deep cinematic atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(65% 52% at 50% 30%, rgba(0, 60, 200, 0.18) 0%, rgba(0, 180, 255, 0.06) 38%, rgba(0,0,0,0) 68%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40vh]"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* Floating product — large and cinematic */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-[-12%] hidden lg:block w-[48vw] bg-[radial-gradient(circle_at_center,rgba(143,216,255,0.12),rgba(0,0,0,0))] blur-3xl -z-10" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1480px] grid-cols-1 items-center gap-12 px-4 pb-20 pt-28 md:px-6 md:pb-24 md:pt-36 lg:grid-cols-[0.78fr_1.22fr] lg:gap-8 xl:gap-14">
        <div className="order-2 lg:order-1 text-center lg:text-left">
          {/* Sony eyebrow */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex items-center justify-center gap-3 lg:justify-start"
          >
            <span className="h-[1px] w-7 md:w-9 bg-white/15" />
            <Image
              src="/assets/sony-logo-white.png"
              alt="Sony"
              width={96}
              height={16}
              className="h-[13px] md:h-[15px] w-auto opacity-84"
            />
            <span className="h-[1px] w-7 md:w-9 bg-white/15" />
          </motion.div>

          <motion.p
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-8 text-[10px] tracking-[0.34em] uppercase text-brand-cyan/80"
          >
            Reference Listening System
          </motion.p>

          <motion.h1
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-4 text-gradient font-display font-bold tracking-tightest leading-[0.9] text-[14vw] sm:text-[12vw] md:text-[11vw] lg:text-[6.7rem] xl:text-[8rem]"
          >
            WH&#8209;1000XM6
          </motion.h1>

          <motion.p
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-4 text-white/82 font-light tracking-tight text-[1.25rem] sm:text-[1.55rem] md:text-[1.9rem] lg:text-[2.25rem]"
          >
            Silencio de referencia, afinado como una pieza de estudio.
          </motion.p>

          <motion.p
            custom={4}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-5 mx-auto max-w-[620px] text-white/54 text-[14px] leading-relaxed md:text-[16px] lg:mx-0"
          >
            La nueva referencia en cancelación de ruido inalámbrica. Un objeto diseñado para desaparecer visualmente y dominarlo todo en sensación, foco y materia.
          </motion.p>

          <motion.div
            custom={5}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-7 flex flex-wrap items-center justify-center gap-2.5 md:gap-3 lg:justify-start"
          >
            {HERO_PILLS.map((pill) => (
              <span
                key={pill}
                className="glass-panel rounded-full px-4 py-2 text-[10px] md:text-[10.5px] tracking-[0.22em] uppercase text-white/46"
              >
                {pill}
              </span>
            ))}
          </motion.div>

          {/* New premium buttons */}
          <motion.div
            custom={6}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 lg:justify-start"
          >
            <a href="#technology" className="btn-primary !h-[50px] !px-6">
              <span>Entrar en la secuencia</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-70"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="#showcase" className="btn-secondary !h-[50px] !px-6">
              Ver producto
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            custom={7}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-12 grid w-full max-w-[720px] grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 lg:max-w-[640px] mx-auto lg:mx-0"
          >
            {HERO_STATS.map((item) => (
              <div key={item.label} className="glass-panel hover-glow rounded-[20px] px-4 py-4 text-center md:px-5 md:py-5">
                <p className="text-gradient font-display text-2xl md:text-3xl font-bold tracking-tight">
                  {item.value}
                </p>
                <p className="mt-1 text-[10px] tracking-[0.22em] uppercase text-white/36">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="order-1 lg:order-2 relative"
        >
          <div className="glass-panel relative overflow-hidden rounded-[32px] p-3 md:p-4 lg:ml-auto lg:max-w-[860px]">
            <div className="absolute inset-x-[16%] top-[6%] h-[18%] rounded-full bg-brand-blue/12 blur-[90px]" />
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-[24px] bg-[#08090c]">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/assets/sony-product-hero.png"
                className="absolute inset-0 h-full w-full object-cover opacity-[0.88]"
              >
                <source src="/_Smoothly_transition_from_sony.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_18%,rgba(0,0,0,0.18)_58%,rgba(0,0,0,0.64)_100%)]" />
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute left-5 top-5 flex items-center gap-3">
                <span className="glass-panel rounded-full px-4 py-2 text-[10px] tracking-[0.26em] uppercase text-white/46">
                  Film Capture
                </span>
                <span className="hidden md:inline-flex glass-panel rounded-full px-4 py-2 text-[10px] tracking-[0.26em] uppercase text-white/38">
                  Black Finish
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                <div className="max-w-[420px] text-left">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-brand-cyan/80">Editorial product view</p>
                  <p className="mt-2 text-white/90 text-[1rem] md:text-[1.18rem] tracking-tight">
                    Materia oscura, reflejo controlado y una presencia mucho más cercana a cine de producto que a landing comercial.
                  </p>
                </div>
                <div className="hidden md:block text-right text-[10px] tracking-[0.22em] uppercase text-white/36">
                  145 frames &middot; Sony motion
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[9px] tracking-[0.35em] uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/25 to-transparent animate-pulse-slow" />
      </motion.div>
    </section>
  );
}
