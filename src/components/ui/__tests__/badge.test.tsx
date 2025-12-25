import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Badge } from "../badge"

describe("Badge", () => {
  it("should render correctly", () => {
    render(<Badge>Test Badge</Badge>)
    const badge = screen.getByText("Test Badge")
    expect(badge).toBeDefined()
  })

  it("should apply variant classes", () => {
    render(<Badge variant="secondary">Secondary</Badge>)
    const badge = screen.getByText("Secondary")
    expect(badge.className).toContain("bg-zinc-100")
  })
})
