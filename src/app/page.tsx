import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-2xl py-10 sm:py-16">
        <h1 className="mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Nalinraj Subramanian
        </h1>

        <div className="space-y-5 text-[14px] leading-7 text-gray-700 dark:text-gray-300 sm:text-base">
          <p>
            Hey! I'm Nalin, a software engineer.<br />
            Currently working at{' '}
            <a
              href="https://amadeus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-gray-300 transition-colors hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-300"
            >
              Amadeus
            </a>
            .
          </p>

          <p>
            I enjoy building across the board rather than locking myself into one specific lane. Lately, a lot of that curiosity goes into Applied AI, specifically the puzzle of taking messy, scattered data and turning it into clean, highly readable fuel for language models. I love the lateral thinking behind the job, especially finding a genuinely simple solution to a massive architectural headache.
          </p>

          <p>
            When I’m not staring at a screen, you can find me writing down what I learn on{' '}
            <Link
              href="/blog"
              className="border-b border-gray-300 transition-colors hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-300"
            >
              my blog
            </Link>
            , capturing quiet moments{' '}
            <Link
              href="/camera"
              className="border-b border-gray-300 transition-colors hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-300"
            >
              over here
            </Link>
            , logging long-distance runs, or playing badminton.
          </p>

          <div className="pt-2">
            <p>You can find me on</p>
            <p className="mt-1">
              <a
                href="https://linkedin.com/in/nalin879"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-gray-300 transition-colors hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-300"
              >
                LinkedIn
              </a>
              {', '}
              <a
                href="https://github.com/Nalin879"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-gray-300 transition-colors hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-300"
              >
                GitHub
              </a>
              {', or say hi at '}
              <a
                href="mailto:rajnalin.9626@gmail.com"
                className="border-b border-gray-300 transition-colors hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-300"
              >
                rajnalin.9626@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <footer className="mx-auto mt-16 max-w-2xl border-t border-gray-200 pt-8 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <p>Available for thoughtful product work.</p>
      </footer>
    </main>
  );
}