/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 테스트용 bing 이미지
    remotePatterns: [{ protocol: 'https', hostname: '*.bing.com' }],
  },
};

export default nextConfig;
