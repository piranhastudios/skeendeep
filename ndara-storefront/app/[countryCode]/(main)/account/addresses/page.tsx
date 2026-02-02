"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-store"

const initialAddresses = [
  {
    id: 1,
    name: "Home",
    street: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    isDefault: true,
  },
  {
    id: 2,
    name: "Office",
    street: "456 Corporate Blvd, Suite 200",
    city: "New York",
    state: "NY",
    zip: "10022",
    country: "United States",
    isDefault: false,
  },
]

export default function AddressesPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [addresses, setAddresses] = useState(initialAddresses)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const deleteAddress = (id: number) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id))
  }

  const setDefault = (id: number) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
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
              Saved Addresses
            </h1>
            <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Address
            </Button>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                <MapPin className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">No saved addresses</h2>
              <p className="text-muted-foreground mb-6">
                Add an address to make checkout faster.
              </p>
              <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Address
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`relative bg-card rounded-xl border p-6 ${
                    address.isDefault ? "border-accent" : "border-border"
                  }`}
                >
                  {address.isDefault && (
                    <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                      Default
                    </span>
                  )}
                  
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">{address.name}</h3>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1 mb-6">
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} {address.zip}</p>
                    <p>{address.country}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    {!address.isDefault && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setDefault(address.id)}
                        >
                          Set as Default
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => deleteAddress(address.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* Add New Address Card */}
              <button
                className="flex flex-col items-center justify-center gap-3 bg-secondary/30 rounded-xl border border-dashed border-border p-6 min-h-[200px] hover:border-accent hover:bg-secondary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Add New Address
                </span>
              </button>
            </div>
          )}
        </div>
      </main>
          </div>
  )
}
