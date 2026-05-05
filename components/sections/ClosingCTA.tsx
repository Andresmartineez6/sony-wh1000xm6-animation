'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import TextReveal from '@/components/TextReveal';

/**
 * CTA final cinematográfico.
 * Gran cierre visual con producto flotando en negro + statement editorial potente.
 */
export default function ClosingCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imgScale = useTransform(scrollYProgress, [0.1, 0.5], [0.92, 1.02]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.55, 0.85], [0, 0.6, 0]);

  return (
    <section
      ref={ref}
      className="relative bg-black py-32 md:py-44 overflow-hidden"
    >
      {/* Ambient glow behind product */}
      <motion.div
        style={{ opacity: glowOpacity }}
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px]"
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.01)_40%,transparent_70%)]" />
      </motion.div>

      <div className="relative mx-auto max-w-[1100px] px-6 md:px-8">
        {/* Product floating */}
        <motion.div
          style={{ y: imgY, scale: imgScale }}
          className="relative mx-auto w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] mb-12 md:mb-16"
        >
          <Image
            src="/assets/cascos wh 1000 mejora visual sin fondo.png"
            alt="Sony WH-1000XM6"
            fill
            sizes="400px"
            className="object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

        {/* Editorial text block */}
        <div className="text-center">
          <TextReveal
            text="El sonido definitivo."
            tag="h2"
            className="font-display font-bold tracking-tightest text-white leading-[0.9] text-[11vw] sm:text-[8vw] md:text-[6.5vw] lg:text-[5.5rem]"
            delay={0}
            stagger={0.06}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 md:mt-8 mx-auto max-w-[32rem] text-white/50 text-[15px] md:text-[17px] leading-relaxed"
          >
            No hay vuelta atrás. Una vez lo experimentas, todo lo demás es ruido.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#specs" className="btn-primary">
              Especificaciones completas
            </a>
            <a
              href="https://www.sony.es/headphones/products/wh-1000xm6"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Comprar en Sony.es
            </a>
          </motion.div>

          {/* Minimal closing statement */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-16 text-[10px] tracking-[0.45em] uppercase text-white/22"
          >
            Sony · WH-1000XM6 · Wireless Noise Cancelling
          </motion.p>
        </div>
      </div>
    </section>
  );
}
