import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Providers } from "../providers"

describe("Providers", () => {
  it("should render children", () => {
    render(
      <Providers>
        <div data-testid="child">Child</div>
      </Providers>
    )
    expect(screen.getByTestId("child")).toBeDefined()
  })
})
