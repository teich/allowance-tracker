import "@/styles/globals.css"
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"

import type { Metadata } from 'next'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Allowance Tracker',
  description: 'Track your kids\' allowance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
         <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  )
}