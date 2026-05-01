import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type CreatePrescriptionInput = {
  customer_id: string
  product_id: string
  diagnosis: string
  usage_instructions: string
  admin_notes?: string | null
  expires_at?: Date | null
  quantity_limit: number
  prescribed_by: string
}

export const createPrescriptionStep = createStep(
  "create-prescription",
  async (input: CreatePrescriptionInput, { container }) => {
    const prescriptionService = container.resolve("prescriptions")

    const prescription = await prescriptionService.createPrescriptions({
      customer_id: input.customer_id,
      product_id: input.product_id,
      diagnosis: input.diagnosis,
      usage_instructions: input.usage_instructions,
      admin_notes: input.admin_notes,
      expires_at: input.expires_at,
      quantity_limit: input.quantity_limit,
      remaining_quantity: input.quantity_limit, // Initialize with limit
      prescribed_by: input.prescribed_by,
      prescribed_at: new Date(),
      is_active: true,
    })

    return new StepResponse(prescription, prescription.id)
  },
  async (prescriptionId, { container }) => {
    if (!prescriptionId) {
      return
    }

    const prescriptionService = container.resolve("prescriptions")
    await prescriptionService.deletePrescriptions(prescriptionId)
  }
)
