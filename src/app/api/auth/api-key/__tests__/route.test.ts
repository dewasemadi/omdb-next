import { describe, it, expect, vi, beforeEach } from "vitest"
import { POST, GET } from "../route"
import { NextRequest } from "next/server"

// Mock next/headers
const mockCookieStore = {
  get: vi.fn(),
  set: vi.fn(),
  delete: vi.fn(),
}
vi.mock("next/headers", () => ({
  cookies: () => Promise.resolve(mockCookieStore),
}))

describe("API Key Route", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("POST", () => {
    it("should set api key cookie", async () => {
      const body = { api_key: "secret" }
      const req = new NextRequest("http://localhost/api/auth/api-key", {
        method: "POST",
        body: JSON.stringify(body),
      })

      const res = await POST(req)
      const data = await res.json()

      expect(data.success).toBe(true)
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        expect.stringContaining("omdb_api_key"),
        "secret",
        expect.any(Object)
      )
    })

    it("should return error if no key provided", async () => {
      const body = {}
      const req = new NextRequest("http://localhost/api/auth/api-key", {
        method: "POST",
        body: JSON.stringify(body),
      })

      const res = await POST(req)
      expect(res.status).toBe(400)
    })
  })

  describe("GET", () => {
    it("should return has_key true if cookie exists", async () => {
      mockCookieStore.get.mockReturnValue({ value: "secret" })
      const res = await GET()
      const data = await res.json()
      expect(data.has_key).toBe(true)
      expect(data.api_key).toBe("secret")
    })

    it("should return has_key false if cookie missing", async () => {
      mockCookieStore.get.mockReturnValue(undefined)
      const res = await GET()
      const data = await res.json()
      expect(data.has_key).toBe(false)
    })
  })
})
