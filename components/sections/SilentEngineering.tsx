'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const FEATURES = [
  {
    title: 'Cámaras acústicas selladas',
    desc: 'Geometría interna optimizada para aislar frecuencias bajas y eliminar resonancias no deseadas.',
    stat: '−30 dB',
    statLabel: 'Reducción activa',
  },
  {
    title: 'Array de 12 micrófonos',
    desc: 'Beam-forming direccional que mapea el ruido ambiente en tiempo real y genera anti-fase precisa.',
    stat: '360°',
    statLabel: 'Captación espacial',
  },
  {
    title: 'Procesador QN3',
    desc: 'Chip dedicado con IA integrada que analiza 700 señales por segundo para cancelación adaptativa.',
    stat: '700',
    statLabel: 'Señales / segundo',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.12 },
  }),
};

const MACRO_SLOTS = [
  { label: 'Almohadilla', sub: 'Espuma adaptativa', imageSrc: '/assets/almoadilla wh 10000.png', imageClass: 'object-cover object-center scale-[1.06]' },
  { label: 'Articulación', sub: 'Titanio con acabado pulido', imageSrc: '/assets/enganche cascos wh 1000.png', imageClass: 'object-cover object-center scale-[1.04]' },
  { label: 'Silueta', sub: 'Diadema y copa en equilibrio', imageSrc: '/assets/cascos wh 1000 mejora visual sin fondo.png', imageClass: 'object-cover object-center scale-[1.02]' },
  { label: 'Puerto', sub: 'USB-C · Carga rápida', imageSrc: '/assets/cascos wh 1000 conector usb 3.0.png', imageClass: 'object-cover object-center scale-[1.05]' },
];

export default function SilentEngineering() {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 40% at 50% 20%, rgba(0, 60, 200, 0.12) 0%, rgba(0,0,0,0) 65%), radial-gradient(40% 35% at 80% 80%, rgba(0, 214, 255, 0.06) 0%, rgba(0,0,0,0) 60%)',
        }}
      />
      <div className="section-divider absolute top-0 inset-x-0" />

      <div className="relative mx-auto max-w-[1320px] px-5 md:px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.3em] uppercase text-brand-cyan/80 mb-4"
          >
            Ingeniería del silencio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-gradient font-display font-bold tracking-tighter text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.92]"
          >
            El ruido no tiene<br />dónde esconderse.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 mx-auto max-w-2xl text-white/46 text-[15px] md:text-[17px] leading-relaxed"
          >
            Tres capas de tecnología trabajando en milisegundos para crear un espacio
            de silencio absoluto alrededor de tu música.
          </motion.p>
        </div>

        {/* Visual + ANC wave */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-[1100px] aspect-[21/9] rounded-[28px] overflow-hidden mb-16 md:mb-24"
        >
          {/* Abstract ANC visualization — pure CSS */}
          <div className="absolute inset-0 bg-ink-900">
            {/* Wave lines */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0"
                style={{
                  top: `${22 + i * 14}%`,
                  height: '1px',
                  background: `linear-gradient(90deg, transparent 0%, rgba(0,80,255,${0.06 + i * 0.03}) 20%, rgba(0,214,255,${0.08 + i * 0.02}) 50%, rgba(0,80,255,${0.06 + i * 0.03}) 80%, transparent 100%)`,
                  opacity: 0.6 + i * 0.08,
                  transform: `scaleY(${1 + i * 0.3})`,
                  filter: `blur(${i * 0.5}px)`,
                }}
              />
            ))}
            {/* Center silence zone */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(30% 50% at 50% 50%, rgba(3,3,3,0.95) 0%, rgba(3,3,3,0) 100%)',
              }}
            />
            {/* Center glow */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[320px] md:h-[320px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0,80,255,0.12) 0%, rgba(0,214,255,0.04) 40%, rgba(0,0,0,0) 70%)',
              }}
            />
          </div>
          {/* Labels */}
          <div className="absolute top-5 left-5 glass-panel rounded-full px-4 py-2 text-[10px] tracking-[0.28em] uppercase text-white/48">
            ANC &middot; Visualización
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-[28px] md:text-[42px] font-display font-bold text-gradient tracking-tighter">
              −30 dB
            </p>
            <p className="text-[10px] tracking-[0.28em] uppercase text-white/38 mt-1">
              Reducción de ruido ambiental
            </p>
          </div>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              variants={fadeUp}
              className="glass-card hover-glow rounded-[24px] p-7 md:p-8 group hover:border-white/12 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="flex items-baseline justify-between mb-5">
                <span className="text-[10px] tracking-[0.28em] uppercase text-white/32">
                  0{i + 1}
                </span>
                <div className="text-right">
                  <p className="text-gradient font-display text-2xl md:text-3xl font-bold tracking-tight transition-transform duration-500 group-hover:scale-[1.04] origin-right">
                    {f.stat}
                  </p>
                  <p className="text-[9px] tracking-[0.22em] uppercase text-white/32 mt-0.5">
                    {f.statLabel}
                  </p>
                </div>
              </div>
              <h3 className="text-white/90 text-[18px] md:text-[20px] font-semibold tracking-tight leading-snug">
                {f.title}
              </h3>
              <p className="mt-3 text-white/44 text-[14px] leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Macro material slots — placeholders for user-generated images */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {MACRO_SLOTS.map((slot) => (
            <motion.div
              key={slot.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card hover-glow rounded-[20px] aspect-square flex flex-col items-center justify-center text-center p-5 group hover:border-white/12 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="relative w-full flex-1 rounded-[16px] overflow-hidden border border-white/[0.05] mb-4">
                <Image
                  src={slot.imageSrc}
                  alt={slot.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className={slot.imageClass}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.14)_45%,rgba(0,0,0,0.62)_100%)]" />
                <div className="absolute inset-x-3 top-3 flex justify-between items-start gap-2">
                  <span className="glass-panel rounded-full px-2.5 py-1 text-[8px] tracking-[0.22em] uppercase text-white/42">
                    Macro
                  </span>
                </div>
              </div>
              <p className="text-white/70 text-[14px] font-medium tracking-tight">{slot.label}</p>
              <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-white/30">{slot.sub}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-center text-[11px] tracking-[0.2em] uppercase text-white/24">
          Macros de materiales y detalle de construcción
        </p>
      </div>
    </section>
  );
}
