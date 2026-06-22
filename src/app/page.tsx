export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-3xl py-10 sm:py-16">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
          About me
        </p>

        <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          I build thoughtful digital experiences at the intersection of
          product, code, and clarity.
        </h1>

        <p className="text-lg leading-8 text-gray-700 dark:text-gray-300">
          I'm Nalin Subramanian, an AI engineer and developer focused on
          creating polished, practical products with calm interfaces and
          strong engineering fundamentals.
        </p>
      </section>

      <footer className="mx-auto mt-16 max-w-3xl border-t border-gray-200 dark:border-gray-700 pt-8 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Available for thoughtful product work and modern web experiences.
        </p>
      </footer>
    </main>
  );
}