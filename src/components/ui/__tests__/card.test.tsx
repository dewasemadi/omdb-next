import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../card"

describe("Card", () => {
  it("should render all subcomponents correctly", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    )

    expect(screen.getByText("Card Title")).toBeDefined()
    expect(screen.getByText("Card Description")).toBeDefined()
    expect(screen.getByText("Content")).toBeDefined()
    expect(screen.getByText("Footer")).toBeDefined()
  })
})
