import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import Page from "../page"

vi.mock("@/components/features/home", () => ({
  default: () => <div data-testid="home-page">HomePage</div>,
}))

describe("RootPage", () => {
  it("should render HomePage", () => {
    render(<Page />)
    expect(screen.getByTestId("home-page")).toBeDefined()
  })
})
