/** @type {import('next').NextConfig} */
const nextConfig = {

  // ✅ disable ESLint blocking builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config : any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    }
    return config
  }
}

module.exports = nextConfig