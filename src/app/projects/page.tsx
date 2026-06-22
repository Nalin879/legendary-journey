import Link from 'next/link';

const projects = [
  {
    title: 'Portfolio Blog Platform',
    description: 'A polished static portfolio and blog built with Next.js, MDX, and Tailwind CSS.',
    href: 'https://github.com',
  },
  {
    title: 'AI Product Experiments',
    description: 'Small experiments exploring modern AI workflows, interfaces, and developer tooling.',
    href: 'https://github.com',
  },
];

export default function ProjectsPage() {
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
          <article key={project.title} className="rounded-2xl border border-gray-200 p-6">
            <h2 className="mb-2 text-2xl font-semibold">{project.title}</h2>
            <p className="mb-4 text-gray-700">{project.description}</p>
            <Link href={project.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium transition hover:opacity-70">
              <span>↗</span>
              <span>View project</span>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
