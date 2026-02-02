"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart, ShoppingBag, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-store"
import { useCart } from "@/lib/cart-store"
import { cn } from "@/lib/utils"
import LocalizedClientLink from "@/components/common/localized-client-link"

const initialWishlist = [
	{
		id: 3,
		name: "THEODORE ARMCHAIR",
		slug: "theodore-armchair",
		price: 995.99,
		rating: 4.8,
		reviews: 1024,
		category: "Living Room",
		image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
	},
	{
		id: 5,
		name: "BRODIE MIRROR",
		slug: "brodie-mirror",
		price: 546.99,
		rating: 4.5,
		reviews: 842,
		category: "Living Room",
		image: "https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?w=400&q=80",
	},
	{
		id: 7,
		name: "OSLO DINING TABLE",
		slug: "oslo-dining-table",
		price: 1890.99,
		rating: 4.9,
		reviews: 445,
		category: "Dining Room",
		image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&q=80",
	},
]

export default function WishlistPage() {
	const { isAuthenticated } = useAuth()
	const { addItem } = useCart()
	const router = useRouter()
	const [wishlist, setWishlist] = useState(initialWishlist)

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/auth")
		}
	}, [isAuthenticated, router])

	if (!isAuthenticated) {
		return null
	}

	const removeFromWishlist = (id: number) => {
		setWishlist((prev) => prev.filter((item) => item.id !== id))
	}

	const handleAddToCart = (item: typeof initialWishlist[0]) => {
		addItem(item.id.toString())
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

					{wishlist.length === 0 ? (
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
								<Link href="/products">Browse Products</Link>
							</Button>
						</div>
					) : (
						<>
							<p className="text-muted-foreground mb-6">
								{wishlist.length} items saved
							</p>
							<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
								{wishlist.map((item) => (
									<div key={item.id} className="group">
										{/* Image Container */}
										<div className="relative aspect-square rounded-lg overflow-hidden bg-secondary mb-4">
											<Link href={`/products/${item.slug}`}>
												<Image
													src={item.image || "/placeholder.svg"}
													alt={item.name}
													fill
													className="object-cover group-hover:scale-105 transition-transform duration-500"
												/>
											</Link>

											{/* Remove Button */}
											<button
												onClick={() => removeFromWishlist(item.id)}
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
											<span className="text-xs text-muted-foreground uppercase tracking-wider">
												{item.category}
											</span>
											<div className="flex items-center justify-between mb-2 mt-1">
												<Link href={`/products/${item.slug}`}>
													<h3 className="font-medium text-sm text-foreground tracking-wide hover:underline">
														{item.name}
													</h3>
												</Link>
												<span className="font-semibold text-foreground">
													${item.price.toFixed(2)}
												</span>
											</div>

											{/* Rating */}
											<div className="flex items-center gap-2">
												<div className="flex items-center gap-0.5">
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															className={cn(
																"w-3.5 h-3.5",
																i < Math.floor(item.rating)
																	? "fill-accent text-accent"
																	: "fill-muted text-muted"
															)}
														/>
													))}
												</div>
												<span className="text-xs text-muted-foreground">
													{item.reviews} Reviews
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
					</div>
	)
}
