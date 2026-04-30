import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import ScrollScene from '@/components/ScrollScene';
import Showcase from '@/components/sections/Showcase';
import Specs from '@/components/sections/Specs';
import Crafted from '@/components/sections/Crafted';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-ink-900 text-white overflow-x-clip">
      <Navbar />
      <Hero />
      <ScrollScene />
      <Showcase />
      <Specs />
      <Crafted />
      <Footer />
    </main>
  );
}
