import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-3xl py-10 sm:py-16">
      <div className="mb-8 flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-gray-500">
        <span>✦</span>
        <span>Blogs</span>
      </div>

      <h1 className="mb-8 text-4xl font-semibold tracking-tight sm:text-5xl">
        Writing and notes.
      </h1>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-gray-200 pb-6 last:border-b-0">
            <Link href={`/blog/${post.slug}`} className="block hover:opacity-70">
              <h2 className="mb-2 text-2xl font-semibold">{post.title}</h2>
            </Link>
            <p className="mb-3 text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
