import { describe, it, expect, vi } from "vitest"
import { useAppDispatch, useAppSelector } from "../hooks"
import { useDispatch, useSelector } from "react-redux"

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}))

describe("Redux Hooks", () => {
  it("useAppDispatch should use useDispatch", () => {
    useAppDispatch()
    expect(useDispatch).toHaveBeenCalled()
  })

  it("useAppSelector should use useSelector", () => {
    const selector = (state: any) => state
    useAppSelector(selector)
    expect(useSelector).toHaveBeenCalledWith(selector)
  })
})
