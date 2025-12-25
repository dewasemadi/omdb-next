import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Result from "../result"

describe("Result", () => {
  it("should render title and description", () => {
    render(<Result title="Test Title" description="Test Description" />)
    expect(screen.getByText("Test Title")).toBeDefined()
    expect(screen.getByText("Test Description")).toBeDefined()
  })

  it("should render action button if provided", () => {
    render(
      <Result
        title="Title"
        description="Desc"
        action={<button>Action</button>}
      />
    )
    expect(screen.getByText("Action")).toBeDefined()
  })
})
