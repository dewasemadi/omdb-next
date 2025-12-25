import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }, // allow all https
      { protocol: "http", hostname: "**" }, // allow all http
    ],
  },
}

export default nextConfig
