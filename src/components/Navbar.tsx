'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';

// --- NATIVE VECTOR ICONS (Zero external dependencies, 100% stable) ---

const BlogIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 Z"/>
  </svg>
);

const ProjectsIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const CameraIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export function Navbar() {
  const pathname = usePathname();

  const internalLinks = [
    { label: 'Blogs', href: '/blog', icon: BlogIcon, showText: true },
    { label: 'Projects', href: '/projects', icon: ProjectsIcon, showText: true },
    { label: 'Camera', href: '/camera', icon: CameraIcon, showText: false },
  ];

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/nalin879', icon: LinkedinIcon },
    { label: 'GitHub', href: 'https://github.com/Nalin879', icon: GithubIcon },
  ];

  return (
    <nav className="flex items-center gap-1 sm:gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-500">
      {internalLinks.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className="group relative flex items-center gap-1.5 rounded-full p-2 sm:px-3 sm:py-1.5 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <Icon className="w-4 h-4 shrink-0" />
            {item.showText && <span className="hidden sm:inline font-medium">{item.label}</span>}

            <span
              className={`absolute bottom-1 left-2.5 right-2.5 h-[2px] rounded-full bg-gray-900 dark:bg-gray-100 transition-transform duration-200 ease-out origin-center ${
                isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}
            />
          </Link>
        );
      })}

      <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-800 mx-0.5 sm:mx-1 self-center" />

      {socialLinks.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            className="group relative rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="absolute bottom-1 left-2 right-2 h-[2px] rounded-full bg-gray-900 dark:bg-gray-100 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-center" />
          </a>
        );
      })}

      <ThemeToggle />
    </nav>
  );
}