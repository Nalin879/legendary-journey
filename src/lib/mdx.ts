import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { SITE } from '@/lib/site';

const contentDir = path.join(process.cwd(), 'content');
const blogDir = path.join(contentDir, 'blogs');
const projectsDir = path.join(contentDir, 'projects');

/* ---------- Public types ---------- */

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
}

export interface Post extends PostMetadata {
  content: string;
}

export interface ProjectMetadata {
  slug: string;
  title: string;
  summary?: string;
  link?: string;
  video?: string;
  date?: string;
}

export interface ProjectItem extends ProjectMetadata {
  content: string;
}

/* ---------- Generic MDX collection factory ---------- */

interface CollectionConfig<T> {
  dir: string;
  /** Maps frontmatter + slug → typed metadata. */
  map: (data: Record<string, unknown>, slug: string) => T;
  /** Sort key extractor. Missing dates fall to the bottom. */
  sortBy?: (item: T) => number;
}

const UNTITLED = 'Untitled';

function listMdxSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

function readMdx(
  dir: string,
  slug: string,
): { data: Record<string, unknown>; content: string } | null {
  try {
    const filePath = path.join(dir, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return { data, content };
  } catch {
    return null;
  }
}

function createMdxCollection<T>(config: CollectionConfig<T>) {
  const { dir, map, sortBy } = config;

  return {
    list(): T[] {
      const items = listMdxSlugs(dir).map((slug) => {
        const read = readMdx(dir, slug);
        return map(read?.data ?? {}, slug);
      });
      return sortBy ? items.sort((a, b) => sortBy(b) - sortBy(a)) : items;
    },
    get(slug: string): T | null {
      const read = readMdx(dir, slug);
      if (!read) return null;
      return map(read.data, slug);
    },
    slugs(): string[] {
      return listMdxSlugs(dir);
    },
  };
}

/* ---------- Blog posts collection ---------- */

function parseDateKey(s: unknown): number {
  const t = Date.parse(typeof s === 'string' ? s : '');
  return Number.isNaN(t) ? 0 : t;
}

const posts = createMdxCollection<Post>({
  dir: blogDir,
  map: (data, slug) => ({
    slug,
    title: (data.title as string) || UNTITLED,
    date: (data.date as string) || '',
    tags: (data.tags as string[] | undefined) ?? [],
    // Content is only populated by the direct getPost() helper below;
    // list() callers receive empty content and should use getPost() instead.
    content: '',
  }),
  sortBy: (post) => parseDateKey(post.date),
});

/** Single blog post with body content. */
export function getPost(slug: string): Post | null {
  const read = readMdx(blogDir, slug);
  if (!read) return null;
  return {
    slug,
    title: (read.data.title as string) || UNTITLED,
    date: (read.data.date as string) || '',
    tags: (read.data.tags as string[] | undefined) ?? [],
    content: read.content,
  };
}

/** All blog post metadata (no body), newest first. */
export function getAllPosts(): PostMetadata[] {
  return posts
    .list()
    .map(({ content: _content, ...meta }) => meta);
}

/** All blog post slugs (for generateStaticParams). */
export function getAllSlugs(): string[] {
  return posts.slugs();
}

/* ---------- Projects collection ---------- */

const projects = createMdxCollection<ProjectItem>({
  dir: projectsDir,
  map: (data, slug) => ({
    slug,
    title: (data.title as string) || UNTITLED,
    summary: (data.summary as string) || '',
    link: (data.link as string) || '',
    video: (data.video as string) || '',
    date: (data.date as string) || '',
    content: '',
  }),
  sortBy: (project) => parseDateKey(project.date),
});

/** Single project with body content. */
export function getProject(slug: string): ProjectItem | null {
  const read = readMdx(projectsDir, slug);
  if (!read) return null;
  return {
    slug,
    title: (read.data.title as string) || UNTITLED,
    summary: (read.data.summary as string) || '',
    link: (read.data.link as string) || '',
    video: (read.data.video as string) || '',
    date: (read.data.date as string) || '',
    content: read.content,
  };
}

/** All project metadata (no body), newest first. */
export function getAllProjects(): ProjectMetadata[] {
  return projects
    .list()
    .map(({ content: _content, ...meta }) => meta);
}

/** All project slugs (for generateStaticParams). */
export function getAllProjectSlugs(): string[] {
  return projects.slugs();
}

/* ---------- Gallery (not MDX, kept here for proximity) ---------- */

const IMAGE_RE = /\.(jpg|jpeg|png|webp|gif)$/i;

export function getGalleryImages(): string[] {
  const dir = path.join(process.cwd(), 'public/gallery');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_RE.test(f))
    .map((f) => `${SITE.basePath}/gallery/${f}`);
}
