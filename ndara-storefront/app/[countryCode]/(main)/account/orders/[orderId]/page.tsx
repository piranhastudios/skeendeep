"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Package, Calendar, Truck, CheckCircle, Download, RotateCcw, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Spinner } from "@/components/ui/spinner"
import LocalizedClientLink from "@/components/common/localized-client-link"
import { retrieveCustomer } from "@/lib/data/customer"
import { retrieveOrder } from "@/lib/data/orders"
import { reorderItems, generateInvoiceUrl, getTrackingUrl } from "@/lib/data/order-actions"
import { HttpTypes } from "@medusajs/types"
import { count } from "console"
import { useAuth } from "@lib/auth-store"

export default function OrderDetailsPage() {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const router = useRouter()
  const params = useParams()
  const {customer} = useAuth()
  const orderId = params.orderId as string
  const countryCode = params.countryCode as string

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!customer) {
          router.push('/account')
          return
        }
        const orderData = await retrieveOrder(orderId)
        setOrder(orderData)
      } catch (error) {
        console.error("Error fetching data:", error)
        router.push('/account/orders')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [router, orderId, customer])

  const handleReorder = async () => {
    setActionLoading('reorder')
    try {
      const result = await reorderItems(order, countryCode)
      if (result.success) {
        alert(result.message || 'Items added to cart successfully!')
        router.push('/cart')
      } else {
        alert(result.error || 'Failed to add items to cart')
      }
    } catch (error) {
      console.error('Error reordering:', error)
      alert('Failed to add items to cart')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDownloadInvoice = async () => {
    setActionLoading('invoice')
    try {
      const invoiceUrl = generateInvoiceUrl(order.id)
      window.open(invoiceUrl, '_blank')
    } catch (error) {
      console.error('Error downloading invoice:', error)
      alert('Failed to download invoice')
    } finally {
      setActionLoading(null)
    }
  }

  const handleTrackOrder = () => {
    const trackingUrl = getTrackingUrl(order)
    if (trackingUrl) {
      window.open(trackingUrl, '_blank')
    } else {
      alert('Tracking information is not available for this order')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'pending':
      case 'processing':
        return <Calendar className="w-5 h-5 text-yellow-600" />
      case 'shipped':
      case 'in_transit':
        return <Truck className="w-5 h-5 text-blue-600" />
      case 'cancelled':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <Package className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'pending':
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'shipped':
      case 'in_transit':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-[50vh]">
          <Spinner />
        </div>
      </div>
    )
  }

  if (!customer || !order) {
    return null
  }

  const canReorder = order.status === 'completed' || order.status === 'delivered'
  const canTrack = ['shipped', 'in_transit', 'processing'].includes(order.status)
  const canCancel = ['pending', 'processing'].includes(order.status)

  return (
    <div className="min-h-screen bg-background">
      
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <LocalizedClientLink href="/account/orders">
                  <Button variant="ghost" className="gap-2 p-0 h-auto text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Orders
                  </Button>
                </LocalizedClientLink>
                <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight mt-4">
                  Order #{order.display_id}
                </h1>
                <p className="text-muted-foreground mt-2">
                  Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Order Status */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <CardTitle>Order Status</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Last updated: {new Date(order.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Order Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Order Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {canTrack && (
                    <Button variant="outline" onClick={handleTrackOrder} className="gap-2">
                      <Truck className="w-4 h-4" />
                      Track Order
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={handleDownloadInvoice}
                    disabled={actionLoading === 'invoice'}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {actionLoading === 'invoice' ? 'Downloading...' : 'Download Invoice'}
                  </Button>
                  {canReorder && (
                    <Button 
                      onClick={handleReorder}
                      disabled={actionLoading === 'reorder'}
                      className="gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      {actionLoading === 'reorder' ? 'Adding to Cart...' : 'Reorder Items'}
                    </Button>
                  )}
                  {canCancel && (
                    <Button variant="destructive" className="gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Cancel Order
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items?.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary">
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            <Package className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground">{item.product_title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.variant?.title && `Variant: ${item.variant.title}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: order.currency_code?.toUpperCase() || 'USD'
                          }).format(item.total / 100)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: order.currency_code?.toUpperCase() || 'USD'
                          }).format(item.unit_price / 100)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Order Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: order.currency_code?.toUpperCase() || 'USD'
                    }).format(order.subtotal / 100)}</span>
                  </div>
                  {order.shipping_total > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>{new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: order.currency_code?.toUpperCase() || 'USD'
                      }).format(order.shipping_total / 100)}</span>
                    </div>
                  )}
                  {order.tax_total > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>{new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: order.currency_code?.toUpperCase() || 'USD'
                      }).format(order.tax_total / 100)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>{new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: order.currency_code?.toUpperCase() || 'USD'
                    }).format(order.total / 100)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  {order.shipping_address ? (
                    <div className="space-y-1">
                      <p className="font-medium">
                        {order.shipping_address.first_name} {order.shipping_address.last_name}
                      </p>
                      <p>{order.shipping_address.address_1}</p>
                      {order.shipping_address.address_2 && (
                        <p>{order.shipping_address.address_2}</p>
                      )}
                      <p>
                        {order.shipping_address.city}, {order.shipping_address.postal_code}
                      </p>
                      <p>{order.shipping_address.country_code?.toUpperCase()}</p>
                      {order.shipping_address.phone && (
                        <p className="text-sm text-muted-foreground">
                          Phone: {order.shipping_address.phone}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No shipping address</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {order.payments?.[0] ? (
                    <div className="space-y-2">
                      <p className="font-medium">
                        {order.payments[0].provider_id === 'stripe' ? 'Credit Card' : order.payments[0].provider_id}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Amount: {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: order.currency_code?.toUpperCase() || 'USD'
                        }).format(order.payments[0].amount / 100)}
                      </p>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Paid
                      </Badge>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No payment information</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="font-medium">Order Placed</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {order.status !== 'pending' && (
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <div>
                        <p className="font-medium">Order Confirmed</p>
                        <p className="text-sm text-muted-foreground">
                          Payment processed successfully
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
          </div>
  )
}