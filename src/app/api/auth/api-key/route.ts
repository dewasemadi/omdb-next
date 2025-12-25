import { COOKIES } from "@/constants/storage"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { api_key } = await request.json()

  if (!api_key) {
    return NextResponse.json({ error: "API key is required" }, { status: 400 })
  }

  const cookieStore = await cookies()

  cookieStore.set(COOKIES.OMDB_API_KEY, api_key, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 365 * 24 * 60 * 60, // 1 year
  })

  return NextResponse.json({ success: true })
}

export async function GET() {
  const cookieStore = await cookies()
  const apiKey = cookieStore.get(COOKIES.OMDB_API_KEY)?.value
  return NextResponse.json({ has_key: !!apiKey, api_key: apiKey })
}
