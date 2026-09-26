import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
  },
  headers: async () => [
    {
      source: "/models/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=86400, must-revalidate",
        },
      ],
    },
    {
      source: "/media/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=86400, must-revalidate",
        },
      ],
    },
  ],
};

export default nextConfig;
