'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Cursor sutil estilo editorial.
 * Un punto pequeño que sigue el cursor, y un anillo más grande con lerp.
 * Crece sobre elementos interactivos.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Deshabilitar en touch / móvil
    if (typeof window === 'undefined') return;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) return;
    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let raf = 0;
    let isHover = false;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x - 3}px, ${target.y - 3}px, 0)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest('a, button, [data-cursor="hover"], input, textarea');
      const newHover = !!interactive;
      if (newHover !== isHover) {
        isHover = newHover;
        if (ringRef.current) {
          ringRef.current.classList.toggle('cursor-ring--hover', isHover);
        }
      }
    };

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x - 18}px, ${ring.y - 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border border-white/30 mix-blend-difference transition-[width,height,border-color,background] duration-300"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
