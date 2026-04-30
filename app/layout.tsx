import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Sony WH\u20111000XM6 \u00b7 Silencio, perfeccionado.',
  description:
    'Cancelación de ruido inalámbrica flagship, rediseñada para un mundo que no se detiene. Descubre los WH\u20111000XM6 en una experiencia cinematográfica.',
  openGraph: {
    title: 'Sony WH\u20111000XM6 \u00b7 Silencio, perfeccionado.',
    description: 'Cancelación de ruido inalámbrica flagship, rediseñada para un mundo que no se detiene.',
    type: 'website',
  },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased grain selection:bg-brand-cyan/30">{children}</body>
    </html>
  );
}
