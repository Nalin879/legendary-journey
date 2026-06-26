import { getAllPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/date';
import { ListCard } from '@/components/ListCard';
import { PageHeader, PageShell } from '@/components/PageHeader';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageShell back={{ href: '/', label: 'home' }}>
      <PageHeader title="Writing and notes." />

      <div className="space-y-10">
        {posts.map((post) => (
          <ListCard
            key={post.slug}
            href={`/blog/${post.slug}`}
            title={post.title}
            meta={formatDate(post.date)}
          />
        ))}
      </div>
    </PageShell>
  );
}
