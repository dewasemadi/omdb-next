import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"
import { Providers } from "./providers"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { cn } from "@/lib/utils"
import { APP_BASE_URL } from "@/constants/env"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    template: "%s | OMDb Search",
    default: "OMDb Movie Search",
  },
  description: "Search for your favorite movies using the OMDb API.",
  metadataBase: APP_BASE_URL,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_BASE_URL,
    siteName: "OMDb Movie Search",
    title: "OMDb Movie Search",
    description: "Search for your favorite movies using the OMDb API.",
    images: [
      {
        url: "/images/og.jpg",
        width: 1916,
        height: 1003,
        alt: "OMDb Movie Search",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(geistSans.variable, geistMono.variable, "antialiased")}
      >
        <Providers>
          <NuqsAdapter>{children}</NuqsAdapter>
          <Toaster position="bottom-center" richColors />
        </Providers>
      </body>
    </html>
  )
}
