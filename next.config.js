/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'via.placeholder.com',
      'assets.ayobandung.com',
      'res.cloudinary.com',
      'images.unsplash.com',
      'cdn.sanity.io',
    ],
  },
};

module.exports = nextConfig;
