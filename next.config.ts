/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config : any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    }
    return config
  }
}

module.exports = nextConfig