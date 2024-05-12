/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 테스트용 bing 이미지
    remotePatterns: [
      { protocol: 'https', hostname: '*.bing.com' },
      { protocol: 'http', hostname: '*.kakaocdn.net' },
      { protocol: 'https', hostname: '*.placeholder.com' },
    ],
  },
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.SERVER_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
