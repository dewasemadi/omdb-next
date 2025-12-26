import { describe, it, expect, afterEach, vi } from "vitest"

describe("ENV Constants", () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  describe("APP_BASE_URL", () => {
    it("should use NEXT_PUBLIC_APP_URL when defined", async () => {
      vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://example.com")
      const { ENV } = await import("../env")
      expect(ENV.APP_BASE_URL).toBe("https://example.com")
    })

    it("should fallback to localhost when env is not defined", async () => {
      vi.stubEnv("NEXT_PUBLIC_APP_URL", undefined as unknown as string)
      const { ENV } = await import("../env")
      expect(ENV.APP_BASE_URL).toBe("http://localhost:3000")
    })
  })

  describe("IMAGE_HOSTS", () => {
    it("should parse comma-separated strings", async () => {
      vi.stubEnv("NEXT_PUBLIC_IMAGE_HOSTS", "a.com,b.com")
      const { ENV } = await import("../env")
      expect(ENV.IMAGE_HOSTS).toEqual(["a.com", "b.com"])
    })

    it("should fallback to empty array if undefined", async () => {
      vi.stubEnv("NEXT_PUBLIC_IMAGE_HOSTS", undefined as unknown as string)
      const { ENV } = await import("../env")
      expect(ENV.IMAGE_HOSTS).toEqual([])
    })
  })
})
