"use client"

import { useState, Suspense } from "react"
import SearchSection from "./sections/search"
import MovieListSection from "./sections/movie-list"
import PosterModal from "@/components/widgets/poster-modal"
import HeroHeader from "./sections/hero-header"
import { ApiKeyModal } from "../auth/api-key-modal"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  const [poster, setPoster] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white relative isolate">
      {/* Aurora Background Effect */}
      <div className="absolute top-0 left-0 w-full h-125 bg-linear-to-b from-blue-500/20 via-purple-500/10 to-transparent dark:from-blue-900/30 dark:via-purple-900/10 pointer-events-none -z-10 blur-3xl opacity-60" />

      {/* Settings Trigger */}
      <div className="absolute right-4 top-4">
        <ApiKeyModal
          trigger={
            <Button
              variant="ghost"
              size="icon"
              aria-label="Settings"
              className="rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            >
              <Settings className="h-5 w-5" />
            </Button>
          }
        />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-16 sm:px-8">
        <HeroHeader />

        <div className="sticky top-6 z-50 w-full max-w-2xl transition-all duration-300 pointer-events-none">
          <div className="pointer-events-auto">
            <Suspense
              fallback={<Skeleton className="h-12 w-full rounded-full" />}
            >
              <SearchSection />
            </Suspense>
          </div>
        </div>

        <Suspense fallback={null}>
          <MovieListSection onPosterClick={setPoster} />
        </Suspense>
      </div>

      <PosterModal posterUrl={poster} onClose={() => setPoster(null)} />
    </main>
  )
}
