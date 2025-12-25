import { describe, it, expect } from "vitest"
import { UNAVAILABLE } from "../common"

describe("UNAVAILABLE constant", () => {
  it("should be equal to 'N/A'", () => {
    expect(UNAVAILABLE).toBe("N/A")
  })
})
