import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import LoadingSection from "../loading"

describe("LoadingSection", () => {
  it("should render skeletons", () => {
    const { container } = render(<LoadingSection />)
    const skeletons = container.querySelectorAll(".animate-pulse")
    expect(skeletons.length).toBeGreaterThan(0)
  })
})
