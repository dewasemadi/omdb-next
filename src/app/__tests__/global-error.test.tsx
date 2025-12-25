import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import GlobalError from "../global-error"

describe("GlobalError", () => {
  it("should render error message and reset button", () => {
    const error = new Error("Test Error")
    const reset = vi.fn()
    console.error = vi.fn() // Suppress errors

    render(<GlobalError error={error} reset={reset} />)

    expect(screen.getByText("Technical Difficulties")).toBeDefined()
    expect(
      screen.getByText(/We encountered an unexpected error/i)
    ).toBeDefined()

    const button = screen.getByText("Try Again")
    fireEvent.click(button)
    expect(reset).toHaveBeenCalled()
  })
})
