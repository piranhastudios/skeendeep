"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-store"
import { useCart } from "@/lib/cart-store"
import { useWishlist } from "@/lib/wishlist-store"
import { convertToLocale } from "@/lib/util/money"
import LocalizedClientLink from "@/components/common/localized-client-link"

export default function WishlistPage() {
	const { isAuthenticated } = useAuth()
	const { addItem } = useCart()
	const { items, removeFromWishlist } = useWishlist()
	const router = useRouter()

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/auth")
		}
	}, [isAuthenticated, router])

	if (!isAuthenticated) {
		return null
	}

	const handleAddToCart = (item: { variantId: string }) => {
		addItem(item.variantId)
	}

	return (
		<div className="min-h-screen bg-background">
			<Header />
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

					<h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-8">
						Wishlist
					</h1>

					{items.length === 0 ? (
						<div className="text-center py-20">
							<div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
								<Heart className="w-10 h-10 text-muted-foreground" />
							</div>
							<h2 className="text-xl font-semibold text-foreground mb-2">
								Your wishlist is empty
							</h2>
							<p className="text-muted-foreground mb-6">
								Save items you love by clicking the heart icon on any product.
							</p>
							<Button
								asChild
								className="rounded-full bg-foreground text-background hover:bg-foreground/90"
							>
								<LocalizedClientLink href="/products">Browse Products</LocalizedClientLink>
							</Button>
						</div>
					) : (
						<>
							<p className="text-muted-foreground mb-6">
								{items.length} items saved
							</p>
							<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
								{items.map((item) => (
									<div key={item.variantId} className="group">
										{/* Image Container */}
										<div className="relative aspect-square rounded-lg overflow-hidden bg-secondary mb-4">
											<LocalizedClientLink href={`/products/${item.handle}`}>
												<Image
													src={item.thumbnail || "/placeholder.svg"}
													alt={item.name}
													fill
													className="object-cover group-hover:scale-105 transition-transform duration-500"
												/>
											</LocalizedClientLink>

											{/* Remove Button */}
											<button
												onClick={() => removeFromWishlist(item.variantId)}
												className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
												aria-label="Remove from wishlist"
											>
												<X className="w-5 h-5 text-foreground" />
											</button>

											{/* Add to Cart Button */}
											<div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
												<Button
													className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
													onClick={() => handleAddToCart(item)}
												>
													<ShoppingBag className="w-4 h-4 mr-2" />
													Add to Cart
												</Button>
											</div>
										</div>

										{/* Product Info */}
										<div>
											<div className="flex items-center justify-between mb-2 mt-1">
												<LocalizedClientLink href={`/products/${item.handle}`}>
													<h3 className="font-medium text-sm text-foreground tracking-wide hover:underline">
														{item.name}
													</h3>
												</LocalizedClientLink>
												<span className="font-semibold text-foreground">
													{convertToLocale({
														amount: item.price,
														currency_code: item.currency_code,
													})}
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</main>
			<Footer />
		</div>
	)
}