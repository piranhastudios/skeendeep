"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { HttpTypes } from "@medusajs/types"
import { addToCart, updateLineItem, deleteLineItem, retrieveCart } from "@/lib/data/cart"
import { usePathname } from "next/navigation"

export interface CartItem {
  id: string
  variantId: string
  slug: string
  title: string
  thumbnail: string | null
  price: number
  currency_code: string
  quantity: number
  variant?: {
    title?: string
    options?: Array<{
      option_id: string
      value: string
    }>
  }
}

interface CartContextType {
  items: CartItem[]
  addItem: (variantId: string, quantity?: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  updateQuantity: (lineId: string, quantity: number) => Promise<void>
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isLoading: boolean
  refreshCart: () => Promise<void>
  cart: HttpTypes.StoreCart | null
  lastAddedItem: CartItem | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null)
  const pathname = usePathname()
  
  // Extract country code from pathname
  const countryCode = pathname.split('/')[1] || 'us'

  // Convert Medusa cart items to our CartItem format
  const items: CartItem[] = cart?.items?.map(item => ({
    id: item.id,
    variantId: item.variant_id || '',
    slug: item.product?.handle || '',
    title: item.product?.title || item.title || '',
    thumbnail: item.product?.thumbnail || item.thumbnail || null,
    price: (item.unit_price || 0),
    currency_code: cart.region?.currency_code || 'USD',
    quantity: item.quantity || 0,
    variant: {
      title: item.variant?.title,
      options: item.variant?.options?.map(opt => ({
        option_id: opt.option?.id || '',
        value: opt.value || '',
      })),
    },
  })) || []

  // Refresh cart from server
  const refreshCart = useCallback(async () => {
    try {
      const fetchedCart = await retrieveCart()
      setCart(fetchedCart)
    } catch (error) {
      console.error("Error refreshing cart:", error)
    }
  }, [])

  // Load cart on mount
  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true)
    try {
      await addToCart({ variantId, quantity, countryCode })
      await refreshCart()
      
      // Find the added item after cart refresh
      const updatedCart = await retrieveCart()
      if (updatedCart?.items) {
        const addedItem = updatedCart.items.find(item => item.variant_id === variantId)
        if (addedItem) {
          const cartItem: CartItem = {
            id: addedItem.id,
            variantId: addedItem.variant_id || '',
            slug: addedItem.product?.handle || '',
            title: addedItem.product?.title || addedItem.title || '',
            thumbnail: addedItem.product?.thumbnail || addedItem.thumbnail || null,
            price: (addedItem.unit_price || 0),
            currency_code: updatedCart.region?.currency_code || 'USD',
            quantity: quantity,
            variant: {
              title: addedItem.variant?.title,
              options: addedItem.variant?.options?.map(opt => ({
                option_id: opt.option?.id || '',
                value: opt.value || '',
              })),
            },
          }
          setLastAddedItem(cartItem)
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsLoading(false)
    }
  }, [countryCode, refreshCart])

  const removeItem = useCallback(async (lineId: string) => {
    setIsLoading(true)
    try {
      await deleteLineItem(lineId)
      await refreshCart()
    } catch (error) {
      console.error("Error removing from cart:", error)
    } finally {
      setIsLoading(false)
    }
  }, [refreshCart])

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      return removeItem(lineId)
    }
    setIsLoading(true)
    try {
      await updateLineItem({ lineId, quantity })
      await refreshCart()
    } catch (error) {
      console.error("Error updating quantity:", error)
    } finally {
      setIsLoading(false)
    }
  }, [removeItem, refreshCart])

  const clearCart = useCallback(() => {
    setCart(null)
    // Note: Medusa doesn't have a direct clear cart endpoint,
    // so we'd need to remove items individually if needed
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = (cart?.total || 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isLoading,
        refreshCart,
        cart,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
