import React from "react"
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/lib/cart-store'
import { AuthProvider } from '@/lib/auth-store'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif"
});
const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: {
    template: '%s | SkeenDeep',
    default: 'SkeenDeep Medical Aesthetics Clinic | Experts in Non-invasive Aesthetic Dermatology',
  },
  description: 'At SkeenDeep Medical Aesthetics Clinic, we offer a wide variety of treatments designed to help you achieve your desired results. Experts in non-invasive aesthetic dermatology.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/images/ndara-logo.svg',
      },
    ],
    apple: '/images/ndara-logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${cormorant.variable} font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
