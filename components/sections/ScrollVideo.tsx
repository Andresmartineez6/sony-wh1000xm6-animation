'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Capítulo III — Movimiento
 * Video autoplay muted loop. El scroll NO scrubea el currentTime (eso causa
 * tirones con videos pesados). En su lugar, el scroll controla overlays,
 * zoom sutil y composición editorial — el video se reproduce fluido siempre.
 */
export default function ScrollVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax + zoom suave para que el scroll se sienta cinematográfico
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.0, 1.08]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.4, 0.4, 1]);

  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.6, 0.78], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.3], [40, 0]);

  const subOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.75, 0.9], [0, 1, 1, 0]);

  const chapterOpacity = useTransform(scrollYProgress, [0.05, 0.18, 0.88, 0.98], [0, 1, 1, 0]);

  // Lazy-load: solo carga el video cuando el usuario está a 1 pantalla
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100% 0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Autoplay robust: algunos navegadores bloquean autoplay hasta interaction
  useEffect(() => {
    if (!shouldLoad) return;
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = async () => {
      try {
        await v.play();
        setCanPlay(true);
      } catch {
        // Silent fail: user gesture puede re-disparar
      }
    };
    tryPlay();
    const onVisibility = () => {
      if (!document.hidden) tryPlay();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [shouldLoad]);

  return (
    <section
      id="motion"
      ref={ref}
      className="relative bg-black"
      style={{ height: '200vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video — parallax container */}
        <motion.div
          style={{ scale: videoScale, y: videoY }}
          className="absolute inset-0 will-change-transform"
        >
          <video
            ref={videoRef}
            src={shouldLoad ? "/assets/Introducing%20the%20Sony%20WH-1000XM6%20Wireless%20Noise%20Cancelling%20Headphones.mp4" : undefined}
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
            poster="/assets/cascos wh1000 mejora visual.png"
            className="absolute inset-0 h-full w-full object-cover"
            {...({ 'webkit-playsinline': 'true' } as Record<string, string>)}
          />
        </motion.div>

        {/* Cinematic vignette — más fuerte en los extremos del scroll */}
        <motion.div
          style={{ opacity: vignetteOpacity }}
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_85%_at_50%_50%,transparent_40%,rgba(0,0,0,0.55)_82%,rgba(0,0,0,0.95)_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
        {/* Dark base tint para que nunca se vea demasiado brillante */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />

        {/* Chapter mark */}
        <motion.div
          style={{ opacity: chapterOpacity }}
          className="absolute top-[12vh] left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase text-white/40 mb-3">
            Capítulo III
          </p>
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/22">
            Movimiento
          </p>
        </motion.div>

        {/* Main title */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 z-10 flex items-center justify-center px-6 pointer-events-none"
        >
          <div className="text-center max-w-[38rem]">
            <h2 className="font-display font-bold tracking-tightest text-white leading-[0.9] text-[10vw] sm:text-[7.5vw] md:text-[5.5vw] lg:text-[4.5rem]">
              Pieza en movimiento.
            </h2>
          </div>
        </motion.div>

        {/* Sub copy */}
        <motion.div
          style={{ opacity: subOpacity }}
          className="absolute bottom-[16vh] left-1/2 -translate-x-1/2 z-10 px-6 text-center pointer-events-none"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-3">
            Sony · Official Film
          </p>
          <p className="max-w-[36rem] mx-auto text-white/72 text-[15px] md:text-[17px] leading-relaxed">
            Diseño, acabado y ergonomía capturados en movimiento.
            Observa cada curva, cada material, cada transición.
          </p>
        </motion.div>

        {/* Minimal editorial chrome */}
        <div className="absolute top-6 left-6 text-[9px] tracking-[0.32em] uppercase text-white/35 z-10 pointer-events-none">
          XM6 · Reel 01
        </div>
        <div className="absolute top-6 right-6 text-[9px] tracking-[0.32em] uppercase text-white/35 z-10 pointer-events-none flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className={`${canPlay ? 'animate-ping' : ''} absolute inline-flex h-full w-full rounded-full bg-white/50 opacity-75`} />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/70" />
          </span>
          Live
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          <span className="text-[9px] tracking-[0.35em] uppercase text-white/30">Scroll</span>
        </div>
      </div>
    </section>
  );
}
