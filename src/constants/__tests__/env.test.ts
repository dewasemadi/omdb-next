import { describe, it, expect, afterEach, vi } from "vitest"

describe("APP_BASE_URL", () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules() // 🔥 WAJIB
  })

  it("should use NEXT_PUBLIC_APP_URL when defined", async () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://example.com")

    const { APP_BASE_URL } = await import("../env")

    expect(APP_BASE_URL).toBe("https://example.com")
  })

  it("should fallback to localhost when env is not defined", async () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", undefined as unknown as string)

    const { APP_BASE_URL } = await import("../env")

    expect(APP_BASE_URL).toBe("http://localhost:3000")
  })
})
