"use client"

import { cn } from "@/lib/utils"
import { MovieDetail } from "@/stores/slices/movie-slice"
import { UNAVAILABLE } from "@/constants/common"

const METASCORE_THRESHOLD = {
  GOOD: 60,
  AVERAGE: 40,
} as const

const METASCORE_CLASS = {
  GOOD: "bg-green-500",
  AVERAGE: "bg-yellow-500",
  POOR: "bg-red-500",
} as const

interface RatingSectionProps {
  movie: MovieDetail
}

export default function RatingSection({ movie }: RatingSectionProps) {
  let metascoreBgClass = ""
  const metascore = parseInt(movie.Metascore)

  if (metascore >= METASCORE_THRESHOLD.GOOD) {
    metascoreBgClass = METASCORE_CLASS.GOOD
  } else if (metascore >= METASCORE_THRESHOLD.AVERAGE) {
    metascoreBgClass = METASCORE_CLASS.AVERAGE
  } else {
    metascoreBgClass = METASCORE_CLASS.POOR
  }

  return (
    <div className="flex items-center gap-6 pt-4">
      {movie.imdbRating !== UNAVAILABLE && (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400 text-black font-bold text-lg shadow-lg shadow-yellow-400/20">
            {movie.imdbRating}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-zinc-900 dark:text-white">
              IMDb Rating
            </span>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              {movie.imdbVotes} votes
            </span>
          </div>
        </div>
      )}

      {movie.Metascore !== UNAVAILABLE && (
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-lg font-bold text-lg shadow-lg text-black",
              metascoreBgClass
            )}
          >
            {movie.Metascore}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-zinc-900 dark:text-white">
              Metascore
            </span>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              Critic Reviews
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
