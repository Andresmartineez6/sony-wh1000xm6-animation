# Sony WH-1000XM6 - Cinematic Scrollytelling

Awwwards-level, Apple-style product page built with Next.js 14 + Tailwind + Framer Motion,
driven by a scroll-linked HTML5 Canvas image sequence.

## Dev

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Frames

Place 120 frames in `public/frames/` as `frame_0001.jpg` .. `frame_0120.jpg`.
Edit `lib/frames.ts` to change count/extension.

## Files

- `app/page.tsx` - composition
- `components/Navbar.tsx` - apple-style glass nav
- `components/sections/Hero.tsx` - cinematic intro
- `components/ScrollScene.tsx` - sticky 500vh canvas + 4 storytelling beats
- `components/FallbackDiagram.tsx` - animated SVG fallback
- `components/sections/Specs.tsx` - spec grid
- `components/sections/Footer.tsx` - footer
- `lib/frames.ts` - sequence config
