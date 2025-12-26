import { ENV } from "@/constants/env"
import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${ENV.APP_BASE_URL}/sitemap.xml`,
  }
}
