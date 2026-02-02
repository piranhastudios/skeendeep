import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="bg-ui-bg-field rounded-lg p-6 space-y-4">
      <Text className="text-ui-fg-base">
        We have sent the order confirmation details to{" "}
        <span
          className="text-ui-fg-interactive font-semibold"
          data-testid="order-email"
        >
          {order.email}
        </span>
        .
      </Text>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-ui-border-base">
        <div>
          <Text className="text-sm text-ui-fg-subtle mb-1">Order Date</Text>
          <Text className="font-medium" data-testid="order-date">
            {new Date(order.created_at).toDateString()}
          </Text>
        </div>
        
        <div>
          <Text className="text-sm text-ui-fg-subtle mb-1">Order Number</Text>
          <Text className="font-medium text-ui-fg-interactive" data-testid="order-id">
            #{order.display_id}
          </Text>
        </div>
        
        {showStatus && (
          <div>
            <Text className="text-sm text-ui-fg-subtle mb-1">Status</Text>
            <div className="space-y-1">
              <Text className="text-sm">
                Order: <span className="font-medium" data-testid="order-status">
                  {formatStatus(order.fulfillment_status)}
                </span>
              </Text>
              <Text className="text-sm">
                Payment: <span className="font-medium" data-testid="order-payment-status">
                  {formatStatus(order.payment_status)}
                </span>
              </Text>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderDetails