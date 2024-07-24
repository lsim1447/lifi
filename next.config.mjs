/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'raw.githubusercontent.com',
      },
      {
        hostname: 'static.debank.com',
      },
      {
        hostname: 'assets.coingecko.com',
      },
      {
        hostname: 's2.coinmarketcap.com',
      },
      {
        hostname: 'token-icons.s3.amazonaws.com',
      },
      {
        hostname: 'etherscan.io',
      },
      {
        hostname: 'fakeimg.pl',
      },
    ]
  },
  compiler: {
    styledComponents: true,
  }
};

export default nextConfig;
