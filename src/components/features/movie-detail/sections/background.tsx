"use client"

import Image from "next/image"
import { MovieDetail } from "@/stores/slices/movie-slice"

interface BackgroundSectionProps {
  movie: MovieDetail
}

export default function BackgroundSection({ movie }: BackgroundSectionProps) {
  return (
    <div className="absolute inset-0 z-0 opacity-10 blur-3xl scale-110 pointer-events-none">
      {movie.Poster !== "N/A" && (
        <Image src={movie.Poster} alt="" fill className="object-cover" />
      )}
      <div className="absolute inset-0 bg-white/50 dark:bg-black/50" />
    </div>
  )
}
