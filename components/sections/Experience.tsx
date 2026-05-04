'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const SCENES = [
  {
    title: 'En el aire',
    desc: 'Cancelación adaptativa que convierte un vuelo transatlántico en tu estudio privado.',
    imageSrc: '/frames/frame_060.webp',
    imageClass: 'object-cover object-center scale-[1.02]',
    tag: 'Flight Focus',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z" />
      </svg>
    ),
  },
  {
    title: 'Concentración total',
    desc: 'Oficina, biblioteca o casa — tu burbuja de silencio te sigue a todas partes.',
    imageSrc: '/assets/sony-product.jpg',
    imageClass: 'object-cover object-center scale-[1.16]',
    tag: 'Deep Focus',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    ),
  },
  {
    title: 'Inmersión nocturna',
    desc: 'LDAC + DSEE Extreme con IA. Cada nota, cada textura — como en el estudio de grabación.',
    imageSrc: '/frames/frame_130.webp',
    imageClass: 'object-cover object-center scale-[1.04]',
    tag: 'Night Session',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    ),
  },
];

export default function Experience() {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(45% 35% at 20% 30%, rgba(0, 80, 255, 0.08) 0%, rgba(0,0,0,0) 65%), radial-gradient(40% 35% at 75% 70%, rgba(0, 214, 255, 0.05) 0%, rgba(0,0,0,0) 60%)',
        }}
      />
      <div className="section-divider absolute top-0 inset-x-0" />

      <div className="relative mx-auto max-w-[1320px] px-5 md:px-6">
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.3em] uppercase text-brand-cyan/80 mb-4"
          >
            Experiencia
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-gradient font-display font-bold tracking-tighter text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.92]"
          >
            Diseñados para<br />tu mundo real.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 mx-auto max-w-xl text-white/46 text-[15px] md:text-[17px] leading-relaxed"
          >
            No importa dónde estés. WH-1000XM6 se adapta a ti, no al revés.
          </motion.p>
        </div>

        {/* Scene cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {SCENES.map((scene, i) => (
            <motion.div
              key={scene.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
              className="group relative glass-card hover-glow rounded-[24px] p-7 md:p-8 hover:border-white/12 hover:-translate-y-1 transition-all duration-500"
            >
              {/* Ambient hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'radial-gradient(50% 50% at 50% 40%, rgba(0,80,255,0.06) 0%, rgba(0,0,0,0) 70%)',
                }}
              />

              {/* Image placeholder */}
              <div className="relative aspect-[16/10] rounded-[16px] overflow-hidden mb-6 bg-ink-800 border border-white/[0.04] transition-transform duration-500 group-hover:scale-[1.02]">
                <Image
                  src={scene.imageSrc}
                  alt={scene.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={scene.imageClass}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.1)_45%,rgba(0,0,0,0.58)_100%)]" />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(50% 50% at 50% 50%, rgba(0,${60 + i * 40},${180 + i * 30},0.08) 0%, rgba(0,0,0,0) 70%)`,
                  }}
                />
                <div className="absolute top-3 left-3 glass-panel rounded-full px-3 py-1.5 text-[9px] tracking-[0.26em] uppercase text-white/42">
                  0{i + 1}
                </div>
                <div className="absolute bottom-3 left-3 glass-panel rounded-full px-3 py-1.5 text-[9px] tracking-[0.22em] uppercase text-white/42">
                  {scene.tag}
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 transition-transform duration-500 group-hover:scale-110">
                    {scene.icon}
                  </div>
                  <h3 className="text-white/90 text-[18px] md:text-[20px] font-semibold tracking-tight">
                    {scene.title}
                  </h3>
                </div>
                <p className="text-white/44 text-[14px] md:text-[15px] leading-relaxed">
                  {scene.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-4 text-center text-[11px] tracking-[0.2em] uppercase text-white/24">
          Escenarios de uso y foco diario
        </p>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 md:mt-20"
        >
          <div className="glass-panel hover-glow rounded-[30px] p-4 md:p-5 transition-transform duration-500 hover:-translate-y-1">
            <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr] md:items-stretch">
              <div className="relative min-h-[220px] sm:min-h-[260px] overflow-hidden rounded-[24px] border border-white/[0.06] bg-ink-900">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/assets/cascos wh1000 mejora visual.png"
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.82]"
                >
                  <source src="/assets/Introducing%20the%20Sony%20WH-1000XM6%20Wireless%20Noise%20Cancelling%20Headphones.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.18)_48%,rgba(0,0,0,0.74)_100%)]" />
                <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
                  <span className="glass-panel rounded-full px-3 py-1.5 text-[9px] tracking-[0.24em] uppercase text-white/44">
                    Film Preview
                  </span>
                  <span className="glass-panel rounded-full px-3 py-1.5 text-[9px] tracking-[0.24em] uppercase text-white/38">
                    XM6
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-brand-cyan/80">Movimiento y presencia</p>
                  <p className="mt-2 max-w-[24rem] text-white/86 text-[18px] md:text-[22px] font-medium tracking-tight leading-snug">
                    Una pieza pensada para verse premium incluso detenida en un frame.
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center px-2 py-2 md:px-4">
                <p className="text-[10px] tracking-[0.28em] uppercase text-white/36 mb-4">
                  Tu próximo paso
                </p>
                <p className="text-gradient font-display font-bold tracking-tighter text-3xl md:text-5xl leading-[0.95]">
                  ¿Listo para el silencio?
                </p>
                <p className="mt-4 text-white/50 text-[14px] sm:text-[15px] md:text-[16px] max-w-md leading-relaxed">
                  Descubre el bloque técnico completo, revisa la narrativa visual y entiende por qué este rediseño está pensado para sentirse premium de verdad.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 max-w-md">
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4">
                    <p className="text-gradient font-display text-2xl font-bold tracking-tight">145</p>
                    <p className="mt-1 text-[9px] tracking-[0.22em] uppercase text-white/34">Frames al scroll</p>
                  </div>
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4">
                    <p className="text-gradient font-display text-2xl font-bold tracking-tight">Next 14</p>
                    <p className="mt-1 text-[9px] tracking-[0.22em] uppercase text-white/34">Base del proyecto</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <a href="#specs" className="btn-primary">
                    <span>Ver especificaciones</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-70"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  <a href="#crafted" className="btn-ghost">
                    <span className="btn-ghost-line" />
                    Conocer al creador
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
