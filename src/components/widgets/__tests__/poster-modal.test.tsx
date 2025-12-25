import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import PosterModal from "../poster-modal"

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text, @typescript-eslint/no-unused-vars
  default: ({ fill, ...props }: any) => <img {...props} />,
}))

// Mock IntersectionObserver
const observe = vi.fn()
const unobserve = vi.fn()
const disconnect = vi.fn()
const takeRecords = vi.fn()
const IntersectionObserverMock = vi.fn(() => ({
  observe,
  unobserve,
  disconnect,
  takeRecords,
}))
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock)

describe("PosterModal", () => {
  it("should render when posterUrl is provided", () => {
    render(
      <PosterModal
        posterUrl="https://example.com/poster.jpg"
        onClose={() => {}}
      />
    )

    const img = screen.getByRole("img", { name: /poster/i })
    expect(img).toBeDefined()
  })

  it("should not render when posterUrl is null", () => {
    const { container } = render(
      <PosterModal posterUrl={null} onClose={() => {}} />
    )
    expect(container.firstChild).toBeNull()
  })

  it("should call onClose when clicking close button", () => {
    const handleClose = vi.fn()
    render(
      <PosterModal
        posterUrl="https://example.com/poster.jpg"
        onClose={handleClose}
      />
    )
    const button = screen.getAllByRole("button")[0] // The X button
    fireEvent.click(button)
    expect(handleClose).toHaveBeenCalled()
  })
})
