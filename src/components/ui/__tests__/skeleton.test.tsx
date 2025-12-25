import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Skeleton } from "../skeleton"

describe("Skeleton", () => {
  it("should render correctly", () => {
    render(<Skeleton className="w-20 h-20" data-testid="skeleton" />)
    const skeleton = screen.getByTestId("skeleton")
    expect(skeleton).toBeDefined()
    expect(skeleton.className).toContain("animate-pulse")
  })
})
