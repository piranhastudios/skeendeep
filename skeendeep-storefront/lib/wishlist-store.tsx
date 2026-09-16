"use client"

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export interface WishlistItem {
  id: string
  variantId: string
  handle: string
  name: string
  thumbnail: string | null
  price: number
  currency_code: string
}

interface WishlistContextValue {
  items: WishlistItem[]
  isInWishlist: (variantId: string) => boolean
  toggleWishlist: (item: WishlistItem) => void
  removeFromWishlist: (variantId: string) => void
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined)

const STORAGE_KEY = "skeendeep-wishlist"

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as WishlistItem[]
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch {
      // ignore corrupted storage
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage may be unavailable; keep state in memory only
    }
  }, [items])

  const isInWishlist = useCallback(
    (variantId: string) => items.some((i) => i.variantId === variantId),
    [items]
  )

  const toggleWishlist = useCallback((item: WishlistItem) => {
    setItems((prev) =>
      prev.some((i) => i.variantId === item.variantId)
        ? prev.filter((i) => i.variantId !== item.variantId)
        : [...prev, item]
    )
  }, [])

  const removeFromWishlist = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId))
  }, [])

  return (
    <WishlistContext.Provider
      value={{ items, isInWishlist, toggleWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}