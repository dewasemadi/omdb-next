import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { ApiKeyModal } from "../api-key-modal"
import axios from "axios"

vi.mock("axios")
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}))
vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

// Mock portal
vi.mock("react-dom", () => ({
  ...vi.importActual("react-dom"),
  createPortal: (node: any) => node,
}))

const mockedAxios = vi.mocked(axios, true)

describe("ApiKeyModal", () => {
  beforeEach(() => {
    vi.resetAllMocks()
    mockedAxios.get.mockResolvedValue({ data: { has_key: true } }) // Default: key exists, so modal doesn't open automatically
  })

  it("should open when triggered manually", async () => {
    render(<ApiKeyModal trigger={<button>Open Settings</button>} />)

    const trigger = await screen.findByText("Open Settings")
    fireEvent.click(trigger)

    const title = await screen.findByText(/Set OMDb API Key/i)
    expect(title).toBeDefined()
  })

  it("should auto-open if no key exists", async () => {
    mockedAxios.get.mockResolvedValue({ data: { has_key: false } })

    render(<ApiKeyModal />)

    const title = await screen.findByText(/Set OMDB API Key/i)
    expect(title).toBeDefined()
  })

  it("should submit new key", async () => {
    render(<ApiKeyModal trigger={<button>Open</button>} />)
    fireEvent.click(screen.getByText("Open"))

    const input = await screen.findByPlaceholderText("Enter your API Key...")
    fireEvent.change(input, { target: { value: "secret-key" } })

    mockedAxios.post.mockResolvedValue({ data: { success: true } })

    const saveBtn = screen.getByRole("button", { name: "Save API Key" })
    fireEvent.click(saveBtn)

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith("/api/auth/api-key", {
        api_key: "secret-key",
      })
    })
  })
})
