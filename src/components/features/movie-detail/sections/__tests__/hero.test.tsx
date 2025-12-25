import { render } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import HeroSection from "../hero"

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}))

vi.mock("@/components/widgets/movie-poster", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: () => <img data-testid="movie-poster" alt="poster" />,
}))

const mockMovie = {
  Title: "Inception",
  Poster: "url",
}

describe("HeroSection", () => {
  it("should render back link", () => {
    const { getByText } = render(<HeroSection movie={mockMovie as any} />)
    expect(getByText(/Back/i)).toBeDefined()
  })

  it("should render poster", () => {
    const { getByTestId } = render(<HeroSection movie={mockMovie as any} />)
    expect(getByTestId("movie-poster")).toBeDefined()
  })
})
