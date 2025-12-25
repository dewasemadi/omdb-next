import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import axios from "axios"
import { COOKIES } from "@/constants/keys"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const OMDB_API_URL = process.env.OMDB_API_URL

  if (!OMDB_API_URL) {
    return NextResponse.json(
      {
        Response: "False",
        Error: "Server configuration error: missing OMDB_API_URL",
      },
      { status: 500 }
    )
  }

  const cookieStore = await cookies()
  const apiKey = cookieStore.get(COOKIES.OMDB_API_KEY)?.value ?? ""

  if (!apiKey) {
    return NextResponse.json(
      {
        Response: "False",
        Error: "API Key not found. Please set your OMDB API Key in settings.",
      },
      { status: 401 }
    )
  }

  const queryString = searchParams.toString()
  const url = `${OMDB_API_URL}?${queryString}&apikey=${apiKey}`

  try {
    const response = await axios.get(url)
    return NextResponse.json(response.data)
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: { Error?: string }; status?: number }
      message?: string
    }
    return NextResponse.json(
      {
        Response: "False",
        Error:
          err.response?.data?.Error || err.message || "Failed to fetch data",
      },
      { status: err.response?.status || 500 }
    )
  }
}
