"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Calendar, Package, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { sdk } from "@/lib/config"

interface Prescription {
  id: string
  customer_id: string
  product_id: string
  diagnosis: string
  usage_instructions: string
  admin_notes: string | null
  expires_at: Date | null
  quantity_limit: number
  remaining_quantity: number
  prescribed_by: string
  prescribed_at: Date
  is_active: boolean
  created_at: Date
  updated_at: Date
  product?: {
    id: string
    title: string
    thumbnail?: string
  }
}

export default function PrescriptionsPage() {
  const { user, loading: authLoading, isAuthenticated } = useAuth()
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPrescriptions() {
      if (isAuthenticated && user) {
        setLoading(true)
        setError(null)
        try {
          const response = await sdk.client.fetch<{
            prescriptions: Prescription[]
            count: number
          }>("/store/prescriptions")
          
          setPrescriptions(response.prescriptions)
        } catch (e: any) {
          console.error(e)
          setError(e.message || "Failed to load prescriptions")
        } finally {
          setLoading(false)
        }
      }
    }

    if (!authLoading && isAuthenticated) {
      fetchPrescriptions()
    }
  }, [user, authLoading, isAuthenticated])

  if (authLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!user || !isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>Please sign in to view your prescriptions.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="bg-background min-h-screen flex flex-col items-center">
      <div className="container py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-medium mb-2">My Prescriptions</h1>
          <p className="text-muted-foreground">View your active and past prescriptions.</p>
        </div>

        {loading ? (
          <div className="flex h-[40vh] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                Error Loading Prescriptions
              </CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
          </Card>
        ) : prescriptions.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Prescriptions Found</CardTitle>
              <CardDescription>
                You don't have any prescriptions yet. Contact your healthcare provider
                to receive a prescription for our prescription products.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-4">
            {prescriptions.map((prescription) => {
              const isExpired = prescription.expires_at && new Date(prescription.expires_at) < new Date()
              const isLowQuantity = prescription.remaining_quantity < prescription.quantity_limit * 0.2
              const hasQuantityRemaining = prescription.remaining_quantity > 0

              return (
                <Card key={prescription.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        {prescription.product?.thumbnail && (
                          <img
                            src={prescription.product.thumbnail}
                            alt={prescription.product.title}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        )}
                        <div>
                          <CardTitle className="text-lg">
                            {prescription.product?.title || "Product"}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            {prescription.is_active && hasQuantityRemaining && !isExpired ? (
                              <Badge variant="default" className="bg-green-500">
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Inactive</Badge>
                            )}
                            {isExpired && <Badge variant="destructive">Expired</Badge>}
                            {!isExpired && isLowQuantity && hasQuantityRemaining && (
                              <Badge variant="outline" className="border-orange-500 text-orange-500">
                                Low Quantity
                              </Badge>
                            )}
                            {!hasQuantityRemaining && (
                              <Badge variant="secondary">Used Up</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Diagnosis</h4>
                        <p className="text-sm text-muted-foreground">
                          {prescription.diagnosis}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-1">Usage Instructions</h4>
                        <p className="text-sm text-muted-foreground">
                          {prescription.usage_instructions}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Quantity</p>
                            <p className="text-sm font-medium">
                              {prescription.remaining_quantity} / {prescription.quantity_limit} remaining
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Prescribed</p>
                            <p className="text-sm font-medium">
                              {format(new Date(prescription.prescribed_at), "MMM d, yyyy")}
                            </p>
                          </div>
                        </div>

                        {prescription.expires_at && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Expires</p>
                              <p className={`text-sm font-medium ${isExpired ? "text-destructive" : ""}`}>
                                {format(new Date(prescription.expires_at), "MMM d, yyyy")}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
