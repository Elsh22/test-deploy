/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: false
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.ondigitalocean.app',
        pathname: '/uploads/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PATCH,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Authorization, Content-Type' },
        ],
      },
    ];
  }
};

module.exports = nextConfig;