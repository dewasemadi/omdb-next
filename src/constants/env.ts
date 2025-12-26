export const ENV = {
  APP_BASE_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  OMDB_API_URL: process.env.NEXT_PUBLIC_OMDB_API_URL ?? "",
  IMAGE_HOSTS: process.env.NEXT_PUBLIC_IMAGE_HOSTS?.split(",") ?? [],
}
