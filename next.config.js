/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/hidayatjendelalangit",
      permanent: false,
    },
  ],
};

const { withSuperjson } = require("next-superjson");

module.exports = withSuperjson()(nextConfig);
