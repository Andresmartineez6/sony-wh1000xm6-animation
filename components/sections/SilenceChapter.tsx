'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useEffect, useRef } from 'react';

/**
 * Capítulo II — Silencio
 * Editorial cinematic chapter. Un waveform sinusoidal animado en canvas que
 * se aplana progresivamente con el scroll — metáfora visual real de la
 * cancelación de ruido. Acompañado de tipografía editorial y un grid de stats.
 */
export default function SilenceChapter() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const amplitudeRef = useRef(1);
  const rafRef = useRef<number | null>(null);
  const phaseRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Transforms para el layout editorial
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.95], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const statsOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.85, 0.95], [0, 1, 1, 0]);
  const statsY = useTransform(scrollYProgress, [0.35, 0.5], [20, 0]);
  const canvasOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scrollBarScale = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  // Amplitude of waveform collapses from 1 → 0 as the cancellation chapter progresses
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // 0.2 → 0.75 maps to 1 → 0.02 (from full wave to near-flat line)
    const t = Math.max(0, Math.min(1, (v - 0.2) / 0.55));
    amplitudeRef.current = 1 - t * 0.98;
  });

  // Canvas animation: sine wave modulated by amplitudeRef
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const mid = height / 2;
      const amp = amplitudeRef.current;
      phaseRef.current += 0.012;

      // === Incoming raw waveform (white, strong) ===
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = `rgba(255,255,255,${0.75})`;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const t = x / width;
        const envelope = Math.exp(-Math.pow((t - 0.5) * 1.6, 2)) * 0.9 + 0.1;
        const y =
          mid +
          Math.sin(t * 18 + phaseRef.current) * 28 * amp * envelope +
          Math.sin(t * 42 + phaseRef.current * 1.6) * 14 * amp * envelope +
          Math.sin(t * 80 + phaseRef.current * 0.7) * 6 * amp * envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // === Anti-phase waveform (ghost, subtle white) — only visible when amp still > 0 ===
      if (amp > 0.1) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(255,255,255,${0.22 * amp})`;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const t = x / width;
          const envelope = Math.exp(-Math.pow((t - 0.5) * 1.6, 2)) * 0.9 + 0.1;
          const y =
            mid -
            (Math.sin(t * 18 + phaseRef.current) * 28 * amp * envelope +
              Math.sin(t * 42 + phaseRef.current * 1.6) * 14 * amp * envelope +
              Math.sin(t * 80 + phaseRef.current * 0.7) * 6 * amp * envelope);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // === Flat silence line (always visible, grows stronger as amp → 0) ===
      const flatAlpha = 0.15 + (1 - amp) * 0.55;
      ctx.strokeStyle = `rgba(255,255,255,${flatAlpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(width, mid);
      ctx.stroke();

      // === Tick marks on silence line ===
      ctx.strokeStyle = `rgba(255,255,255,${0.25 + (1 - amp) * 0.2})`;
      ctx.lineWidth = 1;
      const ticks = 24;
      for (let i = 0; i <= ticks; i++) {
        const x = (i / ticks) * width;
        const h = i % 6 === 0 ? 10 : 4;
        ctx.beginPath();
        ctx.moveTo(x, mid + 22);
        ctx.lineTo(x, mid + 22 + h);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="silence"
      ref={ref}
      className="relative bg-black overflow-hidden"
      style={{ height: '220vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        {/* Top chapter row */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-10 pt-[12vh] md:pt-[14vh] px-6 md:px-12 flex justify-between items-start gap-6"
        >
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/35 mb-3">
              Capítulo II
            </p>
            <h2 className="font-display font-bold tracking-tightest text-white leading-[0.88] text-[13vw] sm:text-[10vw] md:text-[7.5vw] lg:text-[6rem]">
              Silencio.
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] tracking-[0.32em] uppercase text-white/30 mb-2">
              Adaptive ANC
            </p>
            <p className="text-[10px] tracking-[0.32em] uppercase text-white/22">
              QN3 · 12 MIC
            </p>
          </div>
        </motion.div>

        {/* Center waveform stage */}
        <motion.div
          style={{ opacity: canvasOpacity }}
          className="relative flex-1 mx-6 md:mx-12 my-6 md:my-8 flex items-center justify-center"
        >
          {/* Rule labels top */}
          <div className="absolute top-0 left-0 right-0 flex justify-between text-[9px] tracking-[0.3em] uppercase text-white/22">
            <span>Waveform · entrada</span>
            <span>1000 Hz · ref</span>
          </div>

          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ display: 'block' }}
          />

          {/* Rule labels bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] tracking-[0.3em] uppercase text-white/22">
            <span>{'20 Hz'}</span>
            <span>{'Silencio'}</span>
            <span>{'20 kHz'}</span>
          </div>
        </motion.div>

        {/* Bottom editorial row: copy + stats */}
        <motion.div
          style={{ opacity: statsOpacity, y: statsY }}
          className="relative z-10 px-6 md:px-12 pb-[10vh] md:pb-[12vh] grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-end"
        >
          <p className="text-white/55 text-[14px] md:text-[16px] leading-relaxed max-w-[34rem]">
            El procesador QN3 analiza 700 señales por segundo y genera una onda
            inversa que anula el ruido antes de que llegue al oído. Lo que queda,
            es esto. <span className="text-white/85">Silencio.</span>
          </p>

          <div className="grid grid-cols-4 gap-0 border-t border-white/[0.08]">
            {[
              { n: '−30', u: 'dB', l: 'Reducción' },
              { n: '700', u: '/s', l: 'Señales' },
              { n: '12', u: 'mic', l: 'Array ANC' },
              { n: 'QN3', u: '', l: 'Chip' },
            ].map((s, i) => (
              <div
                key={s.l}
                className={`py-4 px-3 text-left ${i > 0 ? 'border-l border-white/[0.08]' : ''}`}
              >
                <p className="font-display font-bold tracking-tight text-white/95 text-[22px] md:text-[28px] leading-none">
                  {s.n}
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/35 ml-1">
                    {s.u}
                  </span>
                </p>
                <p className="mt-2 text-[9px] tracking-[0.28em] uppercase text-white/35">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll progress for chapter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[9px] tracking-[0.32em] uppercase text-white/30 z-10">
          <span>Cancelación</span>
          <div className="w-28 h-[1px] bg-white/10 overflow-hidden">
            <motion.div
              style={{ scaleX: scrollBarScale, transformOrigin: 'left' }}
              className="h-full bg-white/60"
            />
          </div>
          <span>Silencio</span>
        </div>
      </div>
    </section>
  );
}
