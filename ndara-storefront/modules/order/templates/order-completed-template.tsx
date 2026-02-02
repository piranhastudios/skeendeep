import { Heading, Button } from "@medusajs/ui"
import { cookies as nextCookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {Text} from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="py-8 min-h-[calc(100vh-64px)] bg-ui-bg-subtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="bg-white rounded-lg shadow-sm p-8 space-y-8"
          data-testid="order-complete-container"
        >
          <div className="text-center border-b border-ui-border-base pb-6">
            <Heading
              level="h1"
              className="text-3xl font-bold text-ui-fg-base mb-2"
            >
              Thank you!
            </Heading>
            <Text className="text-lg text-ui-fg-subtle">
              Your order was placed successfully.
            </Text>
          </div>
          
          <OrderDetails order={order} />
          
          <div className="space-y-6">
            <Heading level="h2" className="text-xl font-semibold text-ui-fg-base border-b border-ui-border-base pb-3">
              Order Summary
            </Heading>
            <Items order={order} />
            <CartTotals totals={order} />
          </div>
          
          <ShippingDetails order={order} />
          <PaymentDetails order={order} />
          <Help />
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-ui-border-base">
            <LocalizedClientLink href="/" className="flex-1">
              <Button variant="secondary" className="w-full">
                Continue Shopping
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/account/orders" className="flex-1">
              <Button className="w-full">
                View My Orders
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}