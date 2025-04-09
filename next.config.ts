import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yoliday-backend-hm1v.onrender.com",
        port: "",
        pathname: "/upload/**", // Adjust this if the image path is different
      },
    ],
  },
};

export default nextConfig;
