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
    <main className="mx-auto max-w-3xl py-10 sm:py-16">
      <Link href="/projects" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:opacity-70">
        <span>←</span>
        <span>Back to projects</span>
      </Link>

      <div className="mb-8">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">Project</p>
        <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
        {project.summary ? <p className="text-lg text-gray-700">{project.summary}</p> : null}
      </div>

      {project.link ? (
        <div className="mb-8 flex flex-wrap gap-3">
          <a href={project.link} target="_blank" rel="noreferrer" className="rounded-full border border-gray-300 px-4 py-2 text-sm hover:opacity-70">
            Open link
          </a>
          {project.video ? (
            <a href={project.video} target="_blank" rel="noreferrer" className="rounded-full border border-gray-300 px-4 py-2 text-sm hover:opacity-70">
              Watch video
            </a>
          ) : null}
        </div>
      ) : null}

      <article className="prose prose-sm max-w-none text-gray-700">
        <MDXContent content={project.content} />
      </article>
    </main>
  );
}
