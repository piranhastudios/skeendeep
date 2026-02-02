"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@/lib/util/money"
import { useCart } from "@/lib/cart-store"
import { cn } from "@/lib/utils"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

// Convert variant options to a keymap for comparison
const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  region,
  disabled = false,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [quantity, setQuantity] = useState(1)
  const { addItem, isLoading } = useCart()

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  // Find the selected variant based on current options
  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return product.variants?.[0]
    }

    if (product.variants.length === 1) {
      return product.variants[0]
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return Object.keys(options).every(
        (key) => variantOptions?.[key] === options[key]
      )
    })
  }, [product.variants, options])

  // Check if the selected variant is in stock
  const inStock = useMemo(() => {
    if (!selectedVariant) return false

    // If we don't manage inventory, we can always add to cart
    if (!selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant.manage_inventory &&
      (selectedVariant.inventory_quantity || 0) > 0
    ) {
      return true
    }

    return false
  }, [selectedVariant])

  // Handle option selection
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  // Handle quantity changes
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
  }

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!selectedVariant) return

    await addItem(selectedVariant.id, quantity)
  }

  const hasMultipleVariants = (product.variants?.length || 0) > 1
  const canAddToCart = selectedVariant && inStock && !disabled && !isLoading

  return (
    <div className="space-y-6">
      {/* Variant Options */}
      {hasMultipleVariants && (
        <div className="space-y-4">
          {(product.options || []).map((option) => (
            <div key={option.id} className="space-y-2">
              <h4 className="font-medium text-foreground">{option.title}</h4>
              <div className="flex flex-wrap gap-2">
                {option.values?.map((value) => (
                  <Button
                    key={value.id}
                    variant={options[option.id] === value.value ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full px-4 py-2 text-sm",
                      options[option.id] === value.value
                        ? "bg-foreground text-background"
                        : "border-foreground/20 hover:bg-foreground hover:text-background"
                    )}
                    onClick={() => setOptionValue(option.id, value.value)}
                    disabled={disabled || isLoading}
                  >
                    {value.value}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Price */}
      {selectedVariant && (
        <div className="space-y-2">
          <div className="text-2xl font-semibold text-foreground">
            {selectedVariant.calculated_price?.calculated_amount
              ? convertToLocale({
                  amount: selectedVariant.calculated_price.calculated_amount,
                  currency_code: selectedVariant.calculated_price.currency_code || region.currency_code,
                })
              : 'Price unavailable'
            }
          </div>
          {selectedVariant.calculated_price?.calculated_amount && 
           selectedVariant.calculated_price?.original_amount && 
           selectedVariant.calculated_price.calculated_amount !== selectedVariant.calculated_price.original_amount && (
            <div className="text-lg text-muted-foreground line-through">
              {convertToLocale({
                amount: selectedVariant.calculated_price.original_amount,
                currency_code: selectedVariant.calculated_price.currency_code || region.currency_code,
              })}
            </div>
          )}
        </div>
      )}

      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Quantity</label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 rounded-full border-foreground/20"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1 || disabled || isLoading}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-12 text-center font-medium text-lg">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 rounded-full border-foreground/20"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={disabled || isLoading}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        disabled={!canAddToCart}
        className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
        size="lg"
      >
        {isLoading
          ? "Adding to Cart..."
          : !selectedVariant
          ? "Select Options"
          : !inStock
          ? "Out of Stock"
          : `Add to Cart - ${quantity > 1 ? `${quantity} items` : '1 item'}`}
      </Button>

      {/* Stock Status */}
      {selectedVariant && (
        <p className="text-sm text-muted-foreground">
          {inStock ? (
            selectedVariant.inventory_quantity && selectedVariant.inventory_quantity > 0 ? (
              `${selectedVariant.inventory_quantity} in stock`
            ) : (
              "In stock"
            )
          ) : (
            "Out of stock"
          )}
        </p>
      )}
    </div>
  )
}