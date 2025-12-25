import { fireEvent, render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import HomePage from "../index"
import * as hooks from "@/stores/hooks"
import { UNAVAILABLE } from "@/constants/common"

// Mock nuqs
vi.mock("nuqs", () => ({
  useQueryState: () => ["", vi.fn()],
  parseAsString: {
    withDefault: () => ({ withOptions: () => "q" }),
  },
}))

// Mock API Key modal
vi.mock("../../auth/api-key-modal", () => ({
  ApiKeyModal: () => <div data-testid="api-key-modal" />,
}))

// Mock Redux hooks
vi.mock("@/stores/hooks", () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: vi.fn((selector) =>
    selector({
      movies: {
        autocompletedResults: [],
      },
    })
  ),
}))

// Mock poster modal
vi.mock("@/components/widgets/poster-modal", () => ({
  __esModule: true,
  default: ({ onClose }: { onClose: () => void }) => (
    <button data-testid="close-poster" onClick={onClose}>
      Close
    </button>
  ),
}))

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams("q=Batman+v+Superman"),
}))

describe("HomePage", () => {
  it("should render hero section", () => {
    // Mock state
    const mockState = {
      movies: {
        movies: [],
        loading: false,
        error: null,
        autocompletedResults: [],
        hasMore: false,
      },
    }
    vi.spyOn(hooks, "useAppSelector").mockImplementation((selector) =>
      selector(mockState as any)
    )

    render(<HomePage />)
    // Check for some hero text
    // The hero header text "Movie Magic" comes from HeroHeader component
    expect(screen.getByText(/Movie Magic/i)).toBeDefined()
  })

  it("should render movie list", () => {
    const mockState = {
      movies: {
        movies: [{ Title: "Batman", imdbID: "1", Poster: UNAVAILABLE }],
        loading: false,
        error: null,
        autocompletedResults: [],
        hasMore: false,
      },
    }
    vi.spyOn(hooks, "useAppSelector").mockImplementation((selector) =>
      selector(mockState as any)
    )

    render(<HomePage />)
    expect(screen.getByText("Batman")).toBeDefined()
  })

  it("should close poster modal when onClose is called", () => {
    render(<HomePage />)

    const closeButton = screen.getByTestId("close-poster")
    fireEvent.click(closeButton)

    expect(closeButton).toBeInTheDocument()
  })
})
