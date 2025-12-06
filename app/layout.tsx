import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alex Dev | Software Engineer',
  description: 'Portfolio of a Full Stack Developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* I removed ${inter.className} and added 'font-sans' */}
      <body className="font-sans min-h-screen bg-white text-gray-900 selection:bg-gray-100">
        <main className="mx-auto max-w-5xl px-6 py-12 md:px-12 md:py-20">
          {children}
        </main>
      </body>
    </html>
  )
}