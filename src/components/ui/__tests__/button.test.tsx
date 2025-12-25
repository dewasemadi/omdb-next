import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Button } from "../button"

describe("Button", () => {
  it("should render correctly", () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole("button", { name: /click me/i })
    expect(button).toBeDefined()
  })

  it("should render as child if asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    const link = screen.getByRole("link", { name: /link button/i })
    expect(link).toBeDefined()
  })
})
