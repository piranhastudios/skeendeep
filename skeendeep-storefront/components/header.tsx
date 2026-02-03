"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Search, ShoppingBag, User, Menu, X, Minus, Plus, Package, Heart, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-store"
import { useAuth } from "@/lib/auth-store"
import { products } from "@/lib/products"
import LocalizedClientLink from "@/components/common/localized-client-link"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about" },
  { name: "Testimonials", href: "/testimonials" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [cartHovered, setCartHovered] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  
  const searchInputRef = useRef<HTMLInputElement>(null)
  const cartTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const accountTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const pathname = usePathname()
  const router = useRouter()
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart()
  const { user, isAuthenticated, logout } = useAuth()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  // Close search on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false)
        setSearchQuery("")
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  // Filter products based on search
  const searchResults = searchQuery.length > 1
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : []

  const handleCartEnter = () => {
    if (cartTimeoutRef.current) clearTimeout(cartTimeoutRef.current)
    setCartHovered(true)
  }

  const handleCartLeave = () => {
    cartTimeoutRef.current = setTimeout(() => {
      setCartHovered(false)
    }, 200)
  }

  const handleAccountEnter = () => {
    if (accountTimeoutRef.current) clearTimeout(accountTimeoutRef.current)
    setAccountOpen(true)
  }

  const handleAccountLeave = () => {
    accountTimeoutRef.current = setTimeout(() => {
      setAccountOpen(false)
    }, 200)
  }

  const handleAccountClick = () => {
    if (isAuthenticated) {
      router.push("/account")
    } else {
      router.push("/auth")
    }
  }

  const handleLogout = () => {
    logout()
    setAccountOpen(false)
    router.push("/")
  }

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50">
        {/* Mobile: Smaller curved tab */}
        <svg 
          className="absolute inset-x-0 top-0 w-full md:hidden pointer-events-none"
          viewBox="0 0 390 70"
          preserveAspectRatio="none"
          fill="white"
          style={{ height: '70px' }}
        >
          <path d="
            M0,0 
            L0,8 
            L30,8
            C45,8 65,14 85,25
            C105,36 125,52 195,52
            L195,52
            C265,52 285,36 305,25
            C325,14 345,8 360,8
            L390,8 
            L390,0 
            Z
          " />
        </svg>

        {/* Desktop/Tablet: Curved tab - responsive sizing */}
        <svg 
          className="absolute inset-x-0 top-0 w-full hidden md:block lg:hidden pointer-events-none"
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          fill="white"
          style={{ height: '56px' }}
        >
          <path d="
            M0,0 
            L0,8 
            L180,8
            C220,8 240,10 260,28
            C280,46 300,52 340,52
            L1100,52
            C1140,52 1160,46 1180,28
            C1200,10 1220,8 1260,8
            L1440,8 
            L1440,0 
            Z
          " />
        </svg>

        {/* Large Desktop: Narrower curved tab */}
        <svg 
          className="absolute inset-x-0 top-0 w-full hidden lg:block pointer-events-none"
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          fill="white"
          style={{ height: '56px' }}
        >
          <path d="
            M0,0 
            L0,8 
            L340,8
            C380,8 400,10 420,28
            C440,46 460,52 500,52
            L940,52
            C980,52 1000,46 1020,28
            C1040,10 1060,8 1100,8
            L1440,8 
            L1440,0 
            Z
          " />
        </svg>

        <div className="mx-auto max-w-7xl px-4 md:px-6 pt-3 md:pt-4">
          {/* Mobile Navigation */}
          <nav className="flex md:hidden items-center justify-between relative">
            {/* Centered Logo on mobile */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo.svg"
                  alt="NDARA"
                  width={120}
                  height={48}
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Empty left space for balance */}
            <div className="w-10" />

            {/* Right: Menu toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-foreground hover:bg-transparent transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5 transition-transform duration-300 rotate-90" /> : <Menu className="h-5 w-5 transition-transform duration-300" />}
              <span className="sr-only">Menu</span>
            </Button>
          </nav>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-between relative">
            {/* Logo - sits directly on hero */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.svg"
                alt="NDARA"
                width={100}
                height={100}
                className="h-11 w-auto"
              />
            </Link>

            {/* Desktop Navigation - Centered under the white tab */}
            <div className="flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <LocalizedClientLink key={link.name} href={link.href} className={`text-sm transition-colors whitespace-nowrap ${
                      isActive(link.href) 
                        ? "text-foreground font-semibold" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                </LocalizedClientLink>
              ))}
            </div>

            {/* Right Icons - sits directly on hero */}
            <div className="flex items-center gap-1">
              <LocalizedClientLink href="/book">
                <Button
                  size={"sm"}
                  className="hover:cursor-pointer rounded-full"
                >
                  Book an Appointment
                </Button>
              </LocalizedClientLink>
              {/* Search Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-foreground/70 hover:text-foreground hover:bg-transparent"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" strokeWidth={1.5} />
                <span className="sr-only">Search</span>
              </Button>

              {/* Cart Button with Hover Popup */}
              <div 
                className="relative"
                onMouseEnter={handleCartEnter}
                onMouseLeave={handleCartLeave}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-foreground/70 hover:text-foreground hover:bg-transparent relative"
                  onClick={() => router.push("/cart")}
                >
                  <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium">
                      {totalItems}
                    </span>
                  )}
                  <span className="sr-only">Cart</span>
                </Button>

                {/* Cart Popup */}
                {cartHovered && (
                  <div 
                    className="absolute top-full right-0 mt-2 w-80 bg-card rounded-xl border border-border shadow-lg overflow-hidden"
                    onMouseEnter={handleCartEnter}
                    onMouseLeave={handleCartLeave}
                  >
                    {items.length === 0 ? (
                      <div className="p-6 text-center">
                        <ShoppingBag className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                        <p className="text-muted-foreground text-sm">Your cart is empty</p>
                      </div>
                    ) : (
                      <>
                        <div className="max-h-72 overflow-y-auto">
                          {items.map((item) => (
                            <div key={item.id} className="flex gap-3 p-3 border-b border-border last:border-0">
                              <Link href={`/products/${item.slug}`} className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                                <Image
                                  src={item.thumbnail || "/placeholder.svg"}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                />
                              </Link>
                              <div className="flex-1 min-w-0">
                                <Link href={`/products/${item.slug}`} className="text-sm font-medium text-foreground hover:underline line-clamp-1">
                                  {item.title}
                                </Link>
                                {item.variant?.title && (
                                  <p className="text-xs text-muted-foreground">{item.variant.title}</p>
                                )}
                                <p className="text-xs text-muted-foreground mt-0.5">${item.price.toFixed(2)}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className="ml-auto text-muted-foreground hover:text-foreground"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-3 bg-secondary/50 border-t border-border">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-muted-foreground">Subtotal</span>
                            <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                          </div>
                          <Button 
                            className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
                            onClick={() => router.push("/cart")}
                          >
                            View Cart
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Account Button with Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleAccountEnter}
                onMouseLeave={handleAccountLeave}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-foreground/70 hover:text-foreground hover:bg-transparent"
                  onClick={handleAccountClick}
                >
                  <User className="h-5 w-5" strokeWidth={1.5} />
                  <span className="sr-only">Account</span>
                </Button>

                {/* Account Dropdown */}
                {accountOpen && (
                  <div 
                    className="absolute top-full right-0 mt-2 w-56 bg-card rounded-xl border border-border shadow-lg overflow-hidden"
                    onMouseEnter={handleAccountEnter}
                    onMouseLeave={handleAccountLeave}
                  >
                    {isAuthenticated && user ? (
                      <>
                        <div className="p-4 border-b border-border">
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="py-2">
                          <Link 
                            href="/account" 
                            className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                          >
                            <User className="w-4 h-4" />
                            My Account
                          </Link>
                          <Link 
                            href="/account/orders" 
                            className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                          >
                            <Package className="w-4 h-4" />
                            Orders
                          </Link>
                          <Link 
                            href="/account/wishlist" 
                            className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                            Wishlist
                          </Link>
                          <Link 
                            href="/account/settings" 
                            className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </Link>
                        </div>
                        <div className="border-t border-border py-2">
                          <button 
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-secondary transition-colors w-full"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground mb-3">
                          Sign in to access your account
                        </p>
                        <Button 
                          className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
                          onClick={() => router.push("/auth")}
                        >
                          Sign In
                        </Button>
                        <p className="text-xs text-center text-muted-foreground mt-3">
                          Don&apos;t have an account?{" "}
                          <Link href="/auth" className="text-accent hover:underline">
                            Sign up
                          </Link>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg z-50 mx-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex flex-col gap-1 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm transition-all duration-200 ease-in-out py-2 px-3 rounded-lg ${
                      isActive(link.href) 
                        ? "text-foreground font-semibold bg-secondary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="border-t border-border mt-2 pt-2">
                  <Link
                    href="/cart"
                    className="flex items-center gap-3 text-sm py-2 px-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Cart ({totalItems})
                  </Link>
                  <Link
                    href={isAuthenticated ? "/account" : "/auth"}
                    className="flex items-center gap-3 text-sm py-2 px-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    {isAuthenticated ? "Account" : "Sign In"}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setSearchOpen(false)
              setSearchQuery("")
            }}
          />
          
          {/* Search Panel */}
          <div className="absolute inset-x-0 top-0 bg-background">
            <div className="container mx-auto px-4 md:px-6 py-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 text-lg rounded-full border-2 focus-visible:ring-accent"
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    setSearchOpen(false)
                    setSearchQuery("")
                  }}
                  className="flex-shrink-0"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Search Results */}
              {searchQuery.length > 1 && (
                <div className="mt-6">
                  {searchResults.length > 0 ? (
                    <>
                      <p className="text-sm text-muted-foreground mb-4">
                        {searchResults.length} results for &quot;{searchQuery}&quot;
                      </p>
                      <div className="grid gap-4">
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary transition-colors"
                            onClick={() => {
                              setSearchOpen(false)
                              setSearchQuery("")
                            }}
                          >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-foreground">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                            <span className="font-semibold text-foreground">
                              ${product.price.toFixed(2)}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
                            setSearchOpen(false)
                            setSearchQuery("")
                          }}
                        >
                          View all results
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        No results found for &quot;{searchQuery}&quot;
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Try searching for something else
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Links when no search */}
              {searchQuery.length <= 1 && (
                <div className="mt-8">
                  <p className="text-sm font-medium text-foreground mb-4">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {["Armchair", "Lamp", "Bed", "Mirror", "Dining Table"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-4 py-2 rounded-full bg-secondary text-sm text-foreground hover:bg-secondary/80 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
