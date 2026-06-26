'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // The classic "mounted" guard from next-themes: the server doesn't
    // know the resolved theme, so we defer the real button render to
    // after hydration. Setting state synchronously here is intentional
    // — it's the only way to gate on the first client-side render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="rounded-full border border-gray-300 px-2 py-1"
      >
        ...
      </button>
    );
  }

  const toggleTheme = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const nextTheme =
      resolvedTheme === 'dark' ? 'light' : 'dark';

    const x = e.clientX;
    const y = e.clientY;

    document.documentElement.style.setProperty('--x', `${x}px`);
    document.documentElement.style.setProperty('--y', `${y}px`);

    // Safe access to View Transitions API
    const doc = document as Document & {
      startViewTransition?: (_callback: () => void | Promise<void>) => {
        finished: Promise<void>;
      };
    };

    if (!doc.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    await doc.startViewTransition(() => {
      setTheme(nextTheme);
    }).finished;
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle theme"
      className="
        rounded-full
        border
        border-gray-300
        dark:border-gray-600
        px-2
        py-1
        text-xs
        uppercase
        tracking-[0.2em]
        transition-all
        duration-300
        hover:scale-105
        active:scale-95
      "
    >
      {resolvedTheme === 'dark' ? '☀︎' : '☾'}
    </button>
  );
}