import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
  },
  env: {
    GITHUB_APP_CLIENT_ID: "Iv23lib3vrpdZ73bJNb2",
    GITHUB_APP_CLIENT_SECRET: "9776cac90bfc28aec859c4b8162ad7192f06fb50",
    NEXTAUTH_SECRET: "Dm6C/yro4tkKTwYha9ej7kxCA8ds3FpsQNkFU3GcyGs=",
  },
};

export default nextConfig;
