import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://sproutlab.it https://*.sproutlab.it",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
