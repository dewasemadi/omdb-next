import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import NotFound from "../not-found"

describe("NotFound", () => {
  it("should render 404 page", () => {
    render(<NotFound />)
    expect(screen.getByText("Scene Missing")).toBeDefined()
    expect(screen.getByText("Return Home")).toBeDefined()
  })
})
