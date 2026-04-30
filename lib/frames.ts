/**
 * Frame-sequence configuration.
 *
 * Frames live in /public/frames/ as WebP extracted from the "Smoothly transition" MP4 at 24fps.
 * Pattern in use:  frame_001.webp .. frame_145.webp
 */
export const FRAME_COUNT = 145;
export const FRAME_EXT = 'webp' as const;
export const FRAME_PAD = 3;
export const FRAME_PREFIX = 'frame_';

export const framePath = (index1Based: number) =>
  `/frames/${FRAME_PREFIX}${String(index1Based).padStart(FRAME_PAD, '0')}.${FRAME_EXT}`;
