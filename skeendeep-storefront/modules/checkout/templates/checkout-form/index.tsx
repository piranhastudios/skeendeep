import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
          Delivery Information
        </h3>
        <Addresses cart={cart} customer={customer} />
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
          Shipping Method
        </h3>
        <Shipping cart={cart} availableShippingMethods={shippingMethods} />
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
          Payment
        </h3>
        <Payment cart={cart} availablePaymentMethods={paymentMethods} />
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <Review cart={cart} />
      </div>
    </div>
  )
}
