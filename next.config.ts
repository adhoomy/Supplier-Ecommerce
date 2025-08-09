import type { NextConfig } from "next";

/**
 * Next.js configuration
 * Customize your Next.js app behavior here
 */
const nextConfig: NextConfig = {
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Experimental features (uncomment if needed)
  // experimental: {
  //   serverActions: true,
  // },
  
  // Redirects (uncomment if needed)
  // async redirects() {
  //   return [
  //     {
  //       source: '/old-page',
  //       destination: '/new-page',
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
