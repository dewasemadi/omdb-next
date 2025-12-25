import "@testing-library/jest-dom"
import { vi } from "vitest"

// Mock matchMedia
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(), // deprecated
  removeListener: vi.fn(), // deprecated
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
})

// Mock IntersectionObserver
const observe = vi.fn()
const unobserve = vi.fn()
const disconnect = vi.fn()
const takeRecords = vi.fn()

const IntersectionObserverMock = vi.fn(function () {
  return {
    observe,
    unobserve,
    disconnect,
    takeRecords,
  }
})
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock)

// Mock ResizeObserver
const ResizeObserverMock = vi.fn(function () {
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }
})
vi.stubGlobal("ResizeObserver", ResizeObserverMock)

// Mock global scrollTo
window.scrollTo = vi.fn()
