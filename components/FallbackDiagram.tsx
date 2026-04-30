'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

export default function FallbackDiagram({ progress }: { progress: MotionValue<number> }) {
  const explode = useTransform(progress, [0, 0.15, 0.5, 0.85, 1], [0, 0.2, 1, 0.2, 0]);

  const cupLeftX = useTransform(explode, [0, 1], [0, -180]);
  const cupRightX = useTransform(explode, [0, 1], [0, 180]);
  const cupLeftRot = useTransform(explode, [0, 1], [0, -8]);
  const cupRightRot = useTransform(explode, [0, 1], [0, 8]);
  const headbandY = useTransform(explode, [0, 1], [0, -110]);
  const cushionLeftX = useTransform(explode, [0, 1], [0, -320]);
  const cushionRightX = useTransform(explode, [0, 1], [0, 320]);
  const driverLeftX = useTransform(explode, [0, 1], [0, -260]);
  const driverRightX = useTransform(explode, [0, 1], [0, 260]);
  const pcbY = useTransform(explode, [0, 1], [0, 150]);
  const micOpacity = useTransform(progress, [0.25, 0.4, 0.6, 0.75], [0, 1, 1, 0]);
  const labelOpacity = useTransform(explode, [0, 0.4, 1], [0, 0.8, 0.9]);
  const rootRot = useTransform(progress, [0, 0.5, 1], [-4, 0, 4]);

  return (
    <motion.svg
      viewBox="-600 -400 1200 800"
      className="w-[min(92vw,1100px)] h-[min(80vh,700px)]"
      style={{ rotate: rootRot }}
      aria-hidden
    >
      <defs>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,214,255,0.15)" />
          <stop offset="60%" stopColor="rgba(0,80,255,0.04)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <linearGradient id="metal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2a30" />
          <stop offset="100%" stopColor="#0c0c10" />
        </linearGradient>
        <linearGradient id="cushion" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1e" />
          <stop offset="100%" stopColor="#050506" />
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0050FF" />
          <stop offset="100%" stopColor="#00D6FF" />
        </linearGradient>
      </defs>

      <rect x="-600" y="-400" width="1200" height="800" fill="url(#halo)" />

      <motion.g style={{ y: headbandY }}>
        <path d="M -260 -150 C -200 -260, 200 -260, 260 -150" fill="none" stroke="url(#metal)" strokeWidth="28" strokeLinecap="round" />
        <path d="M -260 -150 C -200 -260, 200 -260, 260 -150" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeLinecap="round" />
      </motion.g>

      <motion.g style={{ x: cupLeftX, rotate: cupLeftRot }}>
        <circle cx="-260" cy="0" r="130" fill="url(#metal)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx="-260" cy="0" r="108" fill="#060608" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <circle cx="-260" cy="0" r="4" fill="url(#accent)" />
      </motion.g>
      <motion.g style={{ x: cushionLeftX }}>
        <ellipse cx="-260" cy="0" rx="112" ry="118" fill="url(#cushion)" stroke="rgba(255,255,255,0.06)" />
      </motion.g>
      <motion.g style={{ x: driverLeftX, opacity: micOpacity }}>
        <circle cx="-260" cy="0" r="58" fill="#0a0a0c" stroke="url(#accent)" strokeWidth="1" />
        <circle cx="-260" cy="0" r="38" fill="none" stroke="rgba(0,214,255,0.25)" strokeDasharray="2 4" />
        <circle cx="-260" cy="0" r="6" fill="url(#accent)" />
      </motion.g>

      <motion.g style={{ x: cupRightX, rotate: cupRightRot }}>
        <circle cx="260" cy="0" r="130" fill="url(#metal)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx="260" cy="0" r="108" fill="#060608" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <circle cx="260" cy="0" r="4" fill="url(#accent)" />
      </motion.g>
      <motion.g style={{ x: cushionRightX }}>
        <ellipse cx="260" cy="0" rx="112" ry="118" fill="url(#cushion)" stroke="rgba(255,255,255,0.06)" />
      </motion.g>
      <motion.g style={{ x: driverRightX, opacity: micOpacity }}>
        <circle cx="260" cy="0" r="58" fill="#0a0a0c" stroke="url(#accent)" strokeWidth="1" />
        <circle cx="260" cy="0" r="38" fill="none" stroke="rgba(0,214,255,0.25)" strokeDasharray="2 4" />
        <circle cx="260" cy="0" r="6" fill="url(#accent)" />
      </motion.g>

      <motion.g style={{ y: pcbY, opacity: micOpacity }}>
        <rect x="-80" y="110" width="160" height="70" rx="6" fill="#0a0a0c" stroke="rgba(255,255,255,0.08)" />
        <rect x="-60" y="130" width="120" height="30" rx="3" fill="none" stroke="url(#accent)" />
        <circle cx="-50" cy="145" r="2" fill="url(#accent)" />
        <circle cx="-30" cy="145" r="2" fill="url(#accent)" />
        <circle cx="-10" cy="145" r="2" fill="url(#accent)" />
      </motion.g>

      <motion.g style={{ opacity: labelOpacity }} fontFamily="Inter, sans-serif" fill="rgba(255,255,255,0.55)" fontSize="11">
        <g>
          <line x1="-380" y1="-40" x2="-320" y2="-40" stroke="rgba(255,255,255,0.3)" />
          <text x="-470" y="-36" textAnchor="end">Precision driver</text>
        </g>
        <g>
          <line x1="320" y1="-40" x2="380" y2="-40" stroke="rgba(255,255,255,0.3)" />
          <text x="470" y="-36">Beam-forming mics</text>
        </g>
        <g>
          <line x1="0" y1="90" x2="0" y2="140" stroke="rgba(255,255,255,0.3)" />
          <text x="0" y="210" textAnchor="middle">Integrated Processor V2</text>
        </g>
      </motion.g>
    </motion.svg>
  );
}
