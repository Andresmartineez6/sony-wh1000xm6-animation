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
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="mx-auto max-w-[1320px] px-5 md:px-6">
        {/* Section eyebrow */}
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-brand-cyan/80 mb-4">
            Producto
          </p>
          <h2 className="text-gradient font-display font-bold tracking-tighter text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-[0.98]">
            Dentro del silencio.
          </h2>
          <p className="mt-5 mx-auto max-w-xl text-white/55 text-[15px] md:text-[17px] leading-relaxed">
            Cada componente, cada cámara acústica, cada milímetro &mdash; pensado para
            desaparecer del camino y dejarte solo con la música.
          </p>
        </div>

        {/* Hero product shot */}
        <motion.div
          style={{ y: heroY }}
          className="relative mx-auto max-w-[1100px] aspect-[1344/768] rounded-2xl overflow-hidden"
        >
          <Image
            src="/assets/sony-product-hero.png"
            alt="Sony WH-1000XM6 product shot"
            fill
            sizes="(max-width: 1100px) 100vw, 1100px"
            className="object-cover"
            priority={false}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 50% at 50% 50%, rgba(0,0,0,0) 40%, rgba(5,5,5,0.6) 100%)',
            }}
          />
        </motion.div>

        {/* Two-column grid: copy + exploded */}
        <div className="mt-14 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
          <div className="lg:col-span-5">
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
          </div>

          <motion.div
            style={{ scale: explodedScale, opacity: explodedOpacity }}
            className="lg:col-span-7 relative aspect-square rounded-3xl overflow-hidden border border-white/[0.06] bg-ink-800"
          >
            <Image
              src="/assets/sony-exploded.png"
              alt="Sony WH-1000XM6 exploded technical view"
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover"
              style={{ mixBlendMode: 'screen', filter: 'contrast(1.08) brightness(0.85)' }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(70% 70% at 50% 50%, rgba(0,80,255,0.12) 0%, rgba(0,0,0,0) 60%), linear-gradient(to bottom, rgba(5,5,5,0) 60%, rgba(5,5,5,0.85) 100%)',
              }}
            />
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
