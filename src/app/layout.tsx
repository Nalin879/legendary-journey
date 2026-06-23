import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

import { Logo } from '@/components/Logo';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Nalin | AI Engineer',
  description:
    'Portfolio and blog of an AI engineer exploring modern web technologies.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="
          bg-[#fafafa]
          text-[#1a1a1a]
          dark:bg-[#0f0f0f]
          dark:text-[#f5f5f5]
          antialiased
          transition-colors
          duration-500
        "
      >
        <ThemeProvider>
          <div className="w-full px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
            <header
              className="
                mx-auto
                flex
                h-14
                items-center
                justify-between
                border-b
                border-gray-200
                dark:border-gray-700
                transition-colors
                duration-500
              "
            >
              <Link
                href="/"
                className="
                  flex
                  shrink-0
                  items-center
                  text-gray-900
                  dark:text-gray-100
                "
              >
                <Logo />
              </Link>

              <nav
                className="
                flex
                items-center
                gap-1
                sm:gap-2
                md:gap-4
                text-sm
                text-gray-700
                dark:text-gray-300
                transition-colors
                duration-500
              "
              >
                <Link
                  href="/blog"
                  className="rounded-full px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Blogs
                </Link>

                <Link
                  href="/projects"
                  className="rounded-full px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Projects
                </Link>

                <Link
                  href="/camera"
                  className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Camera"
                >
                  📷
                </Link>

                <a
                  href="https://linkedin.com/in/nalin879"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="LinkedIn"
                >
                  in
                </a>

                <a
                  href="https://github.com/Nalin879"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="GitHub"
                >
                  ⌘
                </a>

                <ThemeToggle />
              </nav>
            </header>

            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}