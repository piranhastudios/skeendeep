import { defineLink } from "@medusajs/framework/utils"
import ProductModule from "@medusajs/medusa/product"
import PrescriptionModule from "../modules/prescriptions"

export default defineLink(
  PrescriptionModule.linkable.prescription,
  ProductModule.linkable.product
)
