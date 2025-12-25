import { describe, it, expect } from "vitest"
import { cn } from "../utils"

describe("cn utility", () => {
  it("should merge class names correctly", () => {
    expect(cn("bg-red-500", "text-white")).toBe("bg-red-500 text-white")
  })

  it("should handle conditional classes", () => {
    const isTrue = true
    const isFalse = false
    expect(
      cn("bg-red-500", isTrue && "text-white", isFalse && "text-black")
    ).toBe("bg-red-500 text-white")
  })

  it("should merge tailwind classes properly (overlap)", () => {
    expect(cn("px-2 py-1", "p-4")).toBe("p-4")
  })
})
