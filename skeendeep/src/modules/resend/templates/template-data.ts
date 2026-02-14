import { BigNumberValue, CustomerDTO, OrderDTO } from "@medusajs/framework/types"

/**
 * Helper functions to transform Medusa data into template variables
 */

export function formatPrice(price: BigNumberValue, currencyCode: string): string {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
    currencyDisplay: "narrowSymbol",
  })

  if (typeof price === "number") {
    return formatter.format(price)
  }

  if (typeof price === "string") {
    return formatter.format(parseFloat(price))
  }

  return price?.toString() || "0"
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * Transform order data into template variables for order-placed template
 */
export function getOrderPlacedTemplateData(
  order: OrderDTO & { customer?: CustomerDTO }
): Record<string, any> {
  const customerName = order.customer?.first_name || order.shipping_address?.first_name || "Customer"
  
  // Format shipping address
  const shippingAddressObj = order.shipping_address
  const shippingAddress = shippingAddressObj
    ? [
        `${shippingAddressObj.first_name} ${shippingAddressObj.last_name}`,
        shippingAddressObj.address_1,
        shippingAddressObj.address_2,
        `${shippingAddressObj.city}, ${shippingAddressObj.province} ${shippingAddressObj.postal_code}`,
        shippingAddressObj.country_code?.toUpperCase(),
      ]
        .filter(Boolean)
        .join("<br>")
    : "No shipping address provided"

  // Get product details (you may need to loop through items in the HTML template)
  const firstItem = order.items?.[0]
  const productName = firstItem?.product_title || "Product"
  const productQuantity = firstItem?.quantity || 1
  const formattedPrice = firstItem?.total 
    ? formatPrice(firstItem.total, order.currency_code) 
    : "£0.00"
  const itemPrice = formattedPrice.replace("£", "") // Remove currency symbol as template adds it

  // Calculate delivery estimate (example: 5-7 business days from order date)
  const orderCreatedDate = new Date(order.created_at)
  const estimatedDeliveryStart = new Date(orderCreatedDate)
  estimatedDeliveryStart.setDate(estimatedDeliveryStart.getDate() + 5)
  const estimatedDeliveryEnd = new Date(orderCreatedDate)
  estimatedDeliveryEnd.setDate(estimatedDeliveryEnd.getDate() + 7)
  
  const deliveryEstimate = `${formatDate(estimatedDeliveryStart)} - ${formatDate(estimatedDeliveryEnd)}`

  const formattedOrderTotal = formatPrice(order.total, order.currency_code).replace("£", "")
  const trackingLink = `${process.env.STORE_URL || "https://skeendeep.com"}/account/orders/${order.id}`
  const currentYear = new Date().getFullYear()

  return {
    customer_name: customerName,
    order_number: `#${order.display_id}`,
    order_date: formatDate(order.created_at),
    product_name: productName,
    quantity: productQuantity,
    price: itemPrice,
    order_total: formattedOrderTotal,
    shipping_address: shippingAddress,
    delivery_estimate: deliveryEstimate,
    order_tracking_link: trackingLink,
    year: currentYear,
  }
}
