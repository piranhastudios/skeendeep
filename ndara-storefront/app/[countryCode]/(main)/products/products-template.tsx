"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart, SlidersHorizontal, Grid3X3, LayoutList, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@/lib/util/money"
import LocalizedClientLink from "@/components/common/localized-client-link"
import { listProducts } from "@/lib/data/products"
import { listCollections } from "@/lib/data/collections"
import { getRegion } from "@/lib/data/regions"
import { useCart } from "@/lib/cart-store"

type ProductsTemplateProps = {
  sortBy?: string
  page?: string
  category?: string
  countryCode: string
}

export default function ProductsTemplate({
  sortBy,
  page,
  category,
  countryCode,
}: ProductsTemplateProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([])
  const [collections, setCollections] = useState<HttpTypes.StoreCollection[]>([])
  const [region, setRegion] = useState<HttpTypes.StoreRegion | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeCollection, setActiveCollection] = useState(category || "all")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [sortOrder, setSortOrder] = useState(sortBy || "name")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [regionData, collectionsData, productsData] = await Promise.all([
          getRegion(countryCode),
          listCollections({ limit: "100" }),
          listProducts({
            countryCode,
            queryParams: {
              limit: 50,
              ...(activeCollection !== "all" && { collection_id: [activeCollection] }),
              ...(sortOrder && sortOrder !== "name" && { 
                order: sortOrder === "price-asc" ? "variants.calculated_price.calculated_amount" : 
                       sortOrder === "price-desc" ? "-variants.calculated_price.calculated_amount" :
                       sortOrder === "newest" ? "-created_at" : "title"
              }),
            },
          }),
        ])

        setRegion(regionData ?? null)
        setCollections(collectionsData.collections)
        setProducts(productsData.response.products)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [countryCode, activeCollection, sortOrder])

  const handleCollectionChange = (newCollection: string) => {
    setActiveCollection(newCollection)
  }

  const handleSortChange = (newSort: string) => {
    setSortOrder(newSort)
  }

  const clearFilters = () => {
    setActiveCollection("all")
    setSortOrder("name")
    setPriceRange([0, 10000])
  }

  if (!region) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      
      {/* Page Header */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight text-center">
            Our Products
          </h1>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
            Discover our curated collection of handcrafted furniture, designed to bring warmth and sophistication to your home.
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          {/* Toolbar */}
          <div className="flex flex-col gap-6 mb-10">
            {/* Top Row - Collections and Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Collections */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={activeCollection === "all" ? "default" : "outline"}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-medium transition-all",
                    activeCollection === "all"
                      ? "bg-foreground text-background"
                      : "border-foreground/20 text-foreground hover:bg-foreground hover:text-background"
                  )}
                  onClick={() => handleCollectionChange("all")}
                >
                  All Collections
                </Button>
                {collections.map((collection) => (
                  <Button
                    key={collection.id}
                    variant={activeCollection === collection.id ? "default" : "outline"}
                    className={cn(
                      "rounded-full px-5 py-2 text-sm font-medium transition-all",
                      activeCollection === collection.id
                        ? "bg-foreground text-background"
                        : "border-foreground/20 text-foreground hover:bg-foreground hover:text-background"
                    )}
                    onClick={() => handleCollectionChange(collection.id)}
                  >
                    {collection.title}
                  </Button>
                ))}
              </div>

              {/* View Toggle & Filter */}
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full border-foreground/20 bg-transparent"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4" />
                </Button>
                <div className="flex items-center border border-foreground/20 rounded-full p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("rounded-full h-8 w-8", viewMode === "grid" && "bg-foreground text-background")}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("rounded-full h-8 w-8", viewMode === "list" && "bg-foreground text-background")}
                    onClick={() => setViewMode("list")}
                  >
                    <LayoutList className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="bg-secondary/30 rounded-lg p-6 border border-border">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Sort By */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground">Sort by</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: "name", label: "Name" },
                        { value: "price-asc", label: "Price: Low to High" },
                        { value: "price-desc", label: "Price: High to Low" },
                        { value: "newest", label: "Newest" },
                      ].map((option) => (
                        <Button
                          key={option.value}
                          variant={sortOrder === option.value ? "default" : "outline"}
                          size="sm"
                          className={cn(
                            "text-xs",
                            sortOrder === option.value
                              ? "bg-foreground text-background"
                              : "border-foreground/20 text-foreground hover:bg-foreground hover:text-background"
                          )}
                          onClick={() => handleSortChange(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground">Actions</label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="border-foreground/20 text-foreground hover:bg-foreground hover:text-background w-fit"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-square rounded-lg bg-muted animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className={cn(
              "grid gap-8",
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            )}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} region={region} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found.</p>
            </div>
          )}
        </div>
      </section>

          </div>
  )
}

function ProductCard({ 
  product, 
  viewMode, 
  region 
}: { 
  product: HttpTypes.StoreProduct
  viewMode: "grid" | "list"
  region: HttpTypes.StoreRegion
}) {
  const { addItem, isLoading } = useCart()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Get the first available variant
    const variant = product.variants?.[0]
    if (!variant) return

    await addItem(variant.id, 1)
  }
  if (viewMode === "list") {
    return (
      <LocalizedClientLink href={`/products/${product.handle}`} className="flex gap-6 p-4 bg-card rounded-lg border border-border group">
        <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
          <Image
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col justify-between py-2 flex-1">
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {product.collection?.title || "Product"}
            </span>
            <h3 className="font-medium text-lg text-foreground tracking-wide mt-1">{product.title}</h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-xl text-foreground">
              {product.variants && 
               product.variants.length > 0 && 
               product.variants[0]?.calculated_price?.calculated_amount
                ? convertToLocale({
                    amount: product.variants[0].calculated_price.calculated_amount,
                    currency_code: product.variants[0].calculated_price.currency_code || region.currency_code,
                  })
                : 'Price unavailable'
              }
            </span>
            <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90" onClick={handleAddToCart} disabled={isLoading}>
              {isLoading ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </div>
      </LocalizedClientLink>
    )
  }

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary mb-4">
        <Image
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button 
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="w-5 h-5 text-foreground" />
        </button>
      </div>
      <div>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {product.collection?.title || "Product"}
        </span>
        <div className="flex items-center justify-between mb-2 mt-1">
          <h3 className="font-medium text-sm text-foreground tracking-wide">{product.title}</h3>
          <span className="font-semibold text-foreground">
            {product.variants && 
             product.variants.length > 0 && 
             product.variants[0]?.calculated_price?.calculated_amount
              ? convertToLocale({
                  amount: product.variants[0].calculated_price.calculated_amount,
                  currency_code: product.variants[0].calculated_price.currency_code || region.currency_code,
                })
              : 'Price unavailable'
            }
          </span>
        </div>
      </div>
    </LocalizedClientLink>
  )
}