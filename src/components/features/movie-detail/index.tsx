"use client"

import { Suspense, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CircleAlert } from "lucide-react"
import HeroSection from "./sections/hero"
import InfoSection from "./sections/info"
import RatingSection from "./sections/rating"
import LoadingSection from "./sections/loading"
import BackgroundSection from "./sections/background"
import { fetchMovieDetail, resetMovie } from "@/stores/slices/movie-slice"
import { useAppDispatch, useAppSelector } from "@/stores/hooks"
import Result from "@/components/widgets/result"

export default function MovieDetailPage({ id }: { id: string }) {
  const dispatch = useAppDispatch()
  const { movie, loading, error } = useAppSelector((state) => state.movies)

  useEffect(() => {
    if (id) dispatch(fetchMovieDetail(id))
    return () => {
      dispatch(resetMovie())
    }
  }, [id, dispatch])

  if (error) {
    return (
      <Result
        icon={<CircleAlert className="w-12 h-12 text-red-500" />}
        title="Something went wrong"
        description={
          error || "We are sorry, something went wrong. Please try again later."
        }
        action={
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        }
      />
    )
  }

  if (loading || !movie) {
    return <LoadingSection />
  }

  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 flex items-center justify-center p-4 md:p-10 relative overflow-hidden">
      <BackgroundSection movie={movie} />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[400px_1fr] gap-8 md:gap-16 items-start animate-in fade-in slide-in-from-bottom-8 duration-700">
        <Suspense fallback={<p>Loading...</p>}>
          <HeroSection movie={movie} />
        </Suspense>

        {/* Right Column: Details */}
        <div className="flex flex-col justify-center space-y-8 py-4">
          {/* Info (Title, Tags, Plot, Credits) */}
          <InfoSection movie={movie} />

          {/* Ratings */}
          <RatingSection movie={movie} />
        </div>
      </div>
    </div>
  )
}
