// Flat ESLint config for Next.js 16.
// Replaces the legacy .eslintrc.json that was incompatible with ESLint v9+.
import next from 'eslint-config-next';

const config = [
  ...next,
  {
    ignores: [
      '.next/**',
      'out/**',
      'node_modules/**',
      'public/**',
      'next-env.d.ts',
    ],
  },
  {
    // The TypeScript files are owned by @typescript-eslint/no-unused-vars
    // (shipped via eslint-config-next). The core `no-unused-vars` rule
    // fires on type-position parameter names like `map: (data, slug) => T`,
    // which are intentionally unused. Disable it for TS, keep it for JS.
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    rules: {
      // Allow unused vars that start with `_`.
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
];

export default config;