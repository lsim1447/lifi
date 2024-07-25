/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Wildcard to match any hostname
      },
      {
        protocol: 'http',
        hostname: '**', // Wildcard to match any hostname
      },
    ]
  },
  compiler: {
    styledComponents: true,
  }
};

export default nextConfig;
