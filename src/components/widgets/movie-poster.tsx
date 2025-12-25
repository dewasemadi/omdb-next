"use client"

import { useState, useEffect } from "react"
import Image, { ImageProps } from "next/image"
import { Film } from "lucide-react"
import { cn } from "@/lib/utils"
import { UNAVAILABLE } from "@/constants/common"

interface MoviePosterProps extends Omit<ImageProps, "src" | "alt"> {
  src: string
  alt: string
  className?: string
  iconClassName?: string
}

export default function MoviePoster({
  src,
  alt,
  className,
  iconClassName,
  ...props
}: MoviePosterProps) {
  const [error, setError] = useState(false)

  useEffect(() => {
    if (error) setError(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  if (!src || src === UNAVAILABLE || error) {
    return (
      <div
        data-testid="poster-fallback"
        className={cn(
          "flex h-full w-full items-center justify-center bg-zinc-200 text-zinc-400 dark:bg-zinc-800",
          className
        )}
      >
        <Film className={cn("opacity-20", iconClassName || "w-1/2 h-1/2")} />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={cn("object-cover", className)}
      {...props}
    />
  )
}
