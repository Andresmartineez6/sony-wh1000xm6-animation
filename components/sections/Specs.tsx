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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(40% 30% at 18% 20%, rgba(255, 255, 255, 0.02) 0%, rgba(0,0,0,0) 70%), radial-gradient(32% 26% at 80% 74%, rgba(255, 255, 255, 0.01) 0%, rgba(0,0,0,0) 70%)',
        }}
      />
      <div className="section-divider absolute top-0 inset-x-0" />

      <div className="mx-auto max-w-[1280px] px-5 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[11px] tracking-[0.3em] uppercase text-white/40 mb-3"
            >
              Especificaciones
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-gradient font-display font-bold tracking-tighter text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.92]"
            >
              Cada detalle,<br /> deliberado.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-white/55 max-w-md text-[15px] leading-relaxed"
          >
            Una plataforma completa rediseñada para rendimiento flagship &mdash; desde el procesador integrado hasta la geometría de la diadema.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-panel rounded-[28px] p-5 md:p-6 mb-8 md:mb-10"
        >
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[10.5px] tracking-[0.26em] uppercase text-white/42">
            {['Hi‑Res Audio Wireless', 'Adaptive ANC', 'LDAC', 'LE Audio', 'Speak‑to‑Chat', 'Auracast Ready'].map((item) => (
              <span key={item} className="whitespace-nowrap">{item}</span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {SPECS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className="bg-ink-800/90 p-8 md:p-10 hover:bg-ink-800 transition-colors duration-500"
            >
              <p className="text-[10.5px] tracking-[0.3em] uppercase text-white/40 mb-4">{s.label}</p>
              <p className="text-gradient font-display font-bold text-4xl md:text-5xl tracking-tight">{s.value}</p>
              <p className="mt-4 text-white/55 text-[14px] leading-relaxed">{s.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 overflow-hidden glass-panel rounded-[28px] py-5 md:py-6"
        >
          <div className="hairline mb-5" />
          <div className="overflow-hidden relative">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-ink-800 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-ink-800 to-transparent" />
            <div className="animate-marquee flex whitespace-nowrap gap-x-10">
              {[...Array(2)].map((_, r) => (
                <div key={r} className="flex gap-x-10 shrink-0">
                  {['Hi\u2011Res Audio Wireless','LDAC','LE Audio','DSEE Extreme','360 Reality Audio','Multipoint','Speak\u2011to\u2011Chat','Auracast Ready','Bluetooth 5.3','USB\u2011C','NFC'].map((t) => (
                    <span key={`${r}-${t}`} className="text-[11.5px] tracking-[0.24em] uppercase text-white/35 whitespace-nowrap">
                      {t}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="hairline mt-5" />
        </motion.div>
      </div>
    </section>
  );
}
