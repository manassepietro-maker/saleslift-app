/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The alternative homepage moved from /v1 to /v2.
  async redirects() {
    return [{ source: "/v1", destination: "/v2", permanent: false }];
  },
};

module.exports = nextConfig;
