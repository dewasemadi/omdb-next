"use client"

import { ArrowLeft } from "lucide-react"

export default function LoadingSection() {
  return (
    <div className="min-h-screen w-full bg-black dark:bg-black text-zinc-900 dark:text-zinc-100 flex items-center justify-center p-4 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black dark:bg-black pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[400px_1fr] gap-8 md:gap-16 items-start">
        {/* Left Column: Poster Skeleton */}
        <div className="space-y-6">
          {/* Back link placeholder */}
          <div className="inline-flex items-center gap-2 mb-4 md:mb-6 opacity-50">
            <ArrowLeft className="w-4 h-4 text-zinc-400" />
            <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-800 rounded animate-pulse" />
          </div>

          <div className="aspect-2/3 w-full rounded-2xl bg-zinc-300 dark:bg-zinc-800 animate-pulse shadow-2xl" />
        </div>

        {/* Right Column: Details Skeleton */}
        <div className="flex flex-col justify-center space-y-8 py-4">
          <div>
            {/* Meta Tags Row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="h-6 w-16 rounded-full bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
              <div className="h-4 w-20 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
              <div className="h-4 w-24 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
            </div>

            {/* Title */}
            <div className="h-12 md:h-16 w-3/4 rounded-lg bg-zinc-300 dark:bg-zinc-800 animate-pulse mb-6" />

            {/* Genres */}
            <div className="flex gap-2">
              <div className="h-8 w-20 rounded-full bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
              <div className="h-8 w-24 rounded-full bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
              <div className="h-8 w-16 rounded-full bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
            </div>
          </div>

          {/* Plot */}
          <div className="space-y-4">
            <div className="h-6 w-16 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse" />{" "}
            {/* Plot Label */}
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
              <div className="h-4 w-full rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
              <div className="h-4 w-1/2 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
              <div className="h-4 w-full rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
            </div>
          </div>

          {/* Credits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <div>
              <div className="h-4 w-20 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse mb-2" />
              <div className="h-5 w-32 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
            </div>
            <div>
              <div className="h-4 w-20 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse mb-2" />
              <div className="h-5 w-32 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
            </div>
            <div className="sm:col-span-2">
              <div className="h-4 w-20 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse mb-2" />
              <div className="h-5 w-3/4 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
            </div>
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
              <div className="flex flex-col gap-1">
                <div className="h-4 w-24 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
                <div className="h-3 w-16 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
              <div className="flex flex-col gap-1">
                <div className="h-4 w-24 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
                <div className="h-3 w-16 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
