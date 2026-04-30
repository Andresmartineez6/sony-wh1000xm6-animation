'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-ink-900 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1280px] px-5 md:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/sony-logo-white.png"
                alt="Sony"
                width={100}
                height={18}
                className="h-5 w-auto opacity-90"
              />
              <span className="h-4 w-px bg-white/15" />
              <p className="text-[12px] tracking-[0.22em] font-semibold text-white/85">
                WH&#8209;1000XM6
              </p>
            </div>
            <p className="mt-5 text-white/55 text-[14.5px] leading-relaxed max-w-md">
              Cancelación de ruido inalámbrica flagship, rediseñada para un mundo que no
              se detiene. Descubre la nueva generación del silencio.
            </p>
            <p className="mt-5 text-[11.5px] tracking-[0.22em] uppercase text-white/35">
              Demostración conceptual &middot; sin afiliación con Sony Group Corporation
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-[11px] tracking-[0.28em] uppercase text-white/40 mb-4">
              Producto
            </p>
            <ul className="space-y-2 text-[14px] font-medium text-white/70">
              <li><a href="#overview" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">Tecnología</a></li>
              <li><a href="#showcase" className="hover:text-white transition-colors">Producto</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Especificaciones</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-[11px] tracking-[0.28em] uppercase text-white/40 mb-4">
              Enlaces
            </p>
            <ul className="space-y-2 text-[14px] font-medium text-white/70">
              <li><a href="#crafted" className="hover:text-white transition-colors">Sobre mí</a></li>
              <li><a href="https://andreslorentemartinez.dev" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="https://github.com/Andresmartineez6" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="mailto:andres.martinez@impulsatelecom.com" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] tracking-[0.28em] uppercase text-white/40 mb-4">
              Hecho con
            </p>
            <ul className="space-y-2 text-[14px] text-white/55">
              <li>Next.js 14 &middot; TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
              <li>HTML5 Canvas &middot; secuencia de frames</li>
            </ul>
          </div>
        </div>

        <div className="hairline my-12" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[12px] text-white/40">
          <p>
            Creado por{' '}
            <a
              href="https://andreslorentemartinez.dev"
              target="_blank"
              rel="noreferrer"
              className="text-white/80 font-medium hover:text-white transition-colors"
            >
              Andrés Lorente Martínez
            </a>
            {' '}&middot; &copy; {new Date().getFullYear()}
          </p>
          <div className="flex gap-6 font-medium">
            <a href="https://github.com/Andresmartineez6" target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors">GitHub</a>
            <a href="https://instagram.com/Andresmartineez6" target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors">Instagram</a>
            <a href="https://twitter.com/andresmrtnz9" target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
