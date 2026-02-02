"use client"

import { HttpTypes } from "@medusajs/types"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import LocalizedClientLink from "@/components/common/localized-client-link"
import { convertToLocale } from "@/lib/util/money"
import { listProducts } from "@lib/data/products"

export function ProductsSection({ collections = [], region }: {
  collections?: HttpTypes.StoreCollection[]
  region?: HttpTypes.StoreRegion
}) {
  const [activeCollectionIndex, setActiveCollectionIndex] = useState(0)
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([])
  const [loading, setLoading] = useState(false)
  
  // Use the first 3 collections as categories, or fallback to empty array
  const availableCollections = collections.slice(0, 3)
  const currentCollection = availableCollections[activeCollectionIndex]

  // Fetch products for the current collection
  useEffect(() => {
    const fetchProducts = async () => {
      if (!currentCollection || !region) return
      
      setLoading(true)
      try {
        const { response } = await listProducts({
          queryParams: {
            collection_id: [currentCollection.id],
            limit: 6,
          },
          regionId: region.id,
        })
        setProducts(response.products)
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [currentCollection, region])

	return (
		<section className="py-16 md:py-24 bg-background">
			<div className="container mx-auto px-6">
				{/* Header */}
				<div className="text-center mb-12">
					<h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground tracking-tight">
						THOUGHTFULLY CURATED
						<br />
						COLLECTION
					</h2>
					<p className="mt-4 text-muted-foreground text-sm">
						Each piece selected for its proportion, materiality, and ability to shape meaningful spaces.
					</p>

					{/* Category Tabs */}
					<div className="flex flex-wrap justify-center gap-3 mt-8">
						{availableCollections.map((collection, index) => (
							<Button
								key={collection.id}
								variant={
									activeCollectionIndex === index ? "default" : "outline"
								}
								className={cn(
									"rounded-full px-6 py-2 text-sm font-medium transition-all",
									activeCollectionIndex === index
										? "bg-foreground text-background"
										: "border-foreground/20 text-foreground hover:bg-foreground hover:text-background"
								)}
								onClick={() => setActiveCollectionIndex(index)}
							>
								{collection.title}
							</Button>
						))}
					</div>
				</div>

				{/* Products Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{loading ? (
						// Loading skeleton
						[...Array(6)].map((_, i) => (
							<div key={i} className="space-y-3">
								<div className="aspect-square rounded-lg bg-muted animate-pulse" />
								<div className="space-y-2">
									<div className="h-4 bg-muted rounded animate-pulse" />
									<div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
								</div>
							</div>
						))
					) : products.length > 0 ? (
						products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))
					) : (
						<div className="col-span-full text-center py-12">
							<p className="text-muted-foreground">No products found in this collection.</p>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

function ProductCard({ product }: { product: HttpTypes.StoreProduct }) {
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
					aria-label="Add to wishlist"
					onClick={(e) => e.preventDefault()}
				>
					<Heart className="w-5 h-5 text-foreground" />
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
								currency_code: product.variants[0].calculated_price.currency_code || 'USD',
							})
							: 'Price unavailable'
						}
					</span>
				</div>
			</div>
		</LocalizedClientLink>
	)
}
