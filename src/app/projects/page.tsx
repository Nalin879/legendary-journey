import Link from 'next/link';
import { getAllProjects } from '@/lib/mdx';

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="mx-auto max-w-3xl py-10 sm:py-16">
      <div className="mb-8 flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-gray-500">
        <span>✦</span>
        <span>Projects</span>
      </div>

      <h1 className="mb-8 text-4xl font-semibold tracking-tight sm:text-5xl">
        Selected work and experiments.
      </h1>

      <div className="space-y-6">
        {projects.map((project) => (
          <article key={project.slug} className="rounded-2xl border border-gray-200 p-6">
            <Link href={`/projects/${project.slug}`} className="block hover:opacity-70">
              <h2 className="mb-2 text-2xl font-semibold">{project.title}</h2>
            </Link>
            {project.summary && <p className="mb-4 text-gray-700">{project.summary}</p>}
            <div className="flex flex-wrap gap-3">
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium transition hover:opacity-70">
                  <span>↗</span>
                  <span>View project</span>
                </a>
              )}
              {project.video && (
                <a href={project.video} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium transition hover:opacity-70">
                  <span>🎬</span>
                  <span>Watch video</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
