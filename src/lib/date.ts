/**
 * Shared date helpers. Format dates once here so every page
 * stays in sync with the same locale + options.
 */

const longFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const shortFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

/** e.g. "June 22, 2026" */
export function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return longFormatter.format(d);
}

/** e.g. "Jun 22, 2026" */
export function formatDateShort(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return shortFormatter.format(d);
}
