'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { FRAME_COUNT, framePath } from '@/lib/frames';
import FallbackDiagram from './FallbackDiagram';

type LoadState = 'idle' | 'loading' | 'ready' | 'missing';

export default function ScrollScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [loadState, setLoadState] = useState<LoadState>('idle');
  const [loadedPct, setLoadedPct] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.6 });

  useEffect(() => {
    let cancelled = false;
    setLoadState('loading');

    const probe = new Image();
    probe.src = framePath(1);
    probe.onerror = () => {
      if (!cancelled) setLoadState('missing');
    };
    probe.onload = () => {
      if (cancelled) return;
      const images: HTMLImageElement[] = new Array(FRAME_COUNT);
      images[0] = probe;
      let loaded = 1;
      const mark = () => {
        loaded += 1;
        setLoadedPct(Math.round((loaded / FRAME_COUNT) * 100));
        if (loaded >= FRAME_COUNT && !cancelled) {
          setLoadState('ready');
          drawFrame(currentFrameRef.current);
        }
      };
      for (let i = 2; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = framePath(i);
        img.onload = mark;
        img.onerror = mark;
        images[i - 1] = img;
      }
      imagesRef.current = images;
      drawFrame(0);
    };

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      // HiDPI for crispness on retina/4K. Source is now lossless WebP from MP4.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      canvas.style.width = cw + 'px';
      canvas.style.height = ch + 'px';
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }
      drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const drawFrame = (i: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imagesRef.current[i];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const w = canvas.width;
    const h = canvas.height;
    // object-fit: contain — fill viewport while preserving aspect ratio
    const scale = Math.min(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  useMotionValueEvent(smooth, 'change', (v) => {
    const frame = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.round(v * (FRAME_COUNT - 1)))
    );
    if (frame !== currentFrameRef.current) {
      currentFrameRef.current = frame;
      drawFrame(frame);
    }
  });

  const beat1Opacity = useTransform(smooth, [0.0, 0.05, 0.22, 0.28], [0, 1, 1, 0]);
  const beat1Y = useTransform(smooth, [0.0, 0.28], [40, -20]);
  const beat2Opacity = useTransform(smooth, [0.28, 0.34, 0.5, 0.58], [0, 1, 1, 0]);
  const beat2Y = useTransform(smooth, [0.28, 0.58], [40, -20]);
  const beat3Opacity = useTransform(smooth, [0.55, 0.62, 0.74, 0.82], [0, 1, 1, 0]);
  const beat3Y = useTransform(smooth, [0.55, 0.82], [40, -20]);
  const beat4Opacity = useTransform(smooth, [0.8, 0.88, 1.0], [0, 1, 1]);
  const beat4Y = useTransform(smooth, [0.8, 1.0], [40, 0]);
  const progressWidth = useTransform(smooth, [0, 1], ['0%', '100%']);

  const [chapterLabel, setChapterLabel] = useState('Ingeniería');
  useMotionValueEvent(smooth, 'change', (v) => {
    const label =
      v < 0.28 ? 'Ingeniería' : v < 0.55 ? 'Cancelación de Ruido' : v < 0.8 ? 'Sonido' : 'Experiencia';
    setChapterLabel((prev) => (prev === label ? prev : label));
  });

  return (
    <section id="technology" ref={containerRef} className="relative" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 45% at 50% 50%, rgba(0, 80, 255, 0.08) 0%, rgba(0, 214, 255, 0.03) 45%, rgba(0,0,0,0) 75%)',
          }}
        />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ visibility: loadState === 'missing' ? 'hidden' : 'visible' }}
        />

        {loadState === 'missing' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <FallbackDiagram progress={smooth} />
          </div>
        )}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        <div className="absolute top-20 left-0 right-0 flex justify-center pointer-events-none">
          <div className="flex items-center gap-3 text-[10.5px] tracking-[0.3em] uppercase text-white/45">
            <span className="h-[1px] w-6 bg-white/20" />
            <AnimatePresence mode="wait">
              <motion.span
                key={chapterLabel}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
              >
                {chapterLabel}
              </motion.span>
            </AnimatePresence>
            <span className="h-[1px] w-6 bg-white/20" />
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[min(80vw,420px)]">
          <div className="progress-track h-[2px] rounded-full overflow-hidden">
            <motion.div className="progress-fill h-full" style={{ width: progressWidth }} />
          </div>
          <div className="mt-2 flex justify-between text-[10px] tracking-[0.25em] uppercase text-white/35">
            <span>Diseñado</span>
            <span>Experimentado</span>
          </div>
        </div>

        <motion.div
          id="noise"
          style={{ opacity: beat1Opacity, y: beat1Y }}
          className="absolute inset-y-0 inset-x-0 md:inset-x-auto md:left-0 md:right-auto flex items-center justify-center md:justify-start"
        >
          <div className="px-6 md:px-14 max-w-[90vw] md:max-w-[520px] text-center md:text-left">
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-brand-cyan/80 mb-3 md:mb-4">01 &middot; Ingeniería</p>
            <h2 className="text-gradient font-display font-bold tracking-tighter text-3xl md:text-5xl lg:text-6xl leading-[0.98]">
              Precisión diseñada para el silencio.
            </h2>
            <p className="mt-4 md:mt-5 text-white/60 text-[14px] md:text-[17px] leading-relaxed">
              Drivers a medida, cámaras acústicas selladas y flujo de aire optimizado para una claridad de estudio.
            </p>
            <p className="mt-2 md:mt-3 text-white/45 text-[13px] md:text-[15px] leading-relaxed hidden md:block">
              Cada componente está afinado para equilibrio, potencia y comodidad &mdash; hora tras hora.
            </p>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: beat2Opacity, y: beat2Y }}
          className="absolute inset-y-0 inset-x-0 md:inset-x-auto md:right-0 md:left-auto flex items-center justify-center md:justify-end"
        >
          <div className="px-6 md:px-14 max-w-[90vw] md:max-w-[540px] text-center md:text-right">
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-brand-cyan/80 mb-3 md:mb-4">02 &middot; Cancelación de Ruido</p>
            <h2 className="text-gradient font-display font-bold tracking-tighter text-3xl md:text-5xl lg:text-6xl leading-[0.98]">
              Cancelación adaptativa, redefinida.
            </h2>
            <ul className="mt-4 md:mt-6 space-y-2 md:space-y-3 text-white/60 text-[14px] md:text-[17px] leading-relaxed">
              <li>Array multi&#8209;micrófono que escucha en todas las direcciones.</li>
              <li>Análisis en tiempo real que se adapta a tu entorno.</li>
              <li className="hidden md:list-item">Tu música se mantiene pura &mdash; aviones, trenes y multitudes desaparecen.</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: beat3Opacity, y: beat3Y }}
          className="absolute inset-0 flex items-end justify-center pb-24 md:pb-40"
        >
          <div className="px-6 max-w-[90vw] md:max-w-[720px] text-center">
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-brand-cyan/80 mb-3 md:mb-4">03 &middot; Sonido</p>
            <h2 className="text-gradient font-display font-bold tracking-tighter text-3xl md:text-5xl lg:text-6xl leading-[0.98]">
              Sonido inmersivo, real.
            </h2>
            <p className="mt-4 md:mt-5 text-white/60 text-[14px] md:text-[17px] leading-relaxed">
              Drivers de alto rendimiento que desbloquean detalle, profundidad y textura en cada pista.
              El upscaling con IA restaura la claridad del audio comprimido &mdash; cada nota cobra vida.
            </p>
          </div>
        </motion.div>

        <motion.div
          id="buy"
          style={{ opacity: beat4Opacity, y: beat4Y }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="px-6 max-w-[90vw] md:max-w-[780px] text-center">
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-brand-cyan/80 mb-3 md:mb-4">04 &middot; Experiencia</p>
            <h2 className="text-gradient font-display font-bold tracking-tightest text-4xl md:text-6xl lg:text-[5.5rem] leading-[0.95]">
              Escúchalo todo.<br />No sientas nada más.
            </h2>
            <p className="mt-4 md:mt-6 text-white/60 text-[14px] md:text-[17px] leading-relaxed">
              WH&#8209;1000XM6. Diseñados para concentrarte, creados para tu comodidad.
            </p>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5">
              <a href="#specs" className="relative inline-flex items-center gap-2 h-11 md:h-12 px-6 md:px-7 rounded-full ring-gradient text-[13px] md:text-[14px] font-semibold text-white">
                <span>Descubrir WH&#8209;1000XM6</span>
                <span aria-hidden>&rarr;</span>
              </a>
              <a href="#specs" className="text-[13px] md:text-[14px] font-medium text-white/60 hover:text-white transition-colors">
                Ver especificaciones
              </a>
            </div>
            <p className="mt-5 md:mt-6 text-[11px] md:text-[12px] tracking-tight text-white/35">
              Diseñados para aeropuertos, oficinas y todo lo que hay en medio.
            </p>
          </div>
        </motion.div>

        <AnimatePresence>
          {loadState === 'loading' && loadedPct < 100 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-20 right-6 text-[10px] tracking-[0.25em] uppercase text-white/40"
            >
              Cargando secuencia &middot; {loadedPct}%
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
