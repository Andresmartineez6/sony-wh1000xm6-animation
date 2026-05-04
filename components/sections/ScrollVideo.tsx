'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

/**
 * Capítulo · Movimiento
 * Video controlado por scroll. El usuario hace scroll → el video avanza.
 * Sin autoplay, sin sonido, sin loop. Pure scroll storytelling.
 */
export default function ScrollVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Map scroll progress (0-1) to active range (0.15 - 0.85) → video time
  const videoProgress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0.05, 0.18, 0.82, 0.95], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.7, 0.9], [0, 1, 1, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onMeta = () => {
      setDuration(v.duration || 0);
      setReady(true);
    };
    v.addEventListener('loadedmetadata', onMeta);
    if (v.readyState >= 1) onMeta();
    return () => v.removeEventListener('loadedmetadata', onMeta);
  }, []);

  // Smooth lerp video.currentTime towards targetTime
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !duration) return;

    const tick = () => {
      const target = targetTimeRef.current;
      const cur = v.currentTime;
      const next = cur + (target - cur) * 0.18;
      if (Math.abs(target - cur) > 0.01) {
        try {
          v.currentTime = next;
        } catch {}
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration]);

  useMotionValueEvent(videoProgress, 'change', (p) => {
    if (!duration) return;
    const clamped = Math.max(0, Math.min(1, p));
    targetTimeRef.current = clamped * (duration - 0.05);
  });

  return (
    <section
      id="motion"
      ref={ref}
      className="relative bg-black"
      style={{ height: '320vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video layer */}
        <video
          ref={videoRef}
          src="/assets/Introducing%20the%20Sony%20WH-1000XM6%20Wireless%20Noise%20Cancelling%20Headphones.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          {...({ 'webkit-playsinline': 'true' } as Record<string, string>)}
        />

        {/* Hard cinematic vignette to mask any letterbox / artifacts */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_85%_at_50%_50%,transparent_45%,rgba(0,0,0,0.55)_85%,rgba(0,0,0,0.95)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        {/* Chapter label */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="absolute top-[12vh] left-1/2 -translate-x-1/2 text-center pointer-events-none z-10"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase text-white/35 mb-3">
            Capítulo III
          </p>
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/22">
            Movimiento
          </p>
        </motion.div>

        {/* Editorial overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-x-0 bottom-[14vh] flex justify-center px-6 z-10 pointer-events-none"
        >
          <div className="max-w-[720px] text-center">
            <h2 className="font-display font-bold tracking-tightest text-white text-[7vw] sm:text-[5.5vw] md:text-[4.2vw] lg:text-[3.5rem] leading-[0.95]">
              Pieza en movimiento.
            </h2>
            <p className="mt-4 text-white/55 text-[13px] md:text-[15px] leading-relaxed max-w-[34rem] mx-auto">
              Cada plano del producto, controlado por tu propio scroll. Tu ritmo, tu cámara.
            </p>
          </div>
        </motion.div>

        {/* Scrub indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 text-[9.5px] tracking-[0.3em] uppercase text-white/30 pointer-events-none">
          <span>00:00</span>
          <div className="w-32 h-[1px] bg-white/10 overflow-hidden">
            <motion.div
              style={{ scaleX: videoProgress, transformOrigin: 'left' }}
              className="h-full bg-white/55"
            />
          </div>
          <span>{ready ? formatTime(duration) : '——'}</span>
        </div>

        {/* Side rule */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block pointer-events-none">
          <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent" />
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block pointer-events-none">
          <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function formatTime(s: number) {
  if (!s || !isFinite(s)) return '——';
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m.toString().padStart(2, '0')}:${r.toString().padStart(2, '0')}`;
}
