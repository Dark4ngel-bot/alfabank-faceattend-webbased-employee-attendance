import type { NextConfig } from "next";

const distDir = process.env.NEXT_DIST_DIR ?? ".next";

const nextConfig: NextConfig = {
  distDir,
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // Membatasi workspace Next.js ke folder web ini
  outputFileTracingRoot: process.cwd(),

  turbopack: {
    root: process.cwd(),
  },

  allowedDevOrigins: [
    "192.168.10.6",
    "stopwatch-wriggly-pacify.ngrok-free.dev",
  ],
};

export default nextConfig;
