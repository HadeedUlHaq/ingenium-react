import type { Metadata } from 'next'
import type { ReactNode } from "react"
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { StickyBookDemoButton } from "@/components/landing/sticky-book-demo-button"
import './globals.css'

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: 'Ingenium - AI Design Manager for Construction',
  description: 'Eliminate time wasted locating drawings, doing repetitive checks, and fixing preventable mistakes on-site. Ingenium reviews your design information like an experienced project team.',
  icons: {
    icon: '/cropped-site-icon.png',
    shortcut: '/cropped-site-icon.png',
    apple: '/cropped-site-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <StickyBookDemoButton />
      </body>
    </html>
  )
}
