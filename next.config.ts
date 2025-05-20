import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    minimumCacheTTL: 150,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "siin8s7han.ufs.sh",
        pathname: "/f/*",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
