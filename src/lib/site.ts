/**
 * Single source of truth for site-wide constants.
 * Keep this file dependency-free so it can be imported from
 * both server and client components, and from next.config.js.
 *
 * NOTE: only paths that live *inside* the GitHub Pages subtree
 * (i.e. local files we serve) need basePath-awareness — use the
 * `path()` helper below for those. External URLs (social links,
 * email) stay as plain strings.
 */
export const SITE = {
  name: 'Nalin',
  author: 'Nalinraj Subramanian',
  /** Site description used in <metadata>. */
  description:
    'Portfolio and blog of an AI engineer exploring modern technologies.',
  /**
   * GitHub Pages base path. Read from env so local dev (`pnpm dev`)
   * works without the prefix, while static builds honour the prefix
   * configured in next.config.js.
   */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/legendary-journey',
  social: {
    linkedin: 'https://www.linkedin.com/in/nalin897/',
    github: 'https://github.com/Nalin879',
    email: 'rajnalin.9626@gmail.com',
  },
} as const;

export type Site = typeof SITE;

/**
 * Build a basePath-aware path for a file that lives inside the
 * GitHub Pages subtree (e.g. /feed.xml).
 *
 *   path('/feed.xml')  → '/legendary-journey/feed.xml'  (in prod)
 *   path('/feed.xml')  → '/feed.xml'                    (when basePath = '/')
 *
 * Do NOT use this for external links — those are plain absolute URLs.
 */
export function path(p: string): string {
  const base = SITE.basePath.endsWith('/')
    ? SITE.basePath.slice(0, -1)
    : SITE.basePath;
  const tail = p.startsWith('/') ? p : `/${p}`;
  return `${base}${tail}`;
}

/** Absolute URL to the RSS feed, including the basePath. */
export const RSS_FEED = path('/feed.xml');
