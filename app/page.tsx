import Navbar from '@/components/Navbar';
import IntroOverlay from '@/components/IntroOverlay';
import Cursor from '@/components/Cursor';
import Hero from '@/components/sections/Hero';
import SilenceChapter from '@/components/sections/SilenceChapter';
import ScrollScene from '@/components/ScrollScene';
import ScrollVideo from '@/components/sections/ScrollVideo';
import Showcase from '@/components/sections/Showcase';
import SilentEngineering from '@/components/sections/SilentEngineering';
import Specs from '@/components/sections/Specs';
import Experience from '@/components/sections/Experience';
import Crafted from '@/components/sections/Crafted';
import ClosingCTA from '@/components/sections/ClosingCTA';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <Cursor />
      <main id="top" className="grain relative z-10 min-h-screen bg-black text-white overflow-x-clip">
        <Navbar />
        {/* I — Inicio */}
        <Hero />
        {/* II — Silencio */}
        <SilenceChapter />
        {/* III — Movimiento (video scroll-driven) */}
        <ScrollVideo />
        {/* IV — Ingeniería */}
        <ScrollScene />
        {/* V — Anatomía */}
        <Showcase />
        {/* VI — Materia */}
        <SilentEngineering />
        {/* VII — Especificaciones */}
        <Specs />
        {/* VIII — Experiencia */}
        <Experience />
        {/* CTA Final — Cierre cinematográfico */}
        <ClosingCTA />
        {/* IX — Sobre el creador */}
        <Crafted />
        <Footer />
      </main>
    </>
  );
}
