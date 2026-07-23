import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This is a frontend-only site with already-compressed local assets.
  // Serving them directly keeps local preview and production independent
  // from Cloudflare's optional ASSETS/IMAGES optimization bindings.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
