import { useRef } from "react"
import { Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"
import { Movie } from "@/stores/slices/movie-slice"
import MoviePoster from "@/components/widgets/movie-poster"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  query: string
  onQueryChange: (query: string) => void
  onSubmit: (e?: React.FormEvent) => void
  suggestions: Movie[]
  onSelectSuggestion: (title: string) => void
  showSuggestions: boolean
  setShowSuggestions: (show: boolean) => void
  onClear?: () => void
  onFocus?: () => void
}

export default function SearchBar({
  query,
  onQueryChange,
  onSubmit,
  suggestions,
  onSelectSuggestion,
  showSuggestions,
  setShowSuggestions,
  onClear,
  onFocus,
}: SearchBarProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Deduping results for rendering safely
  const uniqueResults = suggestions.filter(
    (movie, index, self) =>
      index === self.findIndex((m) => m.imdbID === movie.imdbID)
  )

  // Close dropdown when clicking outside
  useOnClickOutside(containerRef, () => {
    setShowSuggestions(false)
  })

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl z-40">
      <form onSubmit={onSubmit} className="relative group">
        <div className="relative flex items-center bg-white dark:bg-zinc-800 rounded-full shadow-md transition-shadow hover:shadow-lg focus-within:shadow-xl border border-transparent focus-within:border-blue-500/30 overflow-hidden">
          <Search className="absolute left-4 h-5 w-5 text-zinc-400" />
          <Input
            type="text"
            value={query}
            onFocus={onFocus}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search movies..."
            className="w-full border-none bg-transparent py-3.5 pl-12 pr-4 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-0 dark:bg-transparent dark:text-white h-12"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => (onClear ? onClear() : onQueryChange(""))}
              className="absolute right-26 h-8 w-8 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              ✕
            </Button>
          )}
          <Button
            type="submit"
            size="pill"
            className="absolute right-1.5 top-1.5 bottom-1.5 shadow-sm tracking-wide rounded-full"
          >
            Search
          </Button>
        </div>
      </form>

      <AnimatePresence>
        {showSuggestions && uniqueResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute mt-2 w-full overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700"
          >
            <ul className="py-2">
              {uniqueResults.map((movie) => (
                <li
                  key={`${movie.imdbID}-${movie.Title}`}
                  onClick={() => onSelectSuggestion(movie.Title)}
                  className="flex cursor-pointer items-center gap-4 px-4 py-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700/50"
                >
                  <div className="relative h-10 w-8 shrink-0 overflow-hidden rounded bg-zinc-200 dark:bg-zinc-700 font-material shadow-sm">
                    <MoviePoster
                      src={movie.Poster}
                      alt={movie.Title}
                      fill={true}
                      className="object-cover"
                      iconClassName="w-4 h-4"
                      sizes="32px"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      {movie.Title}
                    </span>
                    <span className="text-xs text-zinc-500">{movie.Year}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
