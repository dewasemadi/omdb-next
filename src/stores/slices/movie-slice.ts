import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../index"

// Types
export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface MovieDetail {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: MovieRating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

interface MovieRating {
  Source: string
  Value: string
}

interface SearchResponse {
  Search: Movie[]
  totalResults: string
  Response: "True" | "False"
  Error?: string
}

interface CacheEntry<T> {
  data: T
  timestamp: number
}

interface MovieState {
  movies: Movie[]
  loading: boolean
  error: string | null
  page: number
  hasMore: boolean
  searchQuery: string
  autocompletedResults: Movie[]
  cache: Record<string, CacheEntry<unknown>>
  movie: MovieDetail | null
}

const initialState: MovieState = {
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

// Caching Constants
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// Custom Error
export class OmdbError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "OmdbError"
  }
}

// Error Helper
const resolveError = (error: unknown): string => {
  if (error instanceof OmdbError) {
    return error.message
  }

  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data?.Error
    if (apiError) return apiError
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return "An unexpected error occurred"
}

const queryOmdb = async <T>({
  apiParams,
  cacheKey,
  getState,
}: {
  apiParams: Record<string, string | number>
  cacheKey?: string | null
  getState: () => unknown
}): Promise<T> => {
  if (cacheKey) {
    const state = getState() as RootState
    const cached = state.movies.cache[cacheKey]

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data as T
    }
  }

  const response = await axios.get("/api/omdb", { params: apiParams })

  if (response.data.Response === "False") {
    throw new OmdbError(response.data.Error || "API Error")
  }

  return response.data as T
}

// Async Thunks
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (
    { query, page }: { query: string; page: number },
    { rejectWithValue, getState }
  ) => {
    try {
      const data = await queryOmdb<SearchResponse>({
        apiParams: { s: query, page, type: "movie" },
        cacheKey: `search_${query}_${page}`,
        getState,
      })
      return data
    } catch (err: unknown) {
      const msg = resolveError(err)
      if (page === 1 && msg === "Too many results.") {
        return rejectWithValue(
          "Too many results. Please enter more characters."
        )
      }
      if (page > 1) {
        return { Search: [], totalResults: "0", Response: "True" }
      }
      return rejectWithValue(msg)
    }
  }
)

export const fetchAutocomplete = createAsyncThunk(
  "movies/fetchAutocomplete",
  async ({ query }: { query: string }, { getState }) => {
    if (!query || query.length < 3) return []

    // Manually check cache because type differs from API response
    const state = getState() as RootState
    const cacheKey = `autocomplete_${query}`
    const cached = state.movies.cache[cacheKey]
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data as Movie[]
    }

    try {
      const data = await queryOmdb<SearchResponse>({
        apiParams: { s: query, page: 1, type: "movie" },
        cacheKey: null,
        getState,
      })
      return data.Search.slice(0, 5)
    } catch {
      return []
    }
  }
)

export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      return await queryOmdb<MovieDetail>({
        apiParams: { i: id, plot: "full" },
        cacheKey: `movie_${id}`,
        getState,
      })
    } catch (err: unknown) {
      const msg = resolveError(err)
      return rejectWithValue(msg)
    }
  }
)

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    resetMovies: (state) => {
      state.movies = []
      state.page = 1
      state.hasMore = false
      state.error = null
    },
    incrementPage: (state) => {
      state.page += 1
    },
    clearAutocomplete: (state) => {
      state.autocompletedResults = []
    },
    resetMovie: (state) => {
      state.movie = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false
        const response = action.payload

        // Save to cache
        const cacheKey = `search_${action.meta.arg.query}_${action.meta.arg.page}`
        state.cache[cacheKey] = {
          data: response,
          timestamp: Date.now(),
        }

        if (response.Search) {
          const requestPage = action.meta.arg.page

          if (requestPage === 1) {
            state.movies = response.Search
          } else {
            // Append only unique movies
            const newMovies = response.Search.filter(
              (m: Movie) =>
                !state.movies.find((existing) => existing.imdbID === m.imdbID)
            )
            state.movies = [...state.movies, ...newMovies]
          }

          const total = parseInt(response.totalResults || "0")
          state.hasMore = state.movies.length < total
        } else {
          if (action.meta.arg.page === 1) state.movies = []
          state.hasMore = false
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchAutocomplete.fulfilled, (state, action) => {
        state.autocompletedResults = action.payload

        // Save to cache
        const cacheKey = `autocomplete_${action.meta.arg.query}`
        state.cache[cacheKey] = {
          data: action.payload,
          timestamp: Date.now(),
        }
      })
      .addCase(fetchMovieDetail.pending, (state) => {
        state.loading = true
        state.error = null
        state.movie = null
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.loading = false
        state.movie = action.payload
        const cacheKey = `movie_${action.meta.arg}`
        state.cache[cacheKey] = {
          data: action.payload,
          timestamp: Date.now(),
        }
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const {
  setSearchQuery,
  resetMovies,
  incrementPage,
  clearAutocomplete,
  resetMovie,
} = movieSlice.actions

export default movieSlice.reducer
