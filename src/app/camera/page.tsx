import { getGalleryImages } from '@/lib/mdx';
import Link from 'next/link';

export default function CameraPage() {
  const images = getGalleryImages();

  return (
    <main className="mx-auto max-w-2xl py-10 sm:py-16">
      <nav className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Link
        href="/"
        className="inline-block text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 border-b"
      >
        home
      </Link>
      </nav>
      <h1 className="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Camera.
      </h1>
      <p className="mb-10 text-gray-600 dark:text-gray-400">
        A quiet gallery of moments.
      </p>

      {images.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
          Add images to the <span className="font-medium">content/gallery</span> folder and they will appear here automatically.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {images.map((image) => (
            <img
              key={image}
              src={image}
              alt="Gallery image"
              loading="lazy"
              className="h-56 w-full rounded-xl object-cover sm:h-64"
            />
          ))}
        </div>
      )}
      <footer className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-800">
          <Link
            href="/projects"
            className="inline-block text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 border-b border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-300"
          >
            home
          </Link>
        </footer>
    </main>
  );
}
