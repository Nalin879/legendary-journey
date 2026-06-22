'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ViewTransition {
  finished: Promise<void>;
}

interface DocumentWithTransition extends Document {
  startViewTransition?: (
    callback: () => void | Promise<void>
  ) => ViewTransition;
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
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

    const doc = document as DocumentWithTransition;

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