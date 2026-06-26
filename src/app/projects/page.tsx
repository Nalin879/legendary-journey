import { getAllProjects } from '@/lib/mdx';
import { ListCard } from '@/components/ListCard';
import { PageHeader, PageShell } from '@/components/PageHeader';

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <PageShell back={{ href: '/', label: 'home' }}>
      <PageHeader title="Projects." />

      <div className="space-y-10">
        {projects.map((project) => (
          <div key={project.slug}>
            <ListCard
              href={`/projects/${project.slug}`}
              title={project.title}
              description={project.summary}
            />
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
          </div>
        ))}
      </div>
    </PageShell>
  );
}
