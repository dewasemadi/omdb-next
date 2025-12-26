import type { NextConfig } from "next"

const hosts = process.env.NEXT_PUBLIC_IMAGE_HOSTS?.split(",") ?? []
if (hosts.length === 0) throw new Error("NEXT_PUBLIC_IMAGE_HOSTS is empty")

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: false,
  images: {
    remotePatterns: hosts.map((hostname) => ({
      protocol: "https",
      hostname: hostname.trim(),
    })),
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
}

export default nextConfig
