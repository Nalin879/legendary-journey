import { getAllProjectSlugs, getProject } from '@/lib/mdx';
import { MDXContent } from '@/components/MDXContent';
import { notFound } from 'next/navigation';
import {
  PageFooter,
  PageHeader,
  PageShell,
} from '@/components/PageHeader';

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
    <PageShell
      back={[
        { href: '/', label: 'home' },
        { href: '/projects', label: 'projects' },
      ]}
    >
      <PageHeader
        title={project.title}
        description={project.summary}
        className="mb-8"
      />

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

      <article className="prose prose-sm max-w-none text-gray-700 dark:prose-invert dark:text-gray-300">
        <MDXContent content={project.content} />
      </article>

      <PageFooter back={{ href: '/projects', label: 'projects' }} />
    </PageShell>
  );
}