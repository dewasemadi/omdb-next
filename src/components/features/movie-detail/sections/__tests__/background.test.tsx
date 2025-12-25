import { render } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import BackgroundSection from "../background"

// Mock next/image
vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, @typescript-eslint/no-unused-vars, jsx-a11y/alt-text
  default: ({ fill, ...props }: any) => <img {...props} />,
}))

describe("BackgroundSection", () => {
  it("should render background image", () => {
    const { container } = render(
      <BackgroundSection
        movie={
          {
            Poster: "https://example.com/poster.jpg",
            Title: "Test Movie",
          } as any
        }
      />
    )
    const img = container.querySelector("img") as HTMLImageElement
    expect(img).toBeDefined()
    expect(img.getAttribute("src")).toBe("https://example.com/poster.jpg")
  })
})
