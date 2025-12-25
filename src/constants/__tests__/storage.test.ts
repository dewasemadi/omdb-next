import { describe, it, expect } from "vitest"
import { COOKIES } from "../storage"

describe("Constants: keys", () => {
  it("should have correct cookie keys", () => {
    expect(COOKIES.OMDB_API_KEY).toBe("omdb_api_key")
  })
})
