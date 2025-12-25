import { describe, it, expect, vi, beforeEach } from "vitest"
import { GET } from "../route"
import { NextRequest } from "next/server"
import axios from "axios"

// Mock next/headers
const mockCookieStore = {
  get: vi.fn(),
}
vi.mock("next/headers", () => ({
  cookies: () => Promise.resolve(mockCookieStore),
}))

// Mock axios
vi.mock("axios")
const mockedAxios = vi.mocked(axios) as any

describe("OMDB API Route", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubEnv("OMDB_API_URL", "https://omdbapi.com/")
  })

  it("should return error if OMDB_API_URL is missing", async () => {
    vi.stubEnv("OMDB_API_URL", "")
    const req = new NextRequest("http://localhost/api/omdb?s=test")
    const res = await GET(req)
    expect(res.status).toBe(500)
    const data = await res.json()
    expect(data.Error).toMatch(/configuration error/)
  })

  it("should return error if API Key is missing", async () => {
    mockCookieStore.get.mockReturnValue(undefined)
    const req = new NextRequest("http://localhost/api/omdb?s=test")
    const res = await GET(req)
    expect(res.status).toBe(401)
  })

  it("should make request to OMDB", async () => {
    mockCookieStore.get.mockReturnValue({ value: "secret" })
    mockedAxios.get.mockResolvedValue({ data: { Search: [] } })

    const req = new NextRequest("http://localhost/api/omdb?s=test")
    const res = await GET(req)

    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data).toEqual({ Search: [] })
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("apikey=secret")
    )
  })

  it("should handle OMDB errors", async () => {
    mockCookieStore.get.mockReturnValue({ value: "secret" })
    mockedAxios.get.mockRejectedValue({
      response: { status: 404, data: { Error: "Not Found" } },
    })

    const req = new NextRequest("http://localhost/api/omdb?s=test")
    const res = await GET(req)
    expect(res.status).toBe(404)
    const data = await res.json()
    expect(data.Error).toBe("Not Found")
  })
})
