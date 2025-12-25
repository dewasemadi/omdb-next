import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export default function HeroHeader() {
  return (
    <div className="relative mb-16 flex flex-col items-center text-center">
      {/* Badge */}
      <Badge
        variant="accent"
        className="mb-6 gap-2 px-4 py-1.5 text-sm backdrop-blur-sm animate-in fade-in zoom-in duration-500"
      >
        <Sparkles className="h-4 w-4" />
        <span>Explore the Cinema Universe</span>
      </Badge>

      {/* Main Title */}
      <h1 className="relative max-w-4xl bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-5xl font-black tracking-tighter text-transparent dark:from-white dark:via-zinc-200 dark:to-zinc-500 sm:text-7xl md:text-8xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 pb-2">
        Movie Magic
        <span className="absolute -top-8 -right-8 -z-10 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl dark:bg-blue-500/10 sm:-top-12 sm:-right-12 sm:h-32 sm:w-32"></span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl md:leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        Discover your next favorite film. Search through millions of movies,
        read plot summaries, and find hidden gems instantly.
      </p>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 blur-[100px] dark:from-indigo-500/10 dark:to-pink-500/10" />
    </div>
  )
}
