import Link from "next/link"
import { FileQuestion, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Result from "@/components/widgets/result"

export default function NotFound() {
  return (
    <Result
      icon={
        <FileQuestion className="h-12 w-12 text-zinc-500 dark:text-zinc-400" />
      }
      title="Scene Missing"
      description="The page you are looking for seems to have been edited out of the final cut. It might have been moved or deleted."
      action={
        <Button asChild className="gap-2 rounded-full">
          <Link href="/">
            <Home className="h-4 w-4" />
            Return Home
          </Link>
        </Button>
      }
    />
  )
}
