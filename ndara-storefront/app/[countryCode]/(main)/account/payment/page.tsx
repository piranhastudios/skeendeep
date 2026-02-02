"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CreditCard, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-store"

const initialPaymentMethods = [
  {
    id: 1,
    type: "visa",
    last4: "4242",
    expiry: "12/25",
    isDefault: true,
  },
  {
    id: 2,
    type: "mastercard",
    last4: "8888",
    expiry: "08/26",
    isDefault: false,
  },
]

function getCardIcon(type: string) {
  if (type === "visa") {
    return (
      <svg className="w-10 h-6" viewBox="0 0 50 32" fill="none">
        <rect width="50" height="32" rx="4" fill="#1A1F71"/>
        <path d="M22.5 21H20L21.75 11H24.25L22.5 21ZM18.5 11L16.25 17.75L16 16.5L15.25 12.5C15.25 12.5 15.125 11 13.5 11H9.25L9.25 11.25C9.25 11.25 11 11.625 12.75 12.75L15 21H17.75L21.25 11H18.5ZM36.5 21H39L36.75 11H34.5C34 11 33.5 11.25 33.25 11.75L29.25 21H32L32.5 19.5H35.75L36.5 21ZM33.25 17.25L34.75 13.25L35.5 17.25H33.25ZM31.25 14.25L31.5 12.75C31.5 12.75 29.75 12 28 12C26.25 12 23.5 12.75 23.5 15.25C23.5 17.5 26.75 17.75 26.75 18.75C26.75 19.75 23.75 19.5 22.25 18.5L22 20C22 20 23.75 20.75 26 20.75C28.25 20.75 29.5 19.5 29.5 18C29.5 15.75 26.25 15.5 26.25 14.5C26.25 13.5 28.75 13.625 30.25 14.5L31.25 14.25Z" fill="white"/>
      </svg>
    )
  }
  return (
    <svg className="w-10 h-6" viewBox="0 0 50 32" fill="none">
      <rect width="50" height="32" rx="4" fill="#F5F5F5"/>
      <circle cx="20" cy="16" r="8" fill="#EB001B"/>
      <circle cx="30" cy="16" r="8" fill="#F79E1B"/>
      <path d="M25 10C26.875 11.5 28 13.625 28 16C28 18.375 26.875 20.5 25 22C23.125 20.5 22 18.375 22 16C22 13.625 23.125 11.5 25 10Z" fill="#FF5F00"/>
    </svg>
  )
}

export default function PaymentPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const deletePaymentMethod = (id: number) => {
    setPaymentMethods((prev) => prev.filter((pm) => pm.id !== id))
  }

  const setDefault = (id: number) => {
    setPaymentMethods((prev) =>
      prev.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    )
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

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
              Payment Methods
            </h1>
            <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Card
            </Button>
          </div>

          {paymentMethods.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                <CreditCard className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">No saved payment methods</h2>
              <p className="text-muted-foreground mb-6">
                Add a payment method to make checkout faster.
              </p>
              <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Card
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paymentMethods.map((pm) => (
                <div
                  key={pm.id}
                  className={`relative bg-card rounded-xl border p-6 ${
                    pm.isDefault ? "border-accent" : "border-border"
                  }`}
                >
                  {pm.isDefault && (
                    <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                      Default
                    </span>
                  )}
                  
                  <div className="mb-4">
                    {getCardIcon(pm.type)}
                  </div>
                  
                  <div className="mb-6">
                    <p className="font-semibold text-foreground">
                      •••• •••• •••• {pm.last4}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Expires {pm.expiry}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {!pm.isDefault && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setDefault(pm.id)}
                        >
                          Set as Default
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => deletePaymentMethod(pm.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* Add New Card */}
              <button
                className="flex flex-col items-center justify-center gap-3 bg-secondary/30 rounded-xl border border-dashed border-border p-6 min-h-[180px] hover:border-accent hover:bg-secondary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Add New Card
                </span>
              </button>
            </div>
          )}

          {/* Security Note */}
          <div className="mt-12 p-6 bg-secondary/30 rounded-xl">
            <h3 className="font-semibold text-foreground mb-2">Your payment information is secure</h3>
            <p className="text-sm text-muted-foreground">
              All payment information is encrypted and securely stored. We never store your full card number and all transactions are processed through secure payment gateways.
            </p>
          </div>
        </div>
      </main>
          </div>
  )
}
