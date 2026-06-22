import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');
const blogDir = path.join(contentDir, 'blogs');
const projectsDir = path.join(contentDir, 'projects');

export interface Post {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  content: string;
}

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
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

/**
 * Get all post metadata (for listing)
 */
export function getAllPosts(): PostMetadata[] {
  if (!fs.existsSync(blogDir)) return [];

  const files = fs.readdirSync(blogDir);

  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(blogDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: file.replace(/\.mdx$/, ''),
        title: data.title || 'Untitled',
        date: data.date || '',
        tags: data.tags || [],
      };
    });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single post by slug
 */
export function getPost(slug: string): Post | null {
  try {
    const filePath = path.join(blogDir, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || '',
      tags: data.tags || [],
      content,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Get all slugs (for generateStaticParams)
 */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(blogDir)) return [];

  const files = fs.readdirSync(blogDir);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getAllProjects(): ProjectMetadata[] {
  if (!fs.existsSync(projectsDir)) return [];

  const files = fs.readdirSync(projectsDir).filter((file) => file.endsWith('.mdx'));

  const projects = files.map((file) => {
    const filePath = path.join(projectsDir, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug: file.replace(/\.mdx$/, ''),
      title: data.title || 'Untitled Project',
      summary: data.summary || '',
      link: data.link || '',
      video: data.video || '',
      date: data.date || '',
    };
  });

  return projects.sort((a, b) => new Date(b.date || '1970-01-01').getTime() - new Date(a.date || '1970-01-01').getTime());
}

export function getProject(slug: string): ProjectItem | null {
  try {
    const filePath = path.join(projectsDir, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled Project',
      summary: data.summary || '',
      link: data.link || '',
      video: data.video || '',
      date: data.date || '',
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDir)) return [];

  return fs
    .readdirSync(projectsDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}


export function getGalleryImages() {
  const dir = path.join(process.cwd(), 'public/gallery');

  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(jpg|png|webp)$/i.test(f));

  return files.map((f) => `/gallery/${f}`);
}