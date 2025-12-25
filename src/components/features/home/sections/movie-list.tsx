"use client"

import { useAppSelector, useAppDispatch } from "@/stores/hooks"
import { fetchMovies, incrementPage } from "@/stores/slices/movie-slice"
import MovieList from "@/components/widgets/movie-list"
import { useRouter } from "next/navigation"

export default function MovieListSection({
  onPosterClick,
}: {
  onPosterClick: (url: string) => void
}) {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { movies, loading, hasMore, page, searchQuery, error } = useAppSelector(
    (state) => state.movies
  )

  const onLoadMore = () => {
    if (hasMore && !loading && searchQuery) {
      dispatch(incrementPage())
      dispatch(fetchMovies({ query: searchQuery, page: page + 1 }))
    }
  }

  const onMovieClick = (id: string) => {
    router.push(`/movie/${id}`)
  }

  return (
    <MovieList
      movies={movies}
      loading={loading}
      hasMore={hasMore}
      error={error}
      searchQuery={searchQuery}
      onPosterClick={onPosterClick}
      onMovieClick={onMovieClick}
      onLoadMore={onLoadMore}
    />
  )
}
