import { getGalleryImages } from '@/lib/mdx';
import { PageHeader, PageShell } from '@/components/PageHeader';

export default function CameraPage() {
  const images = getGalleryImages();

  return (
    <PageShell wide back={{ href: '/', label: 'home' }}>
      <PageHeader
        title="Camera."
        description="A quiet gallery of moments."
      />

      {images.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
          Add images to the <span className="font-medium">content/gallery</span> folder and they will appear here automatically.
        </div>
      ) : (
        <div className="-mx-3 grid grid-cols-2 gap-1 sm:-mx-4 sm:gap-2 lg:-mx-6 md:grid-cols-3 lg:grid-cols-4 px-3 sm:px-4 lg:px-6">
          {images.map((image) => (
            // `next/image` would require `images.unoptimized: true` in
            // next.config.js for static export; a plain `<img>` keeps
            // the gallery layout exact with no extra build config.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={image}
              src={image}
              alt="Gallery image"
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          ))}
        </div>
      )}
    </PageShell>
  );
}
