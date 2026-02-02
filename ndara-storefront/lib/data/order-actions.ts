import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

export const reorderItems = async (order: HttpTypes.StoreOrder, countryCode: string) => {
  try {
    if (!order.items) return { success: false, error: "No items in order" }

    const results = []
    
    for (const item of order.items) {
      if (item.variant_id) {
        try {
          const result = await addToCart({
            variantId: item.variant_id,
            quantity: item.quantity,
            countryCode,
          })
          results.push(result)
        } catch (error) {
          console.error(`Failed to add item ${item.id} to cart:`, error)
        }
      }
    }

    return { 
      success: results.length > 0,
      message: `${results.length} items added to cart`,
      results 
    }
  } catch (error) {
    console.error("Error reordering items:", error)
    return { success: false, error: "Failed to add items to cart" }
  }
}

export const generateInvoiceUrl = (orderId: string) => {
  // This would typically generate a secure URL to download the invoice
  // For now, we'll create a placeholder
  return `/api/orders/${orderId}/invoice`
}

export const getTrackingUrl = (order: HttpTypes.StoreOrder) => {
  // This would typically use the shipping carrier's tracking API
  // For now, we'll return a placeholder
  const trackingNumber = order.shipping_methods?.[0]?.data?.tracking_number
  if (trackingNumber) {
    return `https://www.fedex.com/apps/fedextrack/?tracknumbers=${trackingNumber}`
  }
  return null
}