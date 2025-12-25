import { describe, it, expect, vi, beforeEach } from "vitest"
import reducer, {
  setSearchQuery,
  resetMovies,
  incrementPage,
  clearAutocomplete,
  resetMovie,
  fetchMovies,
  fetchAutocomplete,
  fetchMovieDetail,
} from "../movie-slice"
import { configureStore } from "@reduxjs/toolkit"
import axios from "axios"

vi.mock("axios")
const mockedAxios = vi.mocked(axios) as any

describe("movie slice", () => {
  const initialState = {
    movies: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: false,
    searchQuery: "",
    autocompletedResults: [],
    cache: {},
    movie: null,
  }

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  it("should handle setSearchQuery", () => {
    const actual = reducer(initialState, setSearchQuery("Avatar"))
    expect(actual.searchQuery).toEqual("Avatar")
  })

  it("should handle resetMovies", () => {
    const modifiedState = {
      ...initialState,
      movies: [{ Title: "Test" } as any],
      page: 2,
      hasMore: true,
      error: "Some error",
    }
    const actual = reducer(modifiedState, resetMovies())
    expect(actual).toEqual(initialState)
  })

  describe("async thunks", () => {
    let store: any

    beforeEach(() => {
      vi.clearAllMocks()
      store = configureStore({
        reducer: { movies: reducer },
      })
    })

    describe("fetchMovies", () => {
      it("should handle fetchMovies.pending", () => {
        store.dispatch(
          fetchMovies.pending("requestId", { query: "test", page: 1 })
        )
        const state = store.getState().movies
        expect(state.loading).toBe(true)
        expect(state.error).toBe(null)
      })

      it("should handle fetchMovies.fulfilled (page 1)", async () => {
        const mockResponse = {
          Search: [{ imdbID: "1", Title: "Movie 1" }],
          totalResults: "10",
          Response: "True",
        }
        mockedAxios.get.mockResolvedValue({ data: mockResponse })

        await store.dispatch(fetchMovies({ query: "test", page: 1 }))
        const state = store.getState().movies

        expect(state.loading).toBe(false)
        expect(state.movies.length).toBe(1)
        expect(state.hasMore).toBe(true)
        expect(state.cache[`search_test_1`]).toBeDefined()
      })

      it("should handle fetchMovies.fulfilled (append page 2)", async () => {
        // Setup initial state with page 1
        const initialStateWithMovies = {
          ...initialState,
          movies: [{ imdbID: "1", Title: "Movie 1" }],
        }
        store = configureStore({
          reducer: { movies: reducer as unknown as any },
          preloadedState: { movies: initialStateWithMovies },
        })

        const mockResponse = {
          Search: [{ imdbID: "2", Title: "Movie 2" }],
          totalResults: "10",
          Response: "True",
        }
        mockedAxios.get.mockResolvedValue({ data: mockResponse })

        await store.dispatch(fetchMovies({ query: "test", page: 2 }))
        const state = store.getState().movies

        expect(state.loading).toBe(false)
        expect(state.movies.length).toBe(2)
        expect(state.cache[`search_test_2`]).toBeDefined()
      })

      it("should return cached data for fetchMovies if available", async () => {
        const cacheKey = `search_test_1`
        const mockData = {
          Search: [{ Title: "Cached Movie" }],
          totalResults: "1",
          Response: "True",
        }
        const preloadedState = {
          movies: {
            ...initialState,
            cache: {
              [cacheKey]: { data: mockData, timestamp: Date.now() },
            },
          },
        }
        store = configureStore({
          reducer: { movies: reducer as unknown as any },
          preloadedState: preloadedState,
        })

        await store.dispatch(fetchMovies({ query: "test", page: 1 }))
        expect(mockedAxios.get).not.toHaveBeenCalled()
        const state = store.getState().movies
        expect(state.movies).toEqual(mockData.Search)
      })

      it("should handle fetchMovies.rejected (page > 1 should not reject but return empty)", async () => {
        mockedAxios.get.mockResolvedValue({
          data: { Response: "False", Error: "Movie not found!" },
        })

        await store.dispatch(fetchMovies({ query: "test", page: 2 }))
        const state = store.getState().movies

        expect(state.loading).toBe(false)
        expect(state.error).toBe(null) // Error cleared
        expect(state.hasMore).toBe(false)
      })

      it("should handle fetchMovies.fulfilled with no Search results (page 1)", async () => {
        mockedAxios.get.mockResolvedValue({
          data: { Response: "True", totalResults: "0" },
        })

        await store.dispatch(fetchMovies({ query: "empty", page: 1 }))
        const state = store.getState().movies
        expect(state.movies).toEqual([])
        expect(state.hasMore).toBe(false)
      })

      it("should handle fetchMovies.rejected", async () => {
        mockedAxios.get.mockResolvedValue({
          data: { Response: "False", Error: "Not Found" },
        })

        await store.dispatch(fetchMovies({ query: "test", page: 1 }))
        const state = store.getState().movies

        expect(state.loading).toBe(false)
        expect(state.error).toBe("Not Found")
      })

      it("should handle 'Too many results' specific error on page 1", async () => {
        mockedAxios.get.mockResolvedValue({
          data: { Response: "False", Error: "Too many results." },
        })

        await store.dispatch(fetchMovies({ query: "a", page: 1 }))
        const state = store.getState().movies

        expect(state.error).toContain("Please enter more characters")
      })
    })

    describe("Reducers", () => {
      it("should handle incrementPage", () => {
        const state = reducer(initialState, incrementPage())
        expect(state.page).toBe(2)
      })

      it("should handle clearAutocomplete", () => {
        const modifiedState = {
          ...initialState,
          autocompletedResults: [{ Title: "T" } as any],
        }
        const state = reducer(modifiedState, clearAutocomplete())
        expect(state.autocompletedResults).toEqual([])
      })

      it("should handle resetMovie", () => {
        const modifiedState = {
          ...initialState,
          movie: { Title: "T" } as any,
          error: "E",
        }
        const state = reducer(modifiedState, resetMovie())
        expect(state.movie).toBeNull()
        expect(state.error).toBeNull()
      })
    })

    describe("fetchAutocomplete", () => {
      it("should return cached data if available", async () => {
        const cacheKey = `autocomplete_test`
        const mockData = [{ Title: "Cached" }]
        const preloadedState = {
          movies: {
            ...initialState,
            cache: {
              [cacheKey]: { data: mockData, timestamp: Date.now() },
            },
          },
        }
        store = configureStore({
          reducer: { movies: reducer as unknown as any },
          preloadedState: preloadedState,
        })

        await store.dispatch(fetchAutocomplete({ query: "test" }))
        expect(mockedAxios.get).not.toHaveBeenCalled() // axios should NOT be called

        const state = store.getState().movies
        expect(state.autocompletedResults).toEqual(mockData)
      })

      it("should fetch from API if not cached", async () => {
        mockedAxios.get.mockResolvedValue({
          data: { Search: [{ Title: "New" }], Response: "True" },
        })

        await store.dispatch(fetchAutocomplete({ query: "new" }))
        const state = store.getState().movies

        expect(state.autocompletedResults).toHaveLength(1)
        expect(state.cache[`autocomplete_new`]).toBeDefined()
      })

      it("should handle empty response", async () => {
        mockedAxios.get.mockResolvedValue({
          data: { Response: "False", Error: "Not Found" },
        })

        await store.dispatch(fetchAutocomplete({ query: "unknown" }))
        const state = store.getState().movies
        expect(state.autocompletedResults).toEqual([])
      })
    })

    describe("fetchMovieDetail", () => {
      it("should fetch movie detail", async () => {
        const mockDetail = { Title: "Detail", imdbID: "tt1" }
        mockedAxios.get.mockResolvedValue({ data: mockDetail })

        await store.dispatch(fetchMovieDetail("tt1"))
        const state = store.getState().movies

        expect(state.loading).toBe(false)
        expect(state.movie).toEqual(mockDetail)
        expect(state.cache[`movie_tt1`]).toBeDefined()
      })

      it("should handle error", async () => {
        mockedAxios.get.mockResolvedValue({
          data: { Response: "False", Error: "Error" },
        })

        await store.dispatch(fetchMovieDetail("tt1"))
        const state = store.getState().movies

        expect(state.error).toBe("Error")
      })
    })
  })
})
