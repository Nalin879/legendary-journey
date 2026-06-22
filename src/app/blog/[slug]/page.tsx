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
    <article className="max-w-2xl mx-auto">
      {/* Back Link */}
      <Link href="/" className="text-sm text-gray-600 hover:text-[#1a1a1a] mb-8 inline-block">
        ← Back to home
      </Link>

      {/* Post Header */}
      <header className="mb-12 pb-8 border-b border-gray-200">
        <h1 className="text-5xl sm:text-5xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-4">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Post Content */}
      <div className="prose prose-sm sm:prose lg:prose-lg max-w-none mb-16">
        <MDXContent content={post.content} />
      </div>

      {/* Footer */}
      <footer className="pt-8 border-t border-gray-200">
        <Link href="/" className="text-sm text-gray-600 hover:text-[#1a1a1a]">
          ← Back to home
        </Link>
      </footer>
    </article>
  );
}
