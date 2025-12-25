import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import HeroHeader from "../hero-header"

// Mock ApiKeyModal
vi.mock("../../../auth/api-key-modal", () => ({
  ApiKeyModal: () => <div data-testid="settings-trigger" />,
}))

describe("HeroHeader", () => {
  it("should render title and subtitle", () => {
    render(<HeroHeader />)
    expect(screen.getByText("Movie Magic")).toBeDefined()
    expect(screen.getByText(/Discover your next favorite film/i)).toBeDefined()
  })
})
