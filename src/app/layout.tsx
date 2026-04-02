import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dear Amy 🌸",
  description: "A little something special for you",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gradient-to-br from-blue-100 via-purple-50 to-blue-50">
        {children}
      </body>
    </html>
  )
}
