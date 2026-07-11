/** @type {import('next').NextConfig} */

// CO3 Premium Liquid Shop — Static export for Hostinger shared hosting.
// `output: 'export'` produces a fully static /out folder (pure HTML/CSS/JS)
// that can be uploaded to public_html with zero Node runtime required.
const nextConfig = {
  output: 'export',

  // Static export cannot use the on-the-fly Image Optimization API, so we
  // serve pre-optimised WebP assets directly and disable the optimizer.
  images: {
    unoptimized: true,
  },

  // Emit /menu/index.html instead of /menu.html so Apache (Hostinger) resolves
  // clean URLs without extra .htaccess rewrites.
  trailingSlash: true,

  reactStrictMode: true,

  // Hostinger serves from a subfolder-free document root by default.
  // If you deploy into a subdirectory, set NEXT_PUBLIC_BASE_PATH and uncomment:
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
