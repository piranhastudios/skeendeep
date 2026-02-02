import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "react-day-picker"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Cart</span>
            </Link>
            <Link
              href="/"
              className="font-serif text-xl font-semibold text-foreground hover:text-foreground/80 transition-colors"
            >
              NDARA
            </Link>
            <div className="w-24" /> {/* Spacer for balance */}
          </nav>
        </div>
      </div>
      <div className="container mx-auto px-6 py-8">
        {children}
      </div>
      <Footer />
    </div>
  )
}
