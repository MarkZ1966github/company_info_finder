/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    PORT: '9999',
  },
  env: {
    PORT: '9999',
  }
};

module.exports = nextConfig;;