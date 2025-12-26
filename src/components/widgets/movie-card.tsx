import { Movie } from "@/stores/slices/movie-slice"
import { cn } from "@/lib/utils"
import MoviePoster from "@/components/widgets/movie-poster"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface MovieCardProps {
  movie: Movie
  onPosterClick: (posterUrl: string) => void
  onClick: () => void
  className?: string
}

export default function MovieCard({
  movie,
  onPosterClick,
  onClick,
  className,
}: MovieCardProps) {
  return (
    <Card
      className={cn(
        "group/card relative flex flex-col overflow-hidden bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800",
        className
      )}
    >
      <button
        type="button"
        aria-label={`View poster for ${movie.Title}`}
        className="group/poster relative aspect-2/3 w-full cursor-pointer bg-zinc-200 dark:bg-zinc-800 overflow-hidden text-left focus-visible:outline-none"
        onClick={(e) => {
          e.stopPropagation()
          onPosterClick(movie.Poster)
        }}
      >
        <MoviePoster
          fill
          src={movie.Poster}
          alt={movie.Title}
          className="transition-transform duration-500 group-hover/card:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          iconClassName="w-16 h-16"
        />
        {/* Overlay on hover and focus ring */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-black/0 transition-colors group-hover/card:bg-black/10 dark:group-hover/card:bg-white/5 group-focus-visible/poster:ring-2 group-focus-visible/poster:ring-blue-500 group-focus-visible/poster:ring-inset rounded-t-xl" />
      </button>

      <button
        type="button"
        onClick={onClick}
        aria-label={`View details for ${movie.Title}`}
        className="flex flex-1 flex-col p-4 cursor-pointer w-full text-left focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-[-4px] rounded-b-xl"
      >
        <h3 className="line-clamp-2 text-base font-semibold text-zinc-900 group-hover/card:text-blue-600 dark:text-zinc-50 dark:group-hover/card:text-blue-400">
          {movie.Title}
        </h3>
        <div className="mt-auto pt-2 flex w-full items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
          <span>{movie.Year}</span>
          <Badge variant="secondary" className="capitalize">
            {movie.Type}
          </Badge>
        </div>
      </button>
    </Card>
  )
}
