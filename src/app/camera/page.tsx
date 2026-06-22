import { getGalleryImages } from '@/lib/mdx';

export default function CameraPage() {
  const images = getGalleryImages();

  return (
    <main className="mx-auto max-w-5xl py-10 sm:py-16">
      <div className="mb-8 flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-gray-500">
        <span>◔</span>
        <span>Camera</span>
      </div>

      <h1 className="mb-8 text-4xl font-semibold tracking-tight sm:text-5xl">
        A quiet gallery of moments.
      </h1>

      {images.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-gray-600">
          Add images to the <span className="font-medium">content/gallery</span> folder and they will appear here automatically.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <img key={image} src={image} alt="Gallery image" className="h-72 w-full rounded-2xl object-cover shadow-sm" />
          ))}
        </div>
      )}
    </main>
  );
}
