'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'Three.js',
  'Tailwind',
  'Framer Motion',
  'Node.js',
  'Postgres',
  'Docker',
];

const HIGHLIGHTS = [
  { kpi: 'CEO', label: 'Cabletea S.L. · Telco' },
  { kpi: '5+', label: 'años full-stack' },
  { kpi: '<48h', label: 'tiempo de respuesta' },
  { kpi: '∞', label: 'curiosidad' },
];

export default function Crafted() {
  return (
    <section
      id="crafted"
      className="relative bg-ink-900 py-28 md:py-40 overflow-hidden"
    >
      {/* Ambient halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            'radial-gradient(45% 35% at 70% 30%, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0) 70%), radial-gradient(35% 35% at 20% 70%, rgba(255,255,255,0.015) 0%, rgba(0,0,0,0) 70%)',
        }}
      />
      <div className="section-divider absolute top-0 inset-x-0" />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden border border-white/[0.08] bg-ink-800 shadow-[0_36px_120px_rgba(0,0,0,0.25)]">
              <Image
                src="/assets/andres.jpeg"
                alt="Andrés Lorente Martínez"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
                style={{ filter: 'contrast(1.05) saturate(0.95)' }}
              />
              {/* gradient mask */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(5,5,5,0) 40%, rgba(5,5,5,0.55) 85%, rgba(5,5,5,0.95) 100%)',
                }}
              />
              {/* gradient ring overlay */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  boxShadow:
                    'inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 -120px 80px -40px rgba(0,0,0,0.5)',
                }}
              />
              <div className="absolute top-5 right-5 glass-panel rounded-full px-4 py-2 text-[10px] tracking-[0.28em] uppercase text-white/48">
                Diseño &middot; Código &middot; Narrativa
              </div>
              {/* signature bottom-left */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="text-[10.5px] tracking-[0.28em] uppercase text-white/45 mb-1">
                    Creado por
                  </p>
                  <p className="text-white/95 text-[18px] font-semibold tracking-tight">
                    Andrés Lorente Martínez
                  </p>
                </div>
                <a
                  href="https://andreslorentemartinez.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10.5px] tracking-[0.22em] uppercase text-white/50 hover:text-white transition-colors"
                >
                  Portfolio &rarr;
                </a>
              </div>
            </div>
          </motion.div>

          {/* Copy column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex mb-5"
            >
              <span className="chapter-mark">Capítulo IX · Autoría</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-gradient font-display font-bold tracking-tighter text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.92]"
            >
              De la fibra óptica<br /> al píxel perfecto.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 glass-panel hover-glow rounded-[28px] px-6 py-5 md:px-7 md:py-6 max-w-2xl transition-transform duration-500 hover:-translate-y-1"
            >
              <p className="text-[10.5px] tracking-[0.28em] uppercase text-white/38">
                Obsesión por el detalle
              </p>
              <p className="mt-3 text-white/78 text-[16px] md:text-[18px] leading-relaxed tracking-tight">
                No busco webs correctas. Busco experiencias que entren por los ojos,
                transmitan producto y se sientan inevitables al usarlas.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 text-white/70 text-[16px] md:text-[17.5px] leading-relaxed max-w-xl">
              Soy <span className="text-white font-medium">Andrés</span> &mdash; tengo 24 años, soy de Baza (Granada) y me apasiona
              construir cosas que se vean increíbles y funcionen aún mejor. Fundé
              <span className="text-white font-medium"> Cabletea S.L.</span>, una operadora de
              telecomunicaciones real, mientras seguía programando cada día.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-white/55 text-[15px] md:text-[16px] leading-relaxed max-w-xl"
            >
              Lo que me mueve es la obsesión por el detalle: la animación que fluye perfecta,
              la interfaz que responde al instante, el código que no deja ni un frame suelto.
              Esta web la monté desde cero &mdash; 145 frames sincronizados al scroll en un
              canvas a 60fps. Porque si algo merece hacerse, merece hacerse bien.
            </motion.p>

            {/* KPIs */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] rounded-xl overflow-hidden border border-white/[0.06] max-w-xl">
              {HIGHLIGHTS.map((h) => (
                <div key={h.kpi} className="bg-ink-800/95 p-5 transition-colors duration-500 hover:bg-ink-800">
                  <p className="text-gradient font-display font-bold text-2xl md:text-3xl tracking-tight transition-transform duration-500 hover:scale-[1.04] origin-left">
                    {h.kpi}
                  </p>
                  <p className="mt-1 text-[11px] tracking-[0.18em] uppercase text-white/45">
                    {h.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Stack chips */}
            <div className="mt-10">
              <p className="text-[10.5px] tracking-[0.28em] uppercase text-white/40 mb-4">
                Mi Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {STACK.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center h-8 px-3.5 rounded-full text-[12px] tracking-tight font-medium text-white/75 border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 md:gap-4">
              <a
                href="https://andreslorentemartinez.dev"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <span>Ver mi portfolio</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-70"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a
                href="https://github.com/Andresmartineez6"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                  <path d="M8 .2a8 8 0 0 0-2.5 15.6c.4.1.55-.18.55-.4l-.01-1.4c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.81.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.6 7.6 0 0 1 8 4.4c.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .22.15.5.55.4A8 8 0 0 0 8 .2Z"/>
                </svg>
                GitHub
              </a>
              <a
                href="mailto:andres.martinez@impulsatelecom.com"
                className="btn-ghost"
              >
                <span className="btn-ghost-line" />
                <span className="truncate">andres.martinez@impulsatelecom.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
