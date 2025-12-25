import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import SearchSection from "../search"
import * as hooks from "@/stores/hooks"

const { mockSetQ } = vi.hoisted(() => ({
  mockSetQ: vi.fn(),
}))

// Mock dependencies
vi.mock("@/stores/hooks", () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: vi.fn(),
}))

vi.mock("nuqs", () => ({
  useQueryState: () => ["", mockSetQ],
  parseAsString: {
    withDefault: () => ({ withOptions: () => "q" }),
  },
}))

vi.mock("@/components/widgets/search-bar", () => ({
  default: (props: any) => {
    return (
      <div data-testid="search-bar">
        <input
          data-testid="search-input"
          value={props.query}
          onChange={(e) => props.onQueryChange(e.target.value)}
          onFocus={props.onFocus}
        />
        <button data-testid="submit-btn" onClick={props.onSubmit}>
          Submit
        </button>
        <button
          data-testid="select-btn"
          onClick={() => props.onSelectSuggestion("Batman")}
        >
          Select
        </button>
        <button data-testid="clear-btn" onClick={props.onClear}>
          Clear
        </button>
        {props.showSuggestions && (
          <div data-testid="suggestions-visible">Suggestions Open</div>
        )}
      </div>
    )
  },
}))

describe("SearchSection", () => {
  const mockDispatch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(hooks, "useAppDispatch").mockReturnValue(mockDispatch)
  })

  it("should render search bar", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue([])
    render(<SearchSection />)
  })

  it("should handle interactions", async () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue([
      { Title: "Batman", imdbID: "1" },
    ])
    render(<SearchSection />)

    const input = screen.getByTestId("search-input")

    // Type in search bar
    fireEvent.change(input, { target: { value: "Bat" } })
    expect(input).toHaveValue("Bat")

    // Submit
    fireEvent.click(screen.getByTestId("submit-btn"))
    expect(mockSetQ).toHaveBeenCalledWith("Bat")

    // Clear
    fireEvent.click(screen.getByTestId("clear-btn"))
    expect(input).toHaveValue("")
    expect(mockSetQ).toHaveBeenCalledWith(null)

    // Select suggestion
    fireEvent.click(screen.getByTestId("select-btn"))
    expect(mockSetQ).toHaveBeenCalledWith("Batman")
  })

  it("should show suggestions on focus if valid", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue([
      { Title: "Batman", imdbID: "1" },
    ])
    render(<SearchSection />)

    const input = screen.getByTestId("search-input")
    fireEvent.change(input, { target: { value: "Bat" } }) // Length >= 3
    fireEvent.focus(input)

    // We expect suggestions to be open
    expect(screen.getByTestId("suggestions-visible")).toBeDefined()
  })
})
