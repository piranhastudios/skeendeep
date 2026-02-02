"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Package, Calendar, Truck, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Spinner } from "@/components/ui/spinner"
import LocalizedClientLink from "@/components/common/localized-client-link"
import { retrieveCustomer } from "@/lib/data/customer"
import { listOrders } from "@/lib/data/orders"
import { HttpTypes } from "@medusajs/types"

export default function OrdersPage() {
  const [customer, setCustomer] = useState<HttpTypes.StoreCustomer | null>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerData = await retrieveCustomer()
        if (!customerData) {
          router.push('/account')
          return
        }
        setCustomer(customerData)

        const orderData = await listOrders()
        console.log("Order data:", orderData) // Debug log
        setOrders(orderData || [])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-[50vh]">
          <Spinner />
        </div>
      </div>
    )
  }

  if (!customer) {
    return null
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending':
        return <Calendar className="w-4 h-4 text-yellow-600" />
      default:
        return <Truck className="w-4 h-4 text-blue-600" />
    }
  }

  const getStatusVariant = (status: string): "default" | "secondary" => {
    return status === 'completed' ? 'default' : 'secondary'
  }

  return (
    <div className="min-h-screen bg-background">
      
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <LocalizedClientLink href="/account">
                  <Button variant="ghost" className="gap-2 p-0 h-auto text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Account
                  </Button>
                </LocalizedClientLink>
                <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight mt-4">
                  Order History
                </h1>
                <p className="text-muted-foreground mt-2">
                  Track and manage your past orders
                </p>
              </div>
            </div>

            {/* Orders List */}
            {orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Order #{order.display_id}</CardTitle>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{new Date(order.created_at).toLocaleDateString()}</span>
                            <span>•</span>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(order.status)}
                              <Badge variant={getStatusVariant(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-lg">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: order.currency_code?.toUpperCase() || 'USD'
                            }).format(order.total)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'}
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      {/* Order Items */}
                      <div className="space-y-4">
                        {order.items?.slice(0, 3).map((item: any) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary">
                              {item.thumbnail ? (
                                <img
                                  src={item.thumbnail}
                                  alt={item.title}
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <div className="flex items-center justify-center w-full h-full">
                                  <Package className="w-6 h-6 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">{item.title}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} • {new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: order.currency_code?.toUpperCase() || 'USD'
                                }).format((item.unit_price || 0))}
                              </p>
                            </div>
                          </div>
                        ))}
                        
                        {order.items && order.items.length > 3 && (
                          <p className="text-sm text-muted-foreground">
                            + {order.items.length - 3} more {order.items.length - 3 === 1 ? 'item' : 'items'}
                          </p>
                        )}
                      </div>

                      <Separator className="my-4" />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          {order.shipping_address && (
                            <p className="text-sm text-muted-foreground">
                              Delivered to: {order.shipping_address.first_name} {order.shipping_address.last_name}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <LocalizedClientLink href={`/account/orders/${order.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </LocalizedClientLink>
                          {order.status === 'completed' && (
                            <Button size="sm">
                              Reorder
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-16">
                  <Package className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                  <h3 className="font-serif text-2xl font-medium text-foreground mb-4">
                    No Orders Yet
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    You haven't placed any orders yet. Start exploring our curated collection to find pieces that speak to your style.
                  </p>
                  <LocalizedClientLink href="/store">
                    <Button>
                      Start Shopping
                    </Button>
                  </LocalizedClientLink>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
      
          </div>
  )
}