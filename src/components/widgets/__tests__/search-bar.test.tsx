import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import SearchBar from "../search-bar"

describe("SearchBar", () => {
  it("should render input with correct value", () => {
    render(
      <SearchBar
        query="Avatar"
        onQueryChange={() => {}}
        onSubmit={() => {}}
        suggestions={[]}
        onSelectSuggestion={() => {}}
        showSuggestions={false}
        setShowSuggestions={() => {}}
        onFocus={() => {}}
      />
    )
    const input = screen.getByDisplayValue("Avatar")
    expect(input).toBeDefined()
  })

  it("should call setSearchQuery on input change", () => {
    const onQueryChange = vi.fn()
    render(
      <SearchBar
        query=""
        onQueryChange={onQueryChange}
        onSubmit={() => {}}
        suggestions={[]}
        onSelectSuggestion={() => {}}
        showSuggestions={false}
        setShowSuggestions={() => {}}
      />
    )
    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "h" } })
    expect(onQueryChange).toHaveBeenCalledWith("h")
  })

  it("should show suggestions when provided", () => {
    const mockSuggestions = [
      {
        Title: "Avatar",
        Year: "2009",
        imdbID: "1",
        Type: "movie",
        Poster: "N/A",
      },
    ]
    render(
      <SearchBar
        query="Ava"
        onQueryChange={() => {}}
        onSubmit={() => {}}
        suggestions={mockSuggestions as any}
        onSelectSuggestion={() => {}}
        showSuggestions={true}
        setShowSuggestions={() => {}}
      />
    )
    expect(screen.getByText("Avatar")).toBeDefined()
  })
})
