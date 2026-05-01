import { model } from "@medusajs/framework/utils"

const Prescription = model.define("prescription", {
  id: model.id().primaryKey(),
  customer_id: model.text(), // Link to customer (required)
  product_id: model.text(), // Link to product (required)
  diagnosis: model.text(), // Medical condition or diagnosis
  usage_instructions: model.text(), // How to use the prescribed treatment
  admin_notes: model.text().nullable(), // Internal notes for admins
  expires_at: model.dateTime().nullable(), // When prescription expires
  quantity_limit: model.number(), // Maximum quantity that can be ordered
  remaining_quantity: model.number(), // Quantity still available to order
  prescribed_by: model.text(), // Admin user ID who prescribed
  prescribed_at: model.dateTime(), // When the prescription was created
  is_active: model.boolean().default(true), // Whether prescription is currently active
})

export default Prescription
