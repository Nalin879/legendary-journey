import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-2xl py-10 sm:py-16">
      <nav className= "mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      <Link
        href="/"
        className="inline-block text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 border-b"
      >
        home
      </Link>
    </nav>
      <h1 className="mb-12 text-3xl font-semibold tracking-tight sm:text-4xl">
        Writing and notes.
      </h1>

      <div className="space-y-10">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <h2 className="mb-1 text-xl font-medium text-gray-900 group-hover:opacity-60 dark:text-gray-100">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
