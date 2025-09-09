import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/shared/theme-provider"
import { Suspense } from "react"
import "./globals.css"
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs"

// Fonts
const geistSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const geistMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "TransitFleet AI Tracker",
  description: "Real-time public transit fleet dashboard with AI-driven predictions",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`font-sans ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Suspense fallback={null}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {/* Force auth here */}
              <SignedIn>
                {children}
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </ThemeProvider>
            <Analytics />
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  )
}
