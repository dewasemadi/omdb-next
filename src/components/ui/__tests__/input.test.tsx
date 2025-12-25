import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { Input } from "../input"

describe("Input", () => {
  it("should render correctly", () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText("Enter text")
    expect(input).toBeDefined()
  })

  it("should handle onChange events", () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    const input = screen.getByRole("textbox")
    fireEvent.input(input, { target: { value: "test" } })
    expect(handleChange).toHaveBeenCalled()
  })
})
