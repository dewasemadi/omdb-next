import { renderHook, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { useOnClickOutside } from "../use-on-click-outside"

describe("useOnClickOutside", () => {
  it("should call handler when clicking outside", () => {
    const handler = vi.fn()
    const ref = { current: document.createElement("div") }
    document.body.appendChild(ref.current)

    renderHook(() => useOnClickOutside(ref, handler))

    fireEvent.mouseDown(document.body)
    expect(handler).toHaveBeenCalledTimes(1)

    document.body.removeChild(ref.current)
  })

  it("should NOT call handler when clicking inside", () => {
    const handler = vi.fn()
    const ref = { current: document.createElement("div") }
    document.body.appendChild(ref.current)

    renderHook(() => useOnClickOutside(ref, handler))

    fireEvent.mouseDown(ref.current)
    expect(handler).not.toHaveBeenCalled()

    document.body.removeChild(ref.current)
  })

  it("should do nothing if ref is null", () => {
    const handler = vi.fn()
    const ref = { current: null }

    renderHook(() => useOnClickOutside(ref, handler))

    fireEvent.mouseDown(document.body)

    expect(handler).not.toHaveBeenCalled()
  })
})
