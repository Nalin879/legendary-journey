import Link from 'next/link';

interface BackItem {
  href: string;
  label: string;
}

interface PageShellProps {
  back?: BackItem | BackItem[];
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}

export function PageShell({ back, children, className = '', wide = false }: PageShellProps) {
  const items = back ? (Array.isArray(back) ? back : [back]) : [];

  return (
    <main
      className={
        'mx-auto py-10 sm:py-16 ' +
        (wide ? 'w-full max-w-none ' : 'max-w-2xl px-3 sm:px-4 lg:px-6 ') +
        className
      }
    >
      {items.length > 0 && <Breadcrumb items={items} />}
      {children}
    </main>
  );
}

interface PageHeaderProps {
  title: string;
  description?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, className = '' }: PageHeaderProps) {
  return (
    <header className={`mb-12 ${className}`.trim()}>
      <h1 className="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      )}
    </header>
  );
}

interface PageFooterProps {
  back: BackItem;
}

export function PageFooter({ back }: PageFooterProps) {
  return (
    <footer className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-800">
      <BackLink href={back.href} label={back.label} />
    </footer>
  );
}

export function Breadcrumb({ items }: { items: BackItem[] }) {
  return (
    <nav className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      {items.map((item, idx) => (
        <span key={item.href} className="flex items-center gap-2">
          <BackLink href={item.href} label={item.label} />
          {idx < items.length - 1 && (
            <span className="text-gray-300 dark:text-gray-700">/</span>
          )}
        </span>
      ))}
    </nav>
  );
}


export function BackLink({ href, label }: BackItem) {
  const base =
    'inline-block text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 border-b';
  return (
    <Link href={href} className={base}>
      {label}
    </Link>
  );
}
