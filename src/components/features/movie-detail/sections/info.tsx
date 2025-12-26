"use client"

import { Clock, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MovieDetail } from "@/stores/slices/movie-slice"
import { UNAVAILABLE } from "@/constants/common"

interface InfoSectionProps {
  movie: MovieDetail
}

export default function InfoSection({ movie }: InfoSectionProps) {
  return (
    <div className="flex flex-col justify-center space-y-8 py-4">
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge
            variant="soft"
            className="px-3 py-1 text-xs font-bold uppercase tracking-wide"
          >
            {movie.Type}
          </Badge>
          {movie.Runtime !== UNAVAILABLE && (
            <span className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
              <Clock className="w-4 h-4" /> {movie.Runtime}
            </span>
          )}
          {movie.Released !== UNAVAILABLE && (
            <span className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
              <Calendar className="w-4 h-4" /> {movie.Released}
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[1.1]">
          {movie.Title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-2">
          {movie.Genre.split(",").map((g) => (
            <Badge
              key={g}
              variant="outline"
              className="px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-900 shadow-sm"
            >
              {g.trim()}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">Plot</h2>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-2xl">
          {movie.Plot}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
        <div>
          <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            Director
          </h3>
          <p className="font-medium">{movie.Director}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            Writers
          </h3>
          <p className="font-medium">{movie.Writer}</p>
        </div>
        <div className="sm:col-span-2">
          <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            Starring
          </h3>
          <p className="font-medium text-lg">{movie.Actors}</p>
        </div>
      </div>
    </div>
  )
}
