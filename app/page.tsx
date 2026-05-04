import Navbar from '@/components/Navbar';
import IntroOverlay from '@/components/IntroOverlay';
import Hero from '@/components/sections/Hero';
import ScrollScene from '@/components/ScrollScene';
import Showcase from '@/components/sections/Showcase';
import SilentEngineering from '@/components/sections/SilentEngineering';
import Specs from '@/components/sections/Specs';
import Experience from '@/components/sections/Experience';
import Crafted from '@/components/sections/Crafted';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <main id="top" className="grain relative z-10 min-h-screen bg-ink-900 text-white overflow-x-clip">
        <Navbar />
        <Hero />
        <ScrollScene />
        <Showcase />
        <SilentEngineering />
        <Specs />
        <Experience />
        <Crafted />
        <Footer />
      </main>
    </>
  );
}
