import Link from 'next/link';

interface ListCardProps {
  href: string;
  title: string;
  meta?: React.ReactNode;
  /** Optional secondary line (e.g. project summary). */
  description?: React.ReactNode;
}

export function ListCard({ href, title, meta, description }: ListCardProps) {
  return (
    <article>
      <Link href={href} className="group block">
        <h2 className="mb-1 text-xl font-medium text-gray-900 group-hover:opacity-60 dark:text-gray-100">
          {title}
        </h2>
        {description && (
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        )}
        {meta && <div className="text-sm text-gray-500">{meta}</div>}
      </Link>
    </article>
  );
}
