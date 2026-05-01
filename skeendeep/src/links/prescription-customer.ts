import { defineLink } from "@medusajs/framework/utils"
import CustomerModule from "@medusajs/medusa/customer"
import PrescriptionModule from "../modules/prescriptions"

export default defineLink(
  PrescriptionModule.linkable.prescription,
  CustomerModule.linkable.customer
)
