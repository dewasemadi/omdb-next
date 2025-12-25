import { render, screen, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import MovieList from "../movie-list"

// Mock next/image
vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text, @typescript-eslint/no-unused-vars
  default: ({ fill, ...props }: any) => <img {...props} />,
}))

// Mock IntersectionObserver
const observe = vi.fn()
const unobserve = vi.fn()
const disconnect = vi.fn()
const takeRecords = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn(function () {
      return {
        observe,
        unobserve,
        disconnect,
        takeRecords,
      }
    })
  )
})

describe("MovieList", () => {
  const defaultProps = {
    movies: [],
    loading: false,
    hasMore: false,
    onPosterClick: vi.fn(),
    onMovieClick: vi.fn(),
    onLoadMore: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render welcome message when no search query and no movies", () => {
    render(<MovieList {...defaultProps} />)
    expect(screen.getByText(/Ready to watch?/i)).toBeDefined()
  })

  it("should render movies when provided", () => {
    const movies = [
      {
        Title: "Inception",
        Year: "2010",
        imdbID: "1",
        Type: "movie",
        Poster: "N/A",
      },
    ]
    render(<MovieList {...defaultProps} movies={movies} />)
    expect(screen.getByText("Inception")).toBeDefined()
  })

  it("should render 'No movies found' when search query exists but no movies", () => {
    render(<MovieList {...defaultProps} searchQuery="Unknown" />)
    expect(screen.getByText(/No movies found for/i)).toBeDefined()
  })

  it("should render loading skeletons", () => {
    const { container } = render(<MovieList {...defaultProps} loading={true} />)
    const skeletons = container.querySelectorAll(".animate-pulse")
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it("should observe intersection target", async () => {
    const movies = [
      {
        Title: "Test",
        Year: "2023",
        imdbID: "123",
        Type: "movie",
        Poster: "N/A",
      },
    ]
    render(<MovieList {...defaultProps} movies={movies} hasMore={true} />)
    await waitFor(() => {
      expect(observe).toHaveBeenCalled()
    })
  })
})
