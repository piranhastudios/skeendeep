"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-store"
import { listCustomerAddresses, deleteCustomerAddress } from "@/lib/data/customer"
import { HttpTypes } from "@medusajs/types"

export default function AddressesPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [addresses, setAddresses] = useState<HttpTypes.StoreCustomerAddress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (!isAuthenticated) return
    listCustomerAddresses().then((addresses) => {
      setAddresses(addresses)
      setLoading(false)
    })
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return null
  }

  const handleDelete = async (id: string) => {
    await deleteCustomerAddress(id)
    setAddresses((prev) => prev.filter((addr) => addr.id !== id))
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
            Saved Addresses
          </h1>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">
              Loading your addresses...
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                <MapPin className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">No saved addresses</h2>
              <p className="text-muted-foreground">
                You don&apos;t have any saved addresses yet. You can add a shipping address during checkout.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {addresses.map((address) => (
                <div key={address.id} className="relative bg-card rounded-xl border p-6 border-border">
                  {address.is_default_shipping && (
                    <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                      Default
                    </span>
                  )}

                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">
                      {[address.first_name, address.last_name].filter(Boolean).join(" ") || "Address"}
                    </h3>
                  </div>

                  <div className="text-sm text-muted-foreground space-y-1 mb-6">
                    <p>{address.address_1}</p>
                    {address.address_2 && <p>{address.address_2}</p>}
                    <p>
                      {[address.city, address.province].filter(Boolean).join(", ")}{" "}
                      {address.postal_code}
                    </p>
                    <p className="uppercase">{address.country_code}</p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(address.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}