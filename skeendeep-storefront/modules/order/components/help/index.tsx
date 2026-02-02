import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div className="bg-ui-bg-field rounded-lg p-6 text-center">
      <Heading className="text-lg font-semibold text-ui-fg-base mb-4">Need Help?</Heading>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <LocalizedClientLink 
          href="/contact" 
          className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover font-medium"
        >
          Contact Support
        </LocalizedClientLink>
        <LocalizedClientLink 
          href="/contact" 
          className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover font-medium"
        >
          Returns & Exchanges
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Help