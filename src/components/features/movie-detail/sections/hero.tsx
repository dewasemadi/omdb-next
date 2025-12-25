"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { MovieDetail } from "@/stores/slices/movie-slice"
import MoviePoster from "@/components/widgets/movie-poster"
import { useSearchParams } from "next/navigation"

interface HeroSectionProps {
  movie: MovieDetail
}

export default function HeroSection({ movie }: HeroSectionProps) {
  const q = useSearchParams()?.get("q") ?? ""
  const params = new URLSearchParams({ q })

  return (
    <>
      {/* Left Column: Poster & Back Link */}
      <div className="space-y-6">
        <Link
          href={`/?${params.toString()}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors mb-4 md:mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </Link>

        <div className="relative aspect-2/3 w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-zinc-900/5 dark:ring-white/10 group">
          <MoviePoster
            src={movie.Poster}
            alt={movie.Title}
            fill
            className="object-cover h-full w-full"
            iconClassName="w-16 h-16"
            preload
          />
        </div>
      </div>
    </>
  )
}
