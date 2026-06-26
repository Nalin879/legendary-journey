import type { Config } from 'tailwindcss';

/**
 * Tailwind v4 reads its theme from CSS by default (see
 * `src/app/globals.css`). This file is kept minimal so future
 * project-level overrides (plugins, safelist) have a home.
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  plugins: [],
};

export default config;
