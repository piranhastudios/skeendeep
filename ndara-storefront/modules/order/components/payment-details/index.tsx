import { Container, Heading, Text } from "@medusajs/ui"

import { isStripeLike, paymentInfoMap } from "@lib/constants"
import Divider from "@modules/common/components/divider"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0].payments?.[0]

  return (
    <div className="space-y-6">
      <Heading level="h2" className="text-xl font-semibold text-ui-fg-base border-b border-ui-border-base pb-3">
        Payment Information
      </Heading>
      
      {payment && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Text className="font-medium text-ui-fg-base">
              Payment Method
            </Text>
            <Text
              className="text-ui-fg-subtle"
              data-testid="payment-method"
            >
              {paymentInfoMap[payment.provider_id]?.title || payment.provider_id}
            </Text>
          </div>
          
          <div className="space-y-2">
            <Text className="font-medium text-ui-fg-base">
              Payment Details
            </Text>
            <div className="flex items-center gap-3">
              {paymentInfoMap[payment.provider_id]?.icon && (
                <Container className="flex items-center justify-center h-8 w-8 bg-ui-bg-field rounded">
                  {paymentInfoMap[payment.provider_id].icon}
                </Container>
              )}
              <Text className="text-ui-fg-subtle" data-testid="payment-amount">
                {isStripeLike(payment.provider_id) && payment.data?.card_last4
                  ? `**** **** **** ${payment.data.card_last4}`
                  : `${convertToLocale({
                      amount: payment.amount,
                      currency_code: order.currency_code,
                    })} paid on ${new Date(
                      payment.created_at ?? ""
                    ).toLocaleDateString()}`}
              </Text>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentDetails