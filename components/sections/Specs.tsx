'use client';

import { motion } from 'framer-motion';

const SPECS = [
  { label: 'Driver', value: '30 mm', detail: 'Nuevo driver dinámico con cúpula de composite de fibra de carbono.' },
  { label: 'Cancelación', value: 'QN3', detail: 'Procesador integrado con array de 12 micrófonos beam\u2011forming.' },
  { label: 'Batería', value: '40 h', detail: 'Hasta 40h sin ANC · 30h con ANC · 3 min de carga = 3 h.' },
  { label: 'Códecs', value: 'LDAC · LC3', detail: 'Hi\u2011Res Audio Wireless · LE Audio · Upscaling DSEE Extreme con IA.' },
  { label: 'Peso', value: '253 g', detail: 'Presión de diadema refinada para comodidad todo el día.' },
  { label: 'Conectividad', value: 'BT 5.3', detail: 'Multipoint con dos dispositivos · Auracast ready.' },
];

export default function Specs() {
  return (
    <section id="specs" className="relative bg-ink-900 py-28 md:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-[1280px] px-5 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-brand-cyan/80 mb-3">Especificaciones</p>
            <h2 className="text-gradient font-display font-bold tracking-tighter text-3xl sm:text-4xl md:text-6xl leading-[1]">
              Cada detalle,<br /> deliberado.
            </h2>
          </div>
          <p className="text-white/55 max-w-md text-[15px] leading-relaxed">
            Una plataforma completa rediseñada para rendimiento flagship &mdash; desde el procesador integrado hasta la geometría de la diadema.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {SPECS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className="bg-ink-800 p-8 md:p-10"
            >
              <p className="text-[10.5px] tracking-[0.3em] uppercase text-white/40 mb-4">{s.label}</p>
              <p className="text-gradient font-display font-bold text-4xl md:text-5xl tracking-tight">{s.value}</p>
              <p className="mt-4 text-white/55 text-[14px] leading-relaxed">{s.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 overflow-hidden">
          <div className="hairline mb-6" />
          <div className="flex flex-wrap gap-x-10 gap-y-3 text-[12px] tracking-[0.22em] uppercase text-white/40">
            {['Hi\u2011Res Audio Wireless','LDAC','LE Audio','DSEE Extreme','360 Reality Audio','Multipoint','Speak\u2011to\u2011Chat','Auracast ready'].map((t) => (
              <span key={t} className="whitespace-nowrap">&middot; {t}</span>
            ))}
          </div>
          <div className="hairline mt-6" />
        </div>
      </div>
    </section>
  );
}
