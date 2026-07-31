import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@cosmic-gateway/contracts", "@cosmic-gateway/database"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.esawebb.org",
      },
      {
        protocol: "https",
        hostname: "esawebb.org",
      },
      {
        protocol: "https",
        hostname: "cdn.eso.org",
      },
      {
        protocol: "https",
        hostname: "www.eso.org",
      },
      {
        protocol: "https",
        hostname: "images-assets.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "www.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "assets.science.nasa.gov",
      },
    ],
  },
};

export default nextConfig;
