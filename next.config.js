/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      // {
      //   hostname: "res.cloudinary.com",
      // },
      // {
      //   hostname: "asset.cloudinary.com",
      // },
    ],
  },
};

module.exports = nextConfig;
