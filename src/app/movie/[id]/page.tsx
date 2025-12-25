import MovieDetailPage from "@/components/features/movie-detail"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return {
    title: `Movie Details - ${id}`,
    description: "View movie details, plot, ratings and more.",
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <MovieDetailPage id={id} />
}
