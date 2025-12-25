import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import MovieDetailPage from "../index"
import * as hooks from "@/stores/hooks"

// Mock Redux hooks
vi.mock("@/stores/hooks", () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: vi.fn(() => ({})),
}))

// Mock Subsections (simplified)
vi.mock("../sections/hero", () => ({ default: () => <div>Hero Section</div> }))
vi.mock("../sections/info", () => ({ default: () => <div>Info Section</div> }))
vi.mock("../sections/rating", () => ({
  default: () => <div>Rating Section</div>,
}))
vi.mock("../sections/background", () => ({
  default: () => <div>Background Section</div>,
}))
vi.mock("../sections/loading", () => ({ default: () => <div>Loading...</div> }))

describe("MovieDetailPage", () => {
  it("should render loading state", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue({
      movie: null,
      loading: true,
      error: null,
    })

    render(<MovieDetailPage id="tt1234567" />)
    expect(screen.getByText("Loading...")).toBeDefined()
  })

  it("should render error state", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue({
      movie: null,
      loading: false,
      error: "Movie not found",
    })

    render(<MovieDetailPage id="tt1234567" />)
    expect(screen.getByText(/Movie not found/i)).toBeDefined()
  })

  it("should render movie details", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue({
      movie: { Title: "Avengers", Year: "2012" }, // Partial mock
      loading: false,
      error: null,
    })

    render(<MovieDetailPage id="tt1234567" />)
    expect(screen.getByText("Hero Section")).toBeDefined()
    expect(screen.getByText("Info Section")).toBeDefined()
  })
})
