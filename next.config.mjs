/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'raw.githubusercontent.com',
      'static.debank.com',
      'assets.coingecko.com',
      's2.coinmarketcap.com',
      'token-icons.s3.amazonaws.com',
      'etherscan.io',
      '*',
      '**',
    ]
  },
  compiler: {
    styledComponents: true,
  }
};

export default nextConfig;
