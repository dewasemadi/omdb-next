import { useRef, useEffect, useCallback } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import MovieCard from "@/components/widgets/movie-card"
import { Movie } from "@/stores/slices/movie-slice"

interface MovieListProps {
  movies: Movie[]
  loading: boolean
  hasMore: boolean
  error?: string | null
  searchQuery?: string
  onPosterClick: (url: string) => void
  onMovieClick: (id: string) => void
  onLoadMore: () => void
}

export default function MovieList({
  movies,
  loading,
  hasMore,
  error,
  searchQuery,
  onPosterClick,
  onMovieClick,
  onLoadMore,
}: MovieListProps) {
  const observerTarget = useRef<HTMLDivElement>(null)

  const onObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && hasMore && !loading) {
        onLoadMore()
      }
    },
    [hasMore, loading, onLoadMore]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(onObserver, {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    })

    const target = observerTarget.current
    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) observer.unobserve(target)
    }
  }, [onObserver])

  if (movies.length === 0 && !loading && !searchQuery) {
    return (
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <div className="relative mb-6 h-40 w-40 opacity-50">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="h-full w-full text-zinc-300 dark:text-zinc-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 4V20M17 4V20M3 8H7M17 8H21M3 12H21M3 16H7M17 16H21M4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20Z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
          Ready to watch?
        </h3>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400 max-w-sm">
          Enter a movie title in the search bar above to start exploring our
          vast collection of films.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-10 w-full">
      {movies.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-8">
          {movies.map((movie, index) => (
            <MovieCard
              key={`${movie.imdbID}-${index}`}
              movie={movie}
              onPosterClick={onPosterClick}
              onClick={() => onMovieClick(movie.imdbID)}
            />
          ))}
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="flex flex-col space-y-3">
              <Skeleton className="w-full rounded-xl aspect-2/3" />
              <div className="space-y-2 p-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sentinel */}
      <div ref={observerTarget} className="h-4 w-full" />

      {/* No Results or Specific Error */}
      {!loading && movies.length === 0 && searchQuery && (
        <div className="mt-12 text-center text-zinc-500 dark:text-zinc-400">
          {error ? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-lg font-medium text-amber-600 dark:text-amber-500">
                {error}
              </p>
              <p className="text-sm">Try making your search more specific.</p>
            </div>
          ) : !error ? (
            <>
              No movies found for &quot;
              <span className="font-medium text-zinc-900 dark:text-white">
                {searchQuery}
              </span>
              &quot;
            </>
          ) : null}
        </div>
      )}
    </div>
  )
}
