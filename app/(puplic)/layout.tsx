import type React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Roboto_Mono } from "next/font/google";

const geistSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`font-sans ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}