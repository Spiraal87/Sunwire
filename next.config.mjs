/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/fb',
        destination:
          'https://www.sunforgedigital.com/?utm_source=facebook&utm_medium=organic_social&utm_campaign=missed_call_calculator_generic',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
