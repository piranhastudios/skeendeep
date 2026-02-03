'use client'
import { HttpTypes } from "@medusajs/types"
import { Package, Heart, Settings, MapPin, CreditCard, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import LocalizedClientLink from "@/components/common/localized-client-link"
import { signOut } from "@/lib/data/customer"
import { useState, useEffect } from "react"
import { listOrders } from "@/lib/data/orders"
import { Calendar } from "@medusajs/icons"

interface AccountDashboardProps {
  customer: HttpTypes.StoreCustomer
}

const AccountDashboard = ({ customer }: AccountDashboardProps) => {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderData = await listOrders()
        setOrders(orderData?.slice(0, 3) || [])
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchOrders()
  }, [])

  const quickLinks = [
    {
      name: "Orders",
      href: "/account/orders", 
      icon: Package,
      description: "Track and manage your orders",
      count: orders.length
    },
    {
      name: "Appointments",
      href: "/account/appointments",
      icon: Calendar,
      description: "Manage your appointments"
    },
    {
      name: "Addresses",
      href: "/account/addresses",
      icon: MapPin,
      description: "Manage shipping addresses"
    },
    {
      name: "Payment",
      href: "/account/payment",
      icon: CreditCard, 
      description: "Payment methods & billing"
    },
    {
      name: "Settings",
      href: "/account/settings",
      icon: Settings,
      description: "Account preferences"
    },
    {
      name: "Wishlist", 
      href: "/account/wishlist",
      icon: Heart,
      description: "Saved items"
    }
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
      window.location.href = "/"
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight">
                Welcome back, {customer.first_name}
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your account and track your orders
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link) => {
              const Icon = link.icon
              return (
                <LocalizedClientLink key={link.name} href={link.href}>
                  <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border hover:border-accent/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                              <Icon className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                              <h3 className="font-medium text-foreground">{link.name}</h3>
                              {link.count && (
                                <Badge variant="secondary" className="text-xs">
                                  {link.count}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{link.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </LocalizedClientLink>
              )
            })}
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <LocalizedClientLink href="/account/orders">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </LocalizedClientLink>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 animate-pulse">
                      <div className="h-12 w-12 bg-muted rounded" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-muted rounded w-1/3" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order, index) => (
                    <div key={order.id}>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">Order #{order.display_id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()} • {order.status}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: order.currency_code?.toUpperCase() || 'USD'
                            }).format(order.total)}
                          </p>
                          <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                      {index < orders.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-foreground mb-2">No orders yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start exploring our curated collection
                  </p>
                  <LocalizedClientLink href="/store">
                    <Button>Shop Now</Button>
                  </LocalizedClientLink>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Personal Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">Name:</span> {customer.first_name} {customer.last_name}</p>
                      <p><span className="text-muted-foreground">Email:</span> {customer.email}</p>
                      {customer.phone && (
                        <p><span className="text-muted-foreground">Phone:</span> {customer.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Account Status</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">Member since:</span> {customer.created_at ? new Date(customer.created_at).toLocaleDateString() : 'Unknown'}</p>
                      <p><span className="text-muted-foreground">Total orders:</span> {orders.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default AccountDashboard