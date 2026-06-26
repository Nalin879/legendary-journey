'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  BlogIcon,
  CameraIcon,
  GithubIcon,
  LinkedinIcon,
  ProjectsIcon,
  RssIcon,
} from '@/components/icons';
import { RSS_FEED, SITE } from '@/lib/site';

export function Navbar() {
  const pathname = usePathname();

  const internalLinks = [
    { label: 'Blogs', href: '/blog', icon: BlogIcon, showText: false },
    { label: 'Projects', href: '/projects', icon: ProjectsIcon, showText: false },
    { label: 'Camera', href: '/camera', icon: CameraIcon, showText: false },
  ];

  const socialLinks = [
    { label: 'LinkedIn', href: SITE.social.linkedin, icon: LinkedinIcon },
    { label: 'GitHub', href: SITE.social.github, icon: GithubIcon },
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
            {/* Always icon-only on mobile (sm and below), text label appears sm+ */}
            {item.label && (
              <span className="hidden sm:inline font-medium">{item.label}</span>
            )}

            <span
              className={`absolute bottom-1 left-2.5 right-2.5 h-[2px] rounded-full bg-gray-900 dark:bg-gray-100 transition-transform duration-200 ease-out origin-center ${
                isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}
            />
          </Link>
        );
      })}

      <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-800 mx-0.5 sm:mx-1 self-center" />

      {/* RSS feed — sits next to the social icons so it reads as
          "external subscription link" rather than a primary nav item. */}
      <a
        href={RSS_FEED}
        aria-label="RSS feed"
        className="group relative rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      >
        <RssIcon className="w-4 h-4 shrink-0" />
        <span className="absolute bottom-1 left-2 right-2 h-[2px] rounded-full bg-gray-900 dark:bg-gray-100 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-center" />
      </a>

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