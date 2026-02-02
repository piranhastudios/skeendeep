"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text, useToggleState } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address" || !cart?.shipping_address

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <h4 className="font-medium text-foreground flex items-center gap-2">
          Shipping Address
          {!isOpen && cart?.shipping_address && (
            <CheckCircleSolid className="w-5 h-5 text-green-600" />
          )}
        </h4>
        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-testid="edit-address-button"
          >
            Edit
          </button>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <h4 className="font-medium text-foreground mb-4 mt-6">
                  Billing Address
                </h4>

                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton className="mt-6" data-testid="submit-address-button">
              Continue to delivery
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-sm">
            {cart && cart.shipping_address ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div data-testid="shipping-address-summary">
                  <p className="font-medium text-foreground mb-2">Shipping Address</p>
                  <div className="space-y-1 text-muted-foreground">
                    <p>{cart.shipping_address.first_name} {cart.shipping_address.last_name}</p>
                    <p>{cart.shipping_address.address_1} {cart.shipping_address.address_2}</p>
                    <p>{cart.shipping_address.postal_code}, {cart.shipping_address.city}</p>
                    <p>{cart.shipping_address.country_code?.toUpperCase()}</p>
                  </div>
                </div>

                <div data-testid="shipping-contact-summary">
                  <p className="font-medium text-foreground mb-2">Contact</p>
                  <div className="space-y-1 text-muted-foreground">
                    <p>{cart.shipping_address.phone}</p>
                    <p>{cart.email}</p>
                  </div>
                </div>

                <div data-testid="billing-address-summary">
                  <p className="font-medium text-foreground mb-2">Billing Address</p>
                  <div className="space-y-1 text-muted-foreground">
                    {sameAsBilling ? (
                      <p>Same as shipping address</p>
                    ) : (
                      <>
                        <p>{cart.billing_address?.first_name} {cart.billing_address?.last_name}</p>
                        <p>{cart.billing_address?.address_1} {cart.billing_address?.address_2}</p>
                        <p>{cart.billing_address?.postal_code}, {cart.billing_address?.city}</p>
                        <p>{cart.billing_address?.country_code?.toUpperCase()}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">Please enter your shipping address to continue.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Addresses
