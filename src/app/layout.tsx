import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

import { Logo } from '@/components/Logo';
import { ThemeProvider } from '@/components/ThemeProvider';
import { HarmonicLoom } from '@/components/HarmonicLoom';
import { Navbar } from '@/components/Navbar'; // <-- Imported

export const metadata: Metadata = {
  title: 'Nalin',
  description: 'Portfolio and blog of an AI engineer exploring modern web technologies.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-screen bg-[#fafafa] text-[#1a1a1a] dark:bg-[#0f0f0f] dark:text-[#f5f5f5] antialiased transition-colors duration-500 overflow-x-hidden">
        <ThemeProvider>
          <HarmonicLoom />

          <div className="relative z-10 w-full px-3 sm:px-4 lg:px-6 py-3 sm:py-6 max-w-7xl mx-auto">
            <header className="flex h-12 sm:h-14 items-center justify-between gap-2 border-gray-200 dark:border-gray-700 transition-colors duration-500">
              <Link href="/" aria-label="Home" className="flex shrink-0 items-center text-gray-900 dark:text-gray-100">
                <Logo />
              </Link>

              {/* Look how tidy this is now */}
              <Navbar /> 
            </header>

            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}