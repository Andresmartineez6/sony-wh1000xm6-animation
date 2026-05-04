'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * Capítulo I — Silencio
 * Visualización abstracta de cancelación de ruido.
 * Ondas sonoras que entran desde los lados, colisionan en el centro y se cancelan.
 * Pura motion design en SVG — cero imágenes.
 */
export default function SilenceChapter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Las ondas entran y se cancelan progresivamente
  const wavesOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.9], [0, 1, 1, 0.2]);
  const cancelProgress = useTransform(scrollYProgress, [0.3, 0.65], [0, 1]);
  const silenceOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="silence"
      ref={ref}
      className="relative min-h-[180vh] bg-black overflow-hidden"
    >
      {/* Sticky cinematic stage */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Chapter label */}
        <motion.div
          style={{ y: titleY }}
          className="absolute top-[14vh] left-1/2 -translate-x-1/2 text-center pointer-events-none"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase text-white/30 mb-3">
            Capítulo I
          </p>
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/20">
            Silencio
          </p>
        </motion.div>

        {/* Abstract sound waves SVG */}
        <motion.div
          style={{ opacity: wavesOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <SoundWaves cancelProgress={cancelProgress} />
        </motion.div>

        {/* Center silence label */}
        <motion.div
          style={{ opacity: silenceOpacity }}
          className="relative z-10 text-center px-6 max-w-[42rem]"
        >
          <h2 className="font-display font-bold tracking-tightest text-white text-[15vw] sm:text-[11vw] md:text-[8.5vw] lg:text-[7rem] leading-[0.88]">
            Silencio.
          </h2>
          <p className="mt-6 text-white/45 text-[14px] md:text-[16px] leading-relaxed max-w-[28rem] mx-auto">
            Doce micrófonos, un procesador QN3 dedicado y 700 análisis por segundo.
            El ruido se cancela antes de que llegue a tus oídos.
          </p>
        </motion.div>

        {/* Bottom progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-white/25">
          <span>Cancelación</span>
          <div className="w-24 h-[1px] bg-white/10 overflow-hidden">
            <motion.div
              style={{ scaleX: cancelProgress, transformOrigin: 'left' }}
              className="h-full bg-white/60"
            />
          </div>
          <span>−30 dB</span>
        </div>
      </div>
    </section>
  );
}

function SoundWaves({ cancelProgress }: { cancelProgress: any }) {
  // Generate concentric arcs that come from the sides and meet in center
  const leftWavesX = useTransform(cancelProgress, [0, 1], [0, 50]);
  const rightWavesX = useTransform(cancelProgress, [0, 1], [0, -50]);
  const wavesOpacity = useTransform(cancelProgress, [0, 0.6, 1], [0.85, 0.6, 0.05]);

  return (
    <svg
      viewBox="0 0 1200 600"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="silenceCore" cx="50%" cy="50%" r="20%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.95)" />
          <stop offset="60%" stopColor="rgba(0,0,0,0.7)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <linearGradient id="waveGradL" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.55)" />
        </linearGradient>
        <linearGradient id="waveGradR" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* Left side incoming waves */}
      <motion.g style={{ x: leftWavesX, opacity: wavesOpacity }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const r = 80 + i * 60;
          return (
            <motion.path
              key={`l-${i}`}
              d={`M 600,${300 - r} A ${r},${r} 0 0 0 600,${300 + r}`}
              fill="none"
              stroke="url(#waveGradL)"
              strokeWidth={1.4 - i * 0.1}
              transform={`translate(-${i * 35}, 0)`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 + i * 0.2, ease: 'easeOut', delay: i * 0.1 }}
              style={{ opacity: 0.9 - i * 0.08 }}
            />
          );
        })}
      </motion.g>

      {/* Right side incoming waves (anti-phase) */}
      <motion.g style={{ x: rightWavesX, opacity: wavesOpacity }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const r = 80 + i * 60;
          return (
            <motion.path
              key={`r-${i}`}
              d={`M 600,${300 - r} A ${r},${r} 0 0 1 600,${300 + r}`}
              fill="none"
              stroke="url(#waveGradR)"
              strokeWidth={1.4 - i * 0.1}
              transform={`translate(${i * 35}, 0)`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 + i * 0.2, ease: 'easeOut', delay: i * 0.1 }}
              style={{ opacity: 0.9 - i * 0.08 }}
            />
          );
        })}
      </motion.g>

      {/* Vertical center reference line */}
      <line x1="600" y1="80" x2="600" y2="520" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 6" />

      {/* Silence core mask */}
      <circle cx="600" cy="300" r="160" fill="url(#silenceCore)" />

      {/* Tick marks for technical feel */}
      {[200, 400, 600, 800, 1000].map((x) => (
        <line key={x} x1={x} y1="540" x2={x} y2="546" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      ))}
    </svg>
  );
}
