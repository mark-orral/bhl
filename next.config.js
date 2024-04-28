/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "content.blackhorsecollective.co.uk",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/community",
        destination: "/community/all",
        permanent: true,
      },
      {
        source: "/spaces",
        destination: "/spaces/all",
        permanent: true,
      },
      {
        source: "/skills-and-training",
        destination: "/skills-and-training/all",
        permanent: true,
      },
    ];
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
