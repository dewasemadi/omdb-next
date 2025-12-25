"use client"

import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import MoviePoster from "@/components/widgets/movie-poster"

interface PosterModalProps {
  posterUrl: string | null
  onClose: () => void
}

export default function PosterModal({ posterUrl, onClose }: PosterModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onEsc)
    return () => window.removeEventListener("keydown", onEsc)
  }, [onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {posterUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-2xl"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-black/50 text-white/80 hover:bg-black/80 hover:text-white backdrop-blur-sm rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="relative h-[85vh] aspect-2/3 w-full bg-zinc-900/50">
              <MoviePoster
                src={posterUrl}
                alt="Poster"
                fill
                className="object-contain"
                onClick={(e) => e.stopPropagation()}
                preload
                sizes="(max-height: 85vh) 100vw, 85vh"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
