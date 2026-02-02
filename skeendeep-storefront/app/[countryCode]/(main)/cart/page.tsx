"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X, ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-store"
import LocalizedClientLink from "@/components/common/localized-client-link"

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart()

  const shipping = items.length > 0 ? 25.00 : 0
  const tax = totalPrice * 0.08
  const total = totalPrice + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
          <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-serif font-semibold text-foreground mb-3">
                Your cart is empty
              </h1>
              <p className="text-muted-foreground mb-8">
                Looks like you haven&apos;t added any items to your cart yet.
              </p>
              <Button asChild className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          </div>
        </main>
              </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-8 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Back link */}
          <Link 
            href="/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-8">
            Shopping Cart
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-4 md:gap-6 p-4 bg-card rounded-xl border border-border"
                >
                  {/* Image */}
                  <Link href={`/products/${item.slug}`} className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    <Image
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link href={`/products/${item.slug}`}>
                          <h3 className="font-medium text-foreground hover:underline">
                            {item.title}
                          </h3>
                        </Link>
                        {item.variant?.title && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.variant.title}
                          </p>
                        )}
                        {item.variant?.options && item.variant.options.length > 0 && (
                          <p className="text-sm text-muted-foreground">
                            {item.variant.options.map(opt => opt.value).join(', ')}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-semibold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-semibold text-lg text-foreground">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="flex gap-2 mb-6">
                  <Input 
                    placeholder="Promo code" 
                    className="flex-1"
                  />
                  <Button variant="outline">Apply</Button>
                </div>

                <LocalizedClientLink href="/checkout">
                  <Button className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90">
                    Checkout
                  </Button>
                </LocalizedClientLink>

                <p className="mt-4 text-xs text-center text-muted-foreground">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
          </div>
  )
}
