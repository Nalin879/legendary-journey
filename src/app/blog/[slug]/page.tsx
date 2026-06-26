import { getAllSlugs, getPost } from '@/lib/mdx';
import { MDXContent } from '@/components/MDXContent';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/date';
import {
  PageFooter,
  PageHeader,
  PageShell,
} from '@/components/PageHeader';
import { SITE } from '@/lib/site';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | ${SITE.name}`,
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
    <PageShell
      back={[
        { href: '/', label: 'home' },
        { href: '/blog', label: 'blogs' },
      ]}
    >
      <article>
        <PageHeader
          title={post.title}
          description={
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(post.date)}
            </span>
          }
          className="mb-10"
        />

        <div>
          <MDXContent content={post.content} />
        </div>
      </article>

      <PageFooter back={{ href: '/blog', label: 'blogs' }} />
    </PageShell>
  );
}
