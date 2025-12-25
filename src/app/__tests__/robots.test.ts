import { describe, it, expect, beforeEach, vi } from "vitest"

describe("robots", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://example.com")
  })

  it("should return robots config", async () => {
    const { default: robots } = await import("../robots")
    const config = robots()
    expect(config).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: "/private/",
      },
      sitemap: "https://example.com/sitemap.xml",
    })
  })
})
