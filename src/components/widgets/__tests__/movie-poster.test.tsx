import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import MoviePoster from "../movie-poster"

// Mock next/image
vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text, @typescript-eslint/no-unused-vars
  default: ({ fill, ...props }: any) => <img {...props} />,
}))

describe("MoviePoster", () => {
  it("should render poster image", () => {
    render(
      <MoviePoster
        src="https://example.com/poster.jpg"
        alt="Test Movie"
        width={300}
        height={450}
      />
    )
    const img = screen.getByRole("img", { name: "Test Movie" })
    expect(img).toBeDefined()
    expect(img.getAttribute("src")).toBe("https://example.com/poster.jpg")
  })

  it("should render fallback when src is N/A", () => {
    render(<MoviePoster src="N/A" alt="Test Movie" width={300} height={450} />)
    const fallback = screen.getByTestId("poster-fallback")
    expect(fallback).toBeDefined()
  })

  it("should render fallback on error", async () => {
    render(
      <MoviePoster
        src="https://example.com/broken.jpg"
        alt="Test Movie"
        width={300}
        height={450}
      />
    )
    const img = screen.getByRole("img")
    fireEvent.error(img)
    const fallback = await screen.findByTestId("poster-fallback")
    expect(fallback).toBeDefined()
  })
})
