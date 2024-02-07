/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
      },
      webpack: (config) => {
        config.externals = [...config.externals, 'bcrypt'];
        return config;
      }
};

module.exports = nextConfig