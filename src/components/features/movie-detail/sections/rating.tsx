"use client"

import { cn } from "@/lib/utils"
import { MovieDetail } from "@/stores/slices/movie-slice"
import { UNAVAILABLE } from "@/constants/common"

interface RatingSectionProps {
  movie: MovieDetail
}

export default function RatingSection({ movie }: RatingSectionProps) {
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
            <span className="text-xs text-zinc-500">
              {movie.imdbVotes} votes
            </span>
          </div>
        </div>
      )}

      {movie.Metascore !== UNAVAILABLE && (
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-lg font-bold text-lg shadow-lg text-white",
              parseInt(movie.Metascore) >= 60
                ? "bg-green-600"
                : parseInt(movie.Metascore) >= 40
                  ? "bg-yellow-500"
                  : "bg-red-500"
            )}
          >
            {movie.Metascore}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-zinc-900 dark:text-white">
              Metascore
            </span>
            <span className="text-xs text-zinc-500">Critic Reviews</span>
          </div>
        </div>
      )}
    </div>
  )
}
