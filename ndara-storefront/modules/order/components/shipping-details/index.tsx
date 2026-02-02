import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

import Divider from "@modules/common/components/divider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div className="space-y-6">
      <Heading level="h2" className="text-xl font-semibold text-ui-fg-base border-b border-ui-border-base pb-3">
        Delivery Information
      </Heading>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="space-y-2"
          data-testid="shipping-address-summary"
        >
          <Text className="font-medium text-ui-fg-base">
            Shipping Address
          </Text>
          <div className="text-ui-fg-subtle space-y-1">
            <Text>
              {order.shipping_address?.first_name}{" "}
              {order.shipping_address?.last_name}
            </Text>
            <Text>
              {order.shipping_address?.address_1}
            </Text>
            {order.shipping_address?.address_2 && (
              <Text>
                {order.shipping_address.address_2}
              </Text>
            )}
            <Text>
              {order.shipping_address?.postal_code}, {order.shipping_address?.city}
            </Text>
            <Text>
              {order.shipping_address?.country_code?.toUpperCase()}
            </Text>
          </div>
        </div>

        <div
          className="space-y-2"
          data-testid="shipping-contact-summary"
        >
          <Text className="font-medium text-ui-fg-base">Contact</Text>
          <div className="text-ui-fg-subtle space-y-1">
            {order.shipping_address?.phone && (
              <Text>{order.shipping_address.phone}</Text>
            )}
            <Text>{order.email}</Text>
          </div>
        </div>

        <div
          className="space-y-2"
          data-testid="shipping-method-summary"
        >
          <Text className="font-medium text-ui-fg-base">Shipping Method</Text>
          <Text className="text-ui-fg-subtle">
            {(order as any).shipping_methods[0]?.name}
          </Text>
          <Text className="font-medium">
            {convertToLocale({
              amount: order.shipping_methods?.[0].total ?? 0,
              currency_code: order.currency_code,
            })}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails