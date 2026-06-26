import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

import { Logo } from '@/components/Logo';
import { ThemeProvider } from '@/components/ThemeProvider';
import { HarmonicLoom } from '@/components/HarmonicLoom';
import { Navbar } from '@/components/Navbar';
import { RSS_FEED, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* RSS autodiscovery: feed readers look for this <link>. */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE.author} — RSS feed`}
          href={RSS_FEED}
        />
      </head>
      <body className="relative min-h-screen bg-[#fafafa] text-[#1a1a1a] dark:bg-[#0f0f0f] dark:text-[#f5f5f5] antialiased transition-colors duration-500 overflow-x-hidden">
        <ThemeProvider>
          <HarmonicLoom />

          <header className="relative z-10 flex w-full items-center justify-between gap-2 border-gray-200 px-3 py-3 dark:border-gray-700 sm:px-4 sm:py-6 lg:px-6 transition-colors duration-500">
            <div className="mx-auto flex w-full items-center justify-between gap-2">
              <Link href="/" aria-label="Home" className="flex shrink-0 items-center text-gray-900 dark:text-gray-100">
                <Logo />
              </Link>

              <Navbar />
            </div>
          </header>

          <div className="relative z-10 w-full px-3 sm:px-4 lg:px-6 py-3 sm:py-6 max-w-7xl mx-auto">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}