import { ReactNode } from "react"

interface ResultProps {
  title: string
  description: string
  action?: ReactNode
  icon?: ReactNode
}

export default function Result({
  title,
  description,
  action,
  icon,
}: ResultProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-4 text-center dark:bg-black font-sans antialiased text-zinc-900 dark:text-zinc-100">
      {icon && (
        <div className="mb-6 rounded-full bg-zinc-100 p-6 dark:bg-zinc-900">
          {icon}
        </div>
      )}
      <h2 className="mb-3 text-3xl font-bold tracking-tight">{title}</h2>
      <p className="mb-8 max-w-md text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      {action}
    </div>
  )
}
