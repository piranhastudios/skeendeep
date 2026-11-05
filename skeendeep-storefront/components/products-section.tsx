"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import LocalizedClientLink from "@/components/common/localized-client-link"
import { convertToLocale } from "@/lib/util/money"
import { useWishlist, type WishlistItem } from "@/lib/wishlist-store"

export function ProductsSection({ products = [], region }: {
  products?: HttpTypes.StoreProduct[]
  region?: HttpTypes.StoreRegion
}) {
  // Only the newest three products are shown (fetched on the server, newest first)
  const latest = products.slice(0, 3)

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground tracking-tight">
            LATEST FROM
            <br />
            SKEENDEEP
          </h2>
          <p className="mt-4 text-muted-foreground text-sm">
            The newest additions to our range, each chosen for how well it works on the skin.
          </p>
        </div>

        {/* Products Grid */}
        {latest.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latest.map((product) => (
              <ProductCard key={product.id} product={product} region={region} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products to show yet.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <LocalizedClientLink href="/products">
            <Button
              variant="outline"
              className="rounded-full px-8 py-6 text-sm font-medium border-foreground/20 text-foreground hover:bg-foreground hover:text-background"
            >
              View all products
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

function ProductCard({
  product,
  region,
}: {
  product: HttpTypes.StoreProduct
  region?: HttpTypes.StoreRegion
}) {
  const { isInWishlist, toggleWishlist } = useWishlist()

  const variant = product.variants?.[0]
  const price = variant?.calculated_price
  const currency_code = price?.currency_code || region?.currency_code || "gbp"
  const item: WishlistItem = {
    id: product.id,
    variantId: variant?.id ?? product.id,
    handle: product.handle ?? "",
    name: product.title,
    thumbnail: product.thumbnail ?? null,
    price: price?.calculated_amount ?? 0,
    currency_code,
  }
  const inWishlist = isInWishlist(item.variantId)

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block">
      {/* Image Container */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary mb-4">
        <Image
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Wishlist Button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault()
            toggleWishlist(item)
          }}
        >
          <Heart className={`w-5 h-5 ${inWishlist ? "fill-accent text-accent" : "text-foreground"}`} />
        </button>
      </div>

      {/* Product Info */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-sm text-foreground tracking-wide">
            {product.title}
          </h3>
          <span className="font-semibold text-foreground">
            {product.variants &&
             product.variants.length > 0 &&
             product.variants[0]?.calculated_price?.calculated_amount
              ? convertToLocale({
                amount: product.variants[0].calculated_price.calculated_amount,
                currency_code: product.variants[0].calculated_price.currency_code || currency_code,
              })
              : "Price unavailable"
            }
          </span>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
