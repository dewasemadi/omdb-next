import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import RatingSection from "../rating"

const mockMovie = {
  imdbRating: "8.8",
  imdbVotes: "2,000,000",
  Metascore: "74",
  Ratings: [
    { Source: "Internet Movie Database", Value: "8.8/10" },
    { Source: "Rotten Tomatoes", Value: "87%" },
  ],
}

describe("RatingSection", () => {
  it("should render imdb rating", () => {
    render(<RatingSection movie={mockMovie as any} />)
    expect(screen.getByText("8.8")).toBeDefined()
    expect(screen.getByText(/IMDb Rating/i)).toBeDefined()
  })

  it("should render other ratings", () => {
    render(<RatingSection movie={mockMovie as any} />)
    expect(screen.getByText("74")).toBeDefined()
    expect(screen.getByText(/Metascore/i)).toBeDefined()
  })
})
