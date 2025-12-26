import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import MovieListSection from "../movie-list"
import * as hooks from "@/stores/hooks"

// Mock dependencies
vi.mock("@/stores/hooks", () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: vi.fn(),
}))

const { mockPush } = vi.hoisted(() => ({
  mockPush: vi.fn(),
}))

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("q=Batman+v+Superman"),
}))

// Mock nextjs-toploader
vi.mock("nextjs-toploader/app", () => ({
  useRouter: () => ({ push: mockPush }),
}))

// Mock MovieList widget
vi.mock("@/components/widgets/movie-list", () => ({
  default: (props: any) => (
    <div data-testid="movie-list">
      <button data-testid="load-more" onClick={props.onLoadMore}>
        Load More
      </button>
      <button
        data-testid="movie-click"
        onClick={() => props.onMovieClick("tt123")}
      >
        Movie Click
      </button>
    </div>
  ),
}))

describe("MovieListSection", () => {
  const mockDispatch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(hooks, "useAppDispatch").mockReturnValue(mockDispatch)
  })

  it("should render movie list widget", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue({
      movies: [],
      loading: false,
      hasMore: false,
      error: null,
      searchQuery: "",
      page: 1,
    })

    render(<MovieListSection onPosterClick={vi.fn()} />)
    expect(screen.getByTestId("movie-list")).toBeDefined()
  })

  it("should dispatch load more", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue({
      movies: [],
      loading: false,
      hasMore: true,
      error: null,
      searchQuery: "test",
      page: 1,
    })

    render(<MovieListSection onPosterClick={vi.fn()} />)
    fireEvent.click(screen.getByTestId("load-more"))

    // It should dispatch incrementPage and fetchMovies
    expect(mockDispatch).toHaveBeenCalledTimes(2)
  })

  it("should navigate on movie click", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue({
      movies: [],
      loading: false,
      hasMore: false,
    })

    render(<MovieListSection onPosterClick={vi.fn()} />)
    fireEvent.click(screen.getByTestId("movie-click"))

    expect(mockPush).toHaveBeenCalledWith("/movie/tt123?q=Batman+v+Superman")
  })
})
