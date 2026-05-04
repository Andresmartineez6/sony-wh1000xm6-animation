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
  const [chapterLabel, setChapterLabel] = useState('Ingeniería');
  const [chapterIndex, setChapterIndex] = useState('01');

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
    const label =
      v < 0.28 ? 'Ingeniería' : v < 0.55 ? 'Cancelación de Ruido' : v < 0.8 ? 'Sonido' : 'Experiencia';
    const index = v < 0.28 ? '01' : v < 0.55 ? '02' : v < 0.8 ? '03' : '04';
    setChapterLabel((prev) => (prev === label ? prev : label));
    setChapterIndex((prev) => (prev === index ? prev : index));
  });

  const beat1Opacity = useTransform(smooth, [0.0, 0.05, 0.22, 0.28], [0, 1, 1, 0]);
  const beat1Y = useTransform(smooth, [0.0, 0.28], [40, -20]);
  const beat1Scale = useTransform(smooth, [0.0, 0.06, 0.22, 0.28], [0.94, 1, 1, 0.98]);
  const beat2Opacity = useTransform(smooth, [0.28, 0.34, 0.5, 0.58], [0, 1, 1, 0]);
  const beat2Y = useTransform(smooth, [0.28, 0.58], [40, -20]);
  const beat2Scale = useTransform(smooth, [0.28, 0.34, 0.5, 0.58], [0.94, 1, 1, 0.98]);
  const beat3Opacity = useTransform(smooth, [0.55, 0.62, 0.74, 0.82], [0, 1, 1, 0]);
  const beat3Y = useTransform(smooth, [0.55, 0.82], [40, -20]);
  const beat3Scale = useTransform(smooth, [0.55, 0.62, 0.74, 0.82], [0.94, 1, 1, 0.98]);
  const beat4Opacity = useTransform(smooth, [0.8, 0.88, 1.0], [0, 1, 1]);
  const beat4Y = useTransform(smooth, [0.8, 1.0], [40, 0]);
  const beat4Scale = useTransform(smooth, [0.8, 0.88, 1.0], [0.94, 1, 1]);
  const progressWidth = useTransform(smooth, [0, 1], ['0%', '100%']);
  const rail1Opacity = useTransform(smooth, [0.0, 0.06, 0.22, 0.3], [0.42, 1, 1, 0.42]);
  const rail2Opacity = useTransform(smooth, [0.2, 0.34, 0.5, 0.62], [0.32, 1, 1, 0.42]);
  const rail3Opacity = useTransform(smooth, [0.48, 0.62, 0.74, 0.84], [0.32, 1, 1, 0.42]);
  const rail4Opacity = useTransform(smooth, [0.76, 0.9, 1.0], [0.32, 1, 1]);

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

        <div className="absolute top-20 left-6 md:left-8 lg:left-10 hidden md:flex pointer-events-none">
          <div className="glass-panel rounded-2xl px-4 py-3">
            <p className="text-[10px] tracking-[0.28em] uppercase text-white/38">Scroll Film</p>
            <p className="mt-2 text-white/78 text-[14px] tracking-tight">{FRAME_COUNT} Frames &middot; 24 fps</p>
          </div>
        </div>

        <div className="absolute top-20 right-6 md:right-8 lg:right-10 hidden md:flex pointer-events-none">
          <div className="glass-panel rounded-2xl px-4 py-3 min-w-[190px]">
            <p className="text-[10px] tracking-[0.28em] uppercase text-white/38">Capítulo actual</p>
            <div className="mt-2 flex items-end justify-between gap-4">
              <div>
                <p className="text-gradient font-display text-2xl font-bold tracking-tight">{chapterIndex}</p>
                <p className="text-[12px] text-white/66 tracking-tight">{chapterLabel}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] tracking-[0.24em] uppercase text-white/34">Secuencia</p>
                <p className="mt-1 text-white/72 text-[13px] tracking-tight">XM6 Motion</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-8 top-1/2 hidden lg:flex -translate-y-1/2 flex-col gap-4 pointer-events-none">
          <motion.div style={{ opacity: rail1Opacity }} className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-brand-cyan/85" />
            <span className="text-[10px] tracking-[0.28em] uppercase text-white/55">01 &middot; Ingeniería</span>
          </motion.div>
          <motion.div style={{ opacity: rail2Opacity }} className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-brand-cyan/85" />
            <span className="text-[10px] tracking-[0.28em] uppercase text-white/55">02 &middot; ANC</span>
          </motion.div>
          <motion.div style={{ opacity: rail3Opacity }} className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-brand-cyan/85" />
            <span className="text-[10px] tracking-[0.28em] uppercase text-white/55">03 &middot; Sonido</span>
          </motion.div>
          <motion.div style={{ opacity: rail4Opacity }} className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-brand-cyan/85" />
            <span className="text-[10px] tracking-[0.28em] uppercase text-white/55">04 &middot; Experiencia</span>
          </motion.div>
        </div>

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
                {chapterIndex} &middot; {chapterLabel}
              </motion.span>
            </AnimatePresence>
            <span className="h-[1px] w-6 bg-white/20" />
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[min(86vw,460px)]">
          <div className="glass-panel rounded-full px-4 py-3 md:px-5 md:py-3.5">
            <div className="progress-track h-[2px] rounded-full overflow-hidden">
              <motion.div className="progress-fill h-full" style={{ width: progressWidth }} />
            </div>
            <div className="mt-2 flex justify-between text-[10px] tracking-[0.25em] uppercase text-white/35">
              <span>Diseñado</span>
              <span>Experimentado</span>
            </div>
          </div>
        </div>

        <motion.div
          id="noise"
          style={{ opacity: beat1Opacity, y: beat1Y, scale: beat1Scale }}
          className="absolute inset-y-0 inset-x-0 md:inset-x-auto md:left-0 md:right-auto flex items-center justify-center md:justify-start"
        >
          <div className="glass-panel rounded-[32px] px-6 py-6 md:px-8 md:py-8 max-w-[92vw] md:ml-8 md:max-w-[500px] text-center md:text-left lg:ml-12 shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-brand-cyan/80 mb-3 md:mb-4">01 &middot; Ingeniería</p>
            <h2 className="text-gradient font-display font-bold tracking-tighter text-3xl md:text-[3.4rem] leading-[0.98]">
              Precisión diseñada para el silencio.
            </h2>
            <p className="mt-4 md:mt-5 text-white/60 text-[14px] md:text-[17px] leading-relaxed">
              Drivers a medida, cámaras acústicas selladas y flujo de aire optimizado para una claridad de estudio.
            </p>
            <p className="mt-2 md:mt-3 text-white/45 text-[13px] md:text-[15px] leading-relaxed hidden md:block">
              Cada componente está afinado para equilibrio, potencia y comodidad &mdash; hora tras hora.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 justify-center md:justify-start">
              {['Fibra de carbono', 'Cámara sellada', 'Titanio flexible'].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase text-white/42">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: beat2Opacity, y: beat2Y, scale: beat2Scale }}
          className="absolute inset-y-0 inset-x-0 md:inset-x-auto md:right-0 md:left-auto flex items-center justify-center md:justify-end"
        >
          <div className="glass-panel rounded-[32px] px-6 py-6 md:px-8 md:py-8 max-w-[92vw] md:mr-8 md:max-w-[540px] text-center md:text-right lg:mr-12 shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-brand-cyan/80 mb-3 md:mb-4">02 &middot; Cancelación de Ruido</p>
            <h2 className="text-gradient font-display font-bold tracking-tighter text-3xl md:text-[3.4rem] leading-[0.98]">
              Cancelación adaptativa, redefinida.
            </h2>
            <ul className="mt-4 md:mt-6 space-y-2 md:space-y-3 text-white/60 text-[14px] md:text-[17px] leading-relaxed">
              <li>Array multi&#8209;micrófono que escucha en todas las direcciones.</li>
              <li>Análisis en tiempo real que se adapta a tu entorno.</li>
              <li className="hidden md:list-item">Tu música se mantiene pura &mdash; aviones, trenes y multitudes desaparecen.</li>
            </ul>
            <div className="mt-5 flex items-center justify-center gap-4 md:justify-end">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center">
                <p className="text-gradient font-display text-2xl font-bold tracking-tight">-30 dB</p>
                <p className="mt-1 text-[9px] tracking-[0.22em] uppercase text-white/34">Ruido exterior</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: beat3Opacity, y: beat3Y, scale: beat3Scale }}
          className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-20 md:justify-start md:pb-28 md:pl-12"
        >
          <div className="glass-panel rounded-[32px] px-6 py-6 md:px-8 md:py-8 max-w-[92vw] md:max-w-[620px] text-center md:text-left shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-brand-cyan/80 mb-3 md:mb-4">03 &middot; Sonido</p>
            <h2 className="text-gradient font-display font-bold tracking-tighter text-3xl md:text-[3.4rem] leading-[0.98]">
              Sonido inmersivo, real.
            </h2>
            <p className="mt-4 md:mt-5 text-white/60 text-[14px] md:text-[17px] leading-relaxed">
              Drivers de alto rendimiento que desbloquean detalle, profundidad y textura en cada pista.
              El upscaling con IA restaura la claridad del audio comprimido &mdash; cada nota cobra vida.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 md:justify-start">
              {['LDAC', 'DSEE Extreme', '360 Reality Audio'].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase text-white/42">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          id="buy"
          style={{ opacity: beat4Opacity, y: beat4Y, scale: beat4Scale }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="glass-panel rounded-[34px] px-6 py-7 md:px-8 md:py-8 max-w-[92vw] md:max-w-[960px] shadow-[0_30px_100px_rgba(0,0,0,0.34)]">
            <div className="grid gap-7 md:grid-cols-[1.12fr_0.88fr] md:items-end">
              <div className="text-center md:text-left">
                <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-brand-cyan/80 mb-3 md:mb-4">04 &middot; Experiencia</p>
                <h2 className="text-gradient font-display font-bold tracking-tightest text-4xl md:text-[4.8rem] lg:text-[5.2rem] leading-[0.95]">
                  Escúchalo todo.<br />No sientas nada más.
                </h2>
                <p className="mt-4 md:mt-6 max-w-[34rem] text-white/60 text-[14px] md:text-[17px] leading-relaxed md:max-w-[32rem]">
                  WH&#8209;1000XM6. Diseñados para concentrarte, creados para desaparecer cuando empieza la música.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 md:justify-start">
                  {['Avión', 'Oficina', 'Noche', 'Concentración'].map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase text-white/42">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/[0.08] bg-black/20 px-5 py-5 text-left md:px-6 md:py-6">
                <p className="text-[10px] tracking-[0.28em] uppercase text-white/42">XM6 &middot; Escucha diaria</p>
                <p className="mt-2 text-white/82 text-[17px] md:text-[19px] leading-snug tracking-tight">
                  Diseñados para aeropuertos, oficinas y noches de foco profundo sin sacrificar comodidad.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                  <a href="#specs" className="btn-primary justify-center">
                    <span>Descubrir WH&#8209;1000XM6</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-70"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  <a href="#specs" className="btn-ghost justify-center">
                    <span className="btn-ghost-line" />
                    Ver especificaciones
                  </a>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4">
                    <p className="text-gradient font-display text-2xl font-bold tracking-tight">-30 dB</p>
                    <p className="mt-1 text-[9px] tracking-[0.22em] uppercase text-white/34">Aislamiento activo</p>
                  </div>
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4">
                    <p className="text-gradient font-display text-2xl font-bold tracking-tight">12</p>
                    <p className="mt-1 text-[9px] tracking-[0.22em] uppercase text-white/34">Micrófonos ANC</p>
                  </div>
                </div>
              </div>
            </div>
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
