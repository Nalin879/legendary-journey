/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/legendary-journey',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '/legendary-journey',
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};

export default nextConfig;
