/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'via.placeholder.com',
      'res.cloudinary.com',
      'images.unsplash.com',
      'cdn.sanity.io',
      'www.exscribe.com',
      's3-ap-southeast-1.amazonaws.com',
      's-light.tiket.photos',
    ],
  },
};

module.exports = nextConfig;
