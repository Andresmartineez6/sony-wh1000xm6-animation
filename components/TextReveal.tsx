'use client';

import { motion } from 'framer-motion';

/**
 * Componente de reveal por palabras.
 * Cada palabra sube con un delay en cascada para efecto editorial premium.
 * Uso: <TextReveal text="Silencio de referencia." className="..." tag="h2" />
 */
interface TextRevealProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export default function TextReveal({
  text,
  className = '',
  tag = 'h2',
  delay = 0,
  stagger = 0.04,
  once = true,
}: TextRevealProps) {
  const words = text.split(' ');
  const Tag = tag as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`${className} overflow-hidden`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em]">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once, margin: '-10% 0px' }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
