/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: '',
  generateStaticParams: async () => {
    return [
      { params: { slug: 'admin' } },
      { params: { slug: 'login' } }
    ]
  }
}

export default nextConfig
