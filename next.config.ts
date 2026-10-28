import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel従量課金対策：画像最適化（Image Optimization）を使わない
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

export default nextConfig;
