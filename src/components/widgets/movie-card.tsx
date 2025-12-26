import { Movie } from "@/stores/slices/movie-slice"
import { cn } from "@/lib/utils"
import MoviePoster from "@/components/widgets/movie-poster"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

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
        "group relative flex flex-col overflow-hidden bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800",
        className
      )}
    >
      <div className="relative aspect-2/3 w-full cursor-pointer bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
        <MoviePoster
          fill
          src={movie.Poster}
          alt={movie.Title}
          className="transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          iconClassName="w-16 h-16"
          onClick={(e) => {
            e.stopPropagation()
            onPosterClick(movie.Poster)
          }}
        />
        {/* Overlay on hover */}
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10 dark:group-hover:bg-white/5" />
      </div>

      <CardContent
        className="flex flex-1 flex-col p-4 cursor-pointer"
        onClick={onClick}
      >
        <h3 className="line-clamp-2 text-base font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400">
          {movie.Title}
        </h3>
        <div className="mt-auto pt-2 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
          <span>{movie.Year}</span>
          <Badge variant="secondary" className="capitalize">
            {movie.Type}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
