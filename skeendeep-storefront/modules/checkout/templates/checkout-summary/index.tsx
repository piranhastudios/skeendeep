import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-8">
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
          Order Summary
        </h2>
        
        <div className="space-y-6">
          <ItemsPreviewTemplate cart={cart} />
          
          <div className="border-t border-border pt-6">
            <DiscountCode cart={cart} />
          </div>
          
          <div className="border-t border-border pt-6">
            <CartTotals totals={cart} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
