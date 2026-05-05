'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Wrapper de parallax 3D con tilt sutil siguiendo el cursor.
 * Max rotation: 2° para no ser invasivo. Responde solo en hover (desktop).
 */
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 2,
  scale = 1.01,
  perspective = 1200,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * maxTilt * 2;
    const rotateY = (x - 0.5) * maxTilt * 2;
    setTransform({ rotateX, rotateY, scale });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: transform.rotateX,
        rotateY: transform.rotateY,
        scale: transform.scale,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      style={{ perspective }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
