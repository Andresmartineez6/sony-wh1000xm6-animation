'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-ink-900 overflow-hidden">
      <div className="section-divider absolute top-0 inset-x-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(40% 30% at 15% 25%, rgba(0, 80, 255, 0.08) 0%, rgba(0,0,0,0) 70%), radial-gradient(36% 28% at 80% 70%, rgba(0, 214, 255, 0.05) 0%, rgba(0,0,0,0) 70%)',
        }}
      />
      <div className="mx-auto max-w-[1280px] px-5 md:px-6 py-16 md:py-24">
        {/* Closing hero panel */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel rounded-[32px] px-7 py-8 md:px-10 md:py-10 mb-14 md:mb-18"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10.5px] tracking-[0.28em] uppercase text-brand-cyan/80 mb-4">
                Cierre de experiencia
              </p>
              <h2 className="text-gradient font-display font-bold tracking-tighter text-3xl md:text-5xl lg:text-[4.2rem] leading-[0.92]">
                Tecnología que se siente<br /> antes de escucharse.
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-4">
              <p className="max-w-md text-white/50 text-[14px] leading-relaxed md:text-right">
                Un concepto visual construido para transmitir silencio, precisión y producto con una estética más cercana al cine que a una ficha comercial.
              </p>
              <a href="#top" className="btn-primary !h-10 !text-[12.5px]">
                <span>Volver arriba</span>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="opacity-60 rotate-[-90deg]"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/sony-logo-white.png"
                alt="Sony"
                width={120}
                height={20}
                className="h-5 md:h-6 w-auto opacity-85"
              />
              <span className="h-4 w-px bg-white/12" />
              <p className="text-[11.5px] tracking-[0.2em] font-semibold text-white/80">
                WH&#8209;1000XM6
              </p>
            </div>
            <p className="mt-5 text-white/48 text-[14px] leading-relaxed max-w-md">
              Cancelación de ruido inalámbrica flagship, rediseñada para un mundo que no
              se detiene. Descubre la nueva generación del silencio.
            </p>
            <p className="mt-5 text-[10.5px] tracking-[0.2em] uppercase text-white/28">
              Demostración conceptual &middot; sin afiliación con Sony Group Corporation
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-[10.5px] tracking-[0.26em] uppercase text-white/36 mb-4">
              Producto
            </p>
            <ul className="space-y-2.5 text-[13.5px] font-medium text-white/60">
              <li><a href="#overview" className="hover:text-white transition-colors duration-300">Inicio</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors duration-300">Tecnología</a></li>
              <li><a href="#showcase" className="hover:text-white transition-colors duration-300">Producto</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors duration-300">Especificaciones</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-[10.5px] tracking-[0.26em] uppercase text-white/36 mb-4">
              Enlaces
            </p>
            <ul className="space-y-2.5 text-[13.5px] font-medium text-white/60">
              <li><a href="#crafted" className="hover:text-white transition-colors duration-300">Sobre mí</a></li>
              <li><a href="https://andreslorentemartinez.dev" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-300">Portfolio</a></li>
              <li><a href="https://github.com/Andresmartineez6" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-300">GitHub</a></li>
              <li><a href="mailto:andres.martinez@impulsatelecom.com" className="hover:text-white transition-colors duration-300">Contacto</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10.5px] tracking-[0.26em] uppercase text-white/36 mb-4">
              Hecho con
            </p>
            <ul className="space-y-2.5 text-[13.5px] text-white/48">
              <li>Next.js 14 &middot; TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
              <li>HTML5 Canvas &middot; 145 frames</li>
            </ul>
          </div>
        </div>

        <div className="section-divider my-12" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11.5px] text-white/32">
          <p>
            Diseñado y desarrollado por{' '}
            <a
              href="https://andreslorentemartinez.dev"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 font-medium hover:text-white transition-colors duration-300"
            >
              Andrés Lorente Martínez
            </a>
            {' '}&middot; Baza, Granada &middot; &copy; {new Date().getFullYear()}
          </p>
          <div className="flex gap-5 font-medium">
            <a href="https://github.com/Andresmartineez6" target="_blank" rel="noreferrer" className="hover:text-white/70 transition-colors duration-300">GitHub</a>
            <a href="https://instagram.com/Andresmartineez6" target="_blank" rel="noreferrer" className="hover:text-white/70 transition-colors duration-300">Instagram</a>
            <a href="https://twitter.com/andresmrtnz9" target="_blank" rel="noreferrer" className="hover:text-white/70 transition-colors duration-300">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
