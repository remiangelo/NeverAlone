/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  // Explicitly define the pages directory
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Explicitly set the directory structure
  distDir: '.next',
  // Set the source directory
  dir: 'src',
};

module.exports = nextConfig;
