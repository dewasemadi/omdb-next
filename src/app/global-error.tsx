"use client"

import { useEffect } from "react"
import { AlertTriangle, RotateCcw } from "lucide-react"
import "./globals.css"
import Result from "@/components/widgets/result"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <Result
          icon={
            <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-500" />
          }
          title="Technical Difficulties"
          description="We encountered an unexpected error. Our projectionists are working on fixing the reel."
          action={
            <Button
              onClick={reset}
              variant="secondary"
              className="gap-2 rounded-full"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </Button>
          }
        />
      </body>
    </html>
  )
}
