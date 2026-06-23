import Link from 'next/link';
import { getAllProjects } from '@/lib/mdx';

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="mx-auto max-w-2xl py-10 sm:py-16">
      <nav className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Link
        href="/"
        className="inline-block text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 border-b"
      >
        home
      </Link>
    </nav>
      <h1 className="mb-12 text-3xl font-semibold tracking-tight sm:text-4xl">
        Projects.
      </h1>

      <div className="space-y-10">
        {projects.map((project) => (
          <article key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <h2 className="mb-1 text-xl font-medium text-gray-900 group-hover:opacity-60 dark:text-gray-100">
                {project.title}
              </h2>
              {project.summary && (
                <p className="text-gray-600 dark:text-gray-400">
                  {project.summary}
                </p>
              )}
            </Link>

            {(project.link || project.video) && (
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    ↗ View project
                  </a>
                )}
                {project.video && (
                  <a
                    href={project.video}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    🎬 Watch video
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
