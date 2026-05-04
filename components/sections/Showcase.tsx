'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const explodedScale = useTransform(scrollYProgress, [0.1, 0.6], [0.92, 1.05]);
  const explodedOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.85, 1], [0, 1, 1, 0.6]);

  return (
    <section
      id="showcase"
      ref={ref}
      className="relative bg-ink-900 py-28 md:py-40 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(42% 34% at 18% 24%, rgba(0, 80, 255, 0.08) 0%, rgba(0,0,0,0) 72%), radial-gradient(38% 30% at 82% 68%, rgba(0, 214, 255, 0.05) 0%, rgba(0,0,0,0) 70%)',
        }}
      />
      <div className="section-divider absolute top-0 inset-x-0" />

      <div className="mx-auto max-w-[1320px] px-5 md:px-6">
        {/* Section eyebrow */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.3em] uppercase text-brand-cyan/80 mb-4"
          >
            Producto
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-gradient font-display font-bold tracking-tighter text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.92]"
          >
            Dentro del silencio.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 mx-auto max-w-2xl text-white/46 text-[15px] md:text-[17px] leading-relaxed"
          >
            Cada componente, cada cámara acústica, cada milímetro &mdash; pensado para
            desaparecer del camino y dejarte solo con la música.
          </motion.p>
        </div>

        {/* Hero product shot */}
        <motion.div
          style={{ y: heroY }}
          className="relative mx-auto max-w-[1160px] aspect-[1344/768] rounded-[28px] overflow-hidden border border-white/[0.06] bg-ink-800 shadow-[0_48px_160px_rgba(0,0,0,0.36)]"
        >
          <div aria-hidden className="absolute inset-x-[18%] top-[16%] h-[28%] rounded-full bg-brand-blue/10 blur-[90px] z-10" />
          <Image
            src="/assets/cascos wh1000 mejora visual.png"
            alt="Sony WH-1000XM6 product shot"
            fill
            sizes="(max-width: 1100px) 100vw, 1100px"
            className="object-cover object-center scale-[1.04]"
            priority={false}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 50% at 50% 50%, rgba(0,0,0,0) 34%, rgba(5,5,5,0.62) 100%), linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0) 20%, rgba(5,5,5,0.4) 100%)',
            }}
          />
          <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-4 z-20">
            <div className="glass-panel rounded-full px-4 py-2 text-[10px] tracking-[0.28em] uppercase text-white/55">
              Product Portrait &middot; XM6
            </div>
            <div className="hidden sm:flex glass-panel rounded-full px-4 py-2 text-[10px] tracking-[0.28em] uppercase text-white/45">
              Graphite Black
            </div>
          </div>
          <div className="absolute bottom-5 left-5 right-5 z-20 grid grid-cols-1 gap-3 md:grid-cols-[1.2fr_auto] md:items-end">
            <div className="glass-panel rounded-2xl px-5 py-4 md:max-w-[430px] text-left">
              <p className="text-[10px] tracking-[0.28em] uppercase text-brand-cyan/80">Firma sonora</p>
              <p className="mt-2 text-white/88 text-lg md:text-[1.4rem] tracking-tight font-medium">
                Una silueta limpia, precisa y reconocible incluso antes de pulsar play.
              </p>
            </div>
            <div className="hidden md:flex items-center justify-end gap-3 text-[10.5px] tracking-[0.28em] uppercase text-white/45">
              <span>Cancelación adaptativa</span>
              <span className="h-1 w-1 rounded-full bg-white/28" />
              <span>Audio premium</span>
            </div>
          </div>
        </motion.div>

        {/* Two-column grid: copy + exploded */}
        <div className="mt-14 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="glass-panel rounded-[28px] p-6 md:p-8">
            <p className="text-[11px] tracking-[0.3em] uppercase text-brand-cyan/80 mb-4">
              Anatomía
            </p>
            <h3 className="text-gradient font-display font-bold tracking-tighter text-2xl sm:text-3xl md:text-5xl leading-[1]">
              Cada pieza,<br /> con un propósito.
            </h3>
            <p className="mt-5 text-white/60 text-[15px] md:text-[16px] leading-relaxed">
              Driver dinámico de 30 mm, procesador integrado QN3 con array de 12
              micrófonos, almohadillas con espuma de baja resistencia y banda de
              titanio con poliuretano flexible.
            </p>
            <ul className="mt-6 space-y-3 text-[14px] text-white/55">
              {[
                'Diafragma compuesto de fibra de carbono',
                'Cámara acústica sellada con resonadores',
                'Bobina de cobre laminada de alta sensibilidad',
                'Cuerpo en aluminio anodizado matte',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-[5px] w-[5px] rounded-full bg-brand-cyan/80 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-4">
                <p className="text-gradient font-display text-2xl font-bold tracking-tight">30 mm</p>
                <p className="mt-1 text-[10px] tracking-[0.24em] uppercase text-white/40">Driver dinámico</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-4">
                <p className="text-gradient font-display text-2xl font-bold tracking-tight">12</p>
                <p className="mt-1 text-[10px] tracking-[0.24em] uppercase text-white/40">Micrófonos ANC</p>
              </div>
            </div>
            </div>
          </motion.div>

          <motion.div
            style={{ scale: explodedScale, opacity: explodedOpacity }}
            className="lg:col-span-7 relative aspect-square rounded-[28px] overflow-hidden border border-white/[0.06] bg-ink-800 shadow-[0_48px_160px_rgba(0,0,0,0.32)]"
          >
            <Image
              src="/assets/sony-exploded.png"
              alt="Sony WH-1000XM6 exploded technical view"
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover"
              style={{ mixBlendMode: 'screen', filter: 'contrast(1.1) brightness(0.88)' }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(70% 70% at 50% 50%, rgba(0,80,255,0.14) 0%, rgba(0,0,0,0) 60%), linear-gradient(to bottom, rgba(255,255,255,0.03) 0%, rgba(5,5,5,0) 24%, rgba(5,5,5,0.88) 100%)',
              }}
            />
            <div className="absolute top-6 right-6 glass-panel rounded-full px-4 py-2 text-[10px] tracking-[0.28em] uppercase text-white/48">
              Despiece técnico
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
              <p className="text-[10.5px] tracking-[0.28em] uppercase text-white/55">
                Diagrama Técnico &middot; XM6
              </p>
              <p className="text-[10.5px] tracking-[0.28em] uppercase text-white/35">
                001 / 001
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
