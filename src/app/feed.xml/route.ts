import { getAllPosts } from '@/lib/mdx';
import { SITE } from '@/lib/site';

/**
 * Static RSS 2.0 feed.
 *
 * Built once at `next build` time and written to `out/feed.xml`
 * (or `out/<basePath>/feed.xml` on GitHub Pages). Feed readers
 * poll this URL to discover new posts.
 *
 * RSS 2.0 spec: https://cyber.harvard.edu/rss/rss.html
 */

export const dynamic = 'force-static';

/** Escape characters that would otherwise break XML. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** RSS uses RFC 822 dates, e.g. "Mon, 22 Jun 2026 12:00:00 GMT". */
function toRfc822(iso: string): string {
  if (!iso) return new Date(0).toUTCString();
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return new Date(0).toUTCString();
  return d.toUTCString();
}

/** Origin of the site, with the GitHub Pages basePath if configured. */
function siteUrl(path = ''): string {
  const isProd = process.env.NODE_ENV === 'production';
  const origin = isProd
    ? `https://nalin879.github.io${SITE.basePath}`
    : 'http://localhost:3000';
  const normalised = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${normalised}`;
}

export function GET(): Response {
  const posts = getAllPosts().slice(0, 20); // newest 20
  const lastBuildDate = toRfc822(new Date().toISOString());
  const latest = posts[0];
  const latestPubDate = latest ? toRfc822(latest.date) : lastBuildDate;

  const items = posts
    .map((post) => {
      const url = siteUrl(`/blog/${post.slug}/`);
      const description = post.tags?.length
        ? `Filed under: ${post.tags.join(', ')}`
        : '';
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${toRfc822(post.date)}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.author)}</title>
    <link>${escapeXml(siteUrl('/'))}</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${latestPubDate}</pubDate>
    <atom:link href="${escapeXml(siteUrl('/feed.xml'))}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // Help CDNs/feed readers cache aggressively but revalidate.
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}