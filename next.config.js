/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 환경 변수 설정 - Railway에서 확실한 작동을 위해 하드코딩
  env: {
    NEXT_PUBLIC_API_URL: 'https://plango-api-production.up.railway.app/api/v1',
  },
}

module.exports = nextConfig 