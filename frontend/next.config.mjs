/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 테스트용 bing 이미지
    remotePatterns: [{ protocol: 'https', hostname: '*.bing.com' }, { protocol: 'http', hostname: '*.kakaocdn.net' }],
  },
  output: "standalone",
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${process.env.SERVER_URL}/:path*`,
      }
    ]
  }
};

export default nextConfig;
