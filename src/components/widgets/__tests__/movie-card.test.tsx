import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import MovieCard from "../movie-card"

// Mock next/image
vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text, @typescript-eslint/no-unused-vars
  default: ({ fill, ...props }: any) => <img {...props} />,
}))

describe("MovieCard", () => {
  const mockMovie = {
    Title: "Inception",
    Year: "2010",
    imdbID: "tt1375666",
    Type: "movie",
    Poster: "https://example.com/poster.jpg",
  }

  it("should render movie details", () => {
    render(
      <MovieCard movie={mockMovie} onPosterClick={vi.fn()} onClick={vi.fn()} />
    )
    expect(screen.getByText("Inception")).toBeDefined()
    expect(screen.getByText("2010")).toBeDefined()
  })

  it("should interact with clicks", () => {
    const onPosterClick = vi.fn()
    const onClick = vi.fn()

    render(
      <MovieCard
        movie={mockMovie}
        onPosterClick={onPosterClick}
        onClick={onClick}
      />
    )

    // Clicking the card content part (Title is inside CardContent)
    const title = screen.getByText("Inception")
    fireEvent.click(title)
    expect(onClick).toHaveBeenCalled()

    // Clicking the poster
    // Since we mocked next/image as <img>, we can find it by alt text
    const poster = screen.getByAltText("Inception")
    fireEvent.click(poster)
    expect(onPosterClick).toHaveBeenCalledWith("https://example.com/poster.jpg")
  })

  it("should have accessible buttons", () => {
    render(
      <MovieCard movie={mockMovie} onPosterClick={vi.fn()} onClick={vi.fn()} />
    )
    expect(
      screen.getByRole("button", { name: /View poster for Inception/i })
    ).toBeDefined()
    expect(
      screen.getByRole("button", { name: /View details for Inception/i })
    ).toBeDefined()
  })
})
