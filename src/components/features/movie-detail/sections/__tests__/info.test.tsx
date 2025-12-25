import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import InfoSection from "../info"

// Mock MovieDetail object
const mockMovie = {
  Title: "Inception",
  Year: "2010",
  Rated: "PG-13",
  Released: "16 Jul 2010",
  Runtime: "148 min",
  Genre: "Action, Adventure, Sci-Fi",
  Director: "Christopher Nolan",
  Writer: "Christopher Nolan",
  Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
  Plot: "A thief who steals corporate secrets through the use of dream-sharing technology...",
  Language: "English, Japanese, French",
  Country: "USA, UK",
  Awards: "Won 4 Oscars. Another 153 wins & 204 nominations.",
  Poster: `https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg`,
  Ratings: [{ Source: "Internet Movie Database", Value: "8.8/10" }],
  Metascore: "74",
  imdbRating: "8.8",
  imdbVotes: "2,000,000",
  imdbID: "tt1375666",
  Type: "movie",
  DVD: "N/A",
  BoxOffice: "$292,576,195",
  Production: "N/A",
  Website: "N/A",
  Response: "True",
}

describe("InfoSection", () => {
  it("should render movie title and plot", () => {
    render(<InfoSection movie={mockMovie} />)
    expect(screen.getByText("Inception")).toBeDefined()
    expect(screen.getByText(/A thief who steals/i)).toBeDefined()
  })

  it("should render cast and crew", () => {
    render(<InfoSection movie={mockMovie} />)
    expect(screen.getAllByText("Christopher Nolan")[0]).toBeDefined()
    expect(screen.getByText(/Leonardo DiCaprio/i)).toBeDefined()
  })
})
