"use client"

import { useEffect, useState } from "react"
import { useCart } from "@/lib/cart-store"
import { CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function CartNotification() {
  const { lastAddedItem } = useCart()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (lastAddedItem) {
      setShow(true)
      const timer = setTimeout(() => setShow(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [lastAddedItem])

  if (!lastAddedItem || !show) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <div 
        className={cn(
          "bg-card border border-border rounded-lg shadow-lg p-4 max-w-sm transition-all duration-300",
          show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">Added to cart!</p>
            <div className="flex items-center gap-2 mt-1">
              {lastAddedItem.thumbnail && (
                <div className="relative w-8 h-8 rounded overflow-hidden bg-secondary flex-shrink-0">
                  <Image
                    src={lastAddedItem.thumbnail}
                    alt={lastAddedItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground truncate">
                  {lastAddedItem.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  Qty: {lastAddedItem.quantity}
                </p>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 text-muted-foreground hover:text-foreground"
            onClick={() => setShow(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}