import Link from 'next/link';
import { getAllSlugs, getPost } from '@/lib/mdx';
import { MDXContent } from '@/components/MDXContent';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Nalin Subramanian`,
    description: `Blog post: ${post.title}`,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-2xl px-1 py-10 sm:py-16">
      <nav className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      <Link
        href="/"
        className="inline-block text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 border-b"
      >
        home
      </Link>
      <span> / </span>
      <Link
        href="/blog"
        className="inline-block text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 border-b"
      >
        blogs
      </Link>
    </nav>

      <header className="mb-10">
        <h1 className="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </header>

      <div>
        <MDXContent content={post.content} />
      </div>
      <footer className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-800">
        <Link
          href="/blog"
          className="text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 border-b"
        >
          blogs
        </Link>
      </footer>
    </article>
  );
}
