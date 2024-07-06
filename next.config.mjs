/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx"],
  experimental: { serverActions: true },
};

export default nextConfig;
