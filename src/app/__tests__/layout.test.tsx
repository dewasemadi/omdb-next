import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import RootLayout, { metadata } from "../layout"

// Mock next/font/google
vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "geist-sans-class" }),
  Geist_Mono: () => ({ variable: "geist-mono-class" }),
}))

// Mock sonner
vi.mock("sonner", () => ({
  Toaster: () => <div data-testid="toaster" />,
}))

// Mock Providers
vi.mock("../providers", () => ({
  Providers: ({ children }: any) => (
    <div data-testid="providers">{children}</div>
  ),
}))

// Mock NuqsAdapter
vi.mock("nuqs/adapters/next/app", () => ({
  NuqsAdapter: ({ children }: any) => <div data-testid="nuqs">{children}</div>,
}))

describe("RootLayout", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://example.com")
  })

  it("should render children with providers", () => {
    render(
      <RootLayout>
        <div data-testid="child">Child</div>
      </RootLayout>
    )

    expect(screen.getByTestId("child")).toBeDefined()
    expect(screen.getByTestId("providers")).toBeDefined()
    expect(screen.getByTestId("nuqs")).toBeDefined()
    expect(screen.getByTestId("toaster")).toBeDefined()
  })

  it("should have correct metadata", () => {
    expect(metadata.title).toEqual({
      template: "%s | OMDb Search",
      default: "OMDb Movie Search",
    })
    expect(metadata.description).toBe(
      "Search for your favorite movies using the OMDb API."
    )
  })
})
