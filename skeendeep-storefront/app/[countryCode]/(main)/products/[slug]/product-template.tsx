"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Heart, Minus, Plus, ChevronRight, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@/lib/util/money"
import LocalizedClientLink from "@/components/common/localized-client-link"
import ProductActions from "@/components/product-actions"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

export default function ProductTemplate({
  product,
  region,
  countryCode,
  images
}: ProductTemplateProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<"description" | "details" | "reviews">("description")

  const displayImages = images?.length > 0 ? images : product.images || []

  return (
    <div className="min-h-screen bg-background">

      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <LocalizedClientLink href="/" className="hover:text-foreground transition-colors">
            Home
          </LocalizedClientLink>
          <ChevronRight className="w-4 h-4" />
          <LocalizedClientLink href="/products" className="hover:text-foreground transition-colors">
            Products
          </LocalizedClientLink>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{product.title}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
                <Image
                  src={displayImages[selectedImage]?.url || product.thumbnail || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
                <button 
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-6 h-6 text-foreground" />
                </button>
              </div>
              {displayImages.length > 1 && (
                <div className="flex gap-3">
                  {displayImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "relative w-20 h-20 rounded-lg overflow-hidden bg-secondary transition-all",
                        selectedImage === index 
                          ? "ring-2 ring-foreground ring-offset-2" 
                          : "opacity-70 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={`${product.title} view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                {product.collection?.title || "Product"}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mt-2 tracking-tight">
                {product.title}
              </h1>

              <p className="text-3xl font-semibold text-foreground mt-6">
                {product.variants && 
                 product.variants.length > 0 && 
                 product.variants[0]?.calculated_price?.calculated_amount
                  ? convertToLocale({
                      amount: product.variants[0].calculated_price.calculated_amount,
                      currency_code: product.variants[0].calculated_price.currency_code || region.currency_code,
                    })
                  : 'Price unavailable'
                }
              </p>

              <p className="text-muted-foreground mt-6 leading-relaxed">
                {product.description}
              </p>

              {/* Product Actions */}
              <div className="mt-8">
                <ProductActions product={product} region={region} />
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 mt-10 pt-10 border-t border-border">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto text-foreground" />
                  <span className="text-xs text-muted-foreground mt-2 block">Free Shipping</span>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto text-foreground" />
                  <span className="text-xs text-muted-foreground mt-2 block">2 Year Warranty</span>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto text-foreground" />
                  <span className="text-xs text-muted-foreground mt-2 block">30 Day Returns</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-6">SKU: {product.handle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-6">
          {/* Tab Headers */}
          <div className="flex gap-8 border-b border-border">
            {(["description", "details", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-4 text-sm font-medium capitalize transition-colors relative",
                  activeTab === tab
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === "description" && (
              <div className="prose prose-neutral max-w-none">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                {product.material && (
                  <>
                    <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-4">Material</h3>
                    <p className="text-muted-foreground">{product.material}</p>
                  </>
                )}
              </div>
            )}

            {activeTab === "details" && (
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-serif text-xl font-medium text-foreground mb-4">Product Details</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-border">
                      <dt className="text-muted-foreground">Handle</dt>
                      <dd className="font-medium text-foreground">{product.handle}</dd>
                    </div>
                    {product.weight && (
                      <div className="flex justify-between py-2 border-b border-border">
                        <dt className="text-muted-foreground">Weight</dt>
                        <dd className="font-medium text-foreground">{product.weight}g</dd>
                      </div>
                    )}
                    {product.length && (
                      <div className="flex justify-between py-2 border-b border-border">
                        <dt className="text-muted-foreground">Length</dt>
                        <dd className="font-medium text-foreground">{product.length}cm</dd>
                      </div>
                    )}
                    {product.width && (
                      <div className="flex justify-between py-2 border-b border-border">
                        <dt className="text-muted-foreground">Width</dt>
                        <dd className="font-medium text-foreground">{product.width}cm</dd>
                      </div>
                    )}
                    {product.height && (
                      <div className="flex justify-between py-2 border-b border-border">
                        <dt className="text-muted-foreground">Height</dt>
                        <dd className="font-medium text-foreground">{product.height}cm</dd>
                      </div>
                    )}
                  </dl>
                </div>
                {product.tags && product.tags.length > 0 && (
                  <div>
                    <h3 className="font-serif text-xl font-medium text-foreground mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span 
                          key={tag.id} 
                          className="px-3 py-1 bg-secondary rounded-full text-sm text-muted-foreground"
                        >
                          {tag.value}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No reviews yet.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 rounded-full border-foreground/20 hover:bg-foreground hover:text-background bg-transparent"
                  >
                    Write a Review
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

          </div>
  )
}