import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@cosmic-gateway/contracts", "@cosmic-gateway/database"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stsci-opo.org",
      },
      {
        protocol: "https",
        hostname: "**.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "assets.science.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "www.nasa.gov",
      },
    ],
  },
};

export default nextConfig;
