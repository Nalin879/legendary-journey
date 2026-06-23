import Link from 'next/link';
import { getAllProjectSlugs, getProject } from '@/lib/mdx';
import { MDXContent } from '@/components/MDXContent';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl py-10 sm:py-16">
      {/* 1. The Breadcrumbs */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Link
          href="/"
          className="border-b border-gray-300 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:hover:border-gray-300 dark:hover:text-gray-100"
        >
          home
        </Link>
        <span className="text-gray-300 dark:text-gray-700">/</span>
        <Link
          href="/projects"
          className="border-b border-gray-300 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:hover:border-gray-300 dark:hover:text-gray-100"
        >
          projects
        </Link>
      </nav>

      {/* 2. The Header */}
      <div className="mb-8 space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          {project.title}
        </h1>
        {project.summary ? (
          <p className="text-[14px] leading-7 text-gray-700 dark:text-gray-300 sm:text-base">
            {project.summary}
          </p>
        ) : null}
      </div>

      {/* 3. The Pill Buttons */}
      {project.link ? (
        <div className="mb-8 flex flex-wrap gap-3">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-700 transition-colors hover:border-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-300"
          >
            Open link
          </a>
          {project.video ? (
            <a
              href={project.video}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-700 transition-colors hover:border-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-300"
            >
              Watch video
            </a>
          ) : null}
        </div>
      ) : null}

      {/* 4. The MDX Body */}
      <article className="prose prose-sm max-w-none text-gray-700 dark:prose-invert dark:text-gray-300">
        <MDXContent content={project.content} />

        {/* 5. The Footer */}
        <footer className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-800">
          <Link
            href="/projects"
            className="inline-block text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 border-b border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-300"
          >
            projects
          </Link>
        </footer>
      </article>
    </main>
  );
}