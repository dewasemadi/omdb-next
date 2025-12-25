import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import Page, { generateMetadata } from "../page"

vi.mock("@/components/features/movie-detail", () => ({
  default: ({ id }: { id: string }) => (
    <div data-testid="movie-detail-page">MovieDetailPage: {id}</div>
  ),
}))

describe("MovieDetailPage", () => {
  it("should render MovieDetailPage with correct id", async () => {
    const params = Promise.resolve({ id: "tt123" })
    const result = await Page({ params })
    render(result)
    expect(screen.getByTestId("movie-detail-page")).toBeDefined()
    expect(screen.getByText("MovieDetailPage: tt123")).toBeDefined()
  })

  it("should generate metadata", async () => {
    const params = Promise.resolve({ id: "tt123" })
    const metadata = await generateMetadata({ params })
    expect(metadata.title).toContain("tt123")
  })
})
