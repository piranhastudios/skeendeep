"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CreditCard, Lock } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-store"
import LocalizedClientLink from "@/components/common/localized-client-link"

export default function PaymentPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-8 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Back link */}
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Account
          </Link>

          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-8">
            Payment Methods
          </h1>

          <div className="max-w-xl bg-card rounded-xl border border-border p-8">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
              <CreditCard className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No stored cards
            </h2>
            <p className="text-muted-foreground mb-6">
              We don&apos;t store card details on your account. Card payments are
              handled securely and encrypted at checkout every time you order.
            </p>
            <LocalizedClientLink
              href="/products"
              className="inline-flex items-center rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background hover:bg-foreground/90"
            >
              Browse Products
            </LocalizedClientLink>
          </div>

          {/* Security Note */}
          <div className="mt-12 max-w-xl p-6 bg-secondary/30 rounded-xl flex gap-4">
            <Lock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Your payment information is secure</h3>
              <p className="text-sm text-muted-foreground">
                All payment information is encrypted and processed through secure payment gateways. We never store your full card number.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}