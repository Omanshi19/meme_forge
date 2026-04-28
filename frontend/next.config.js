/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.imgflip.com" },
      { protocol: "http",  hostname: "localhost" },
    ],
  },
  async rewrites() {
    return [
      {
        // Proxy /api/* calls to FastAPI backend in development
        source:      "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
