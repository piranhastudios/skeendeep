import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type ValidatePrescriptionInput = {
  customer_id: string
  product_id: string
  quantity?: number
}

type ValidatePrescriptionOutput = {
  valid: boolean
  reason?: string
  prescription?: any
}

export const validatePrescriptionStep = createStep(
  "validate-prescription",
  async (input: ValidatePrescriptionInput, { container }) => {
    const prescriptionService = container.resolve("prescriptions")

    // Find active prescriptions for this customer and product
    const prescriptions = await prescriptionService.listPrescriptions({
      customer_id: input.customer_id,
      product_id: input.product_id,
      is_active: true,
    })

    if (!prescriptions || prescriptions.length === 0) {
      return new StepResponse<ValidatePrescriptionOutput>({
        valid: false,
        reason: "No active prescription found for this product",
      })
    }

    const prescription = prescriptions[0]

    // Check if prescription is expired
    if (prescription.expires_at && new Date(prescription.expires_at) < new Date()) {
      return new StepResponse<ValidatePrescriptionOutput>({
        valid: false,
        reason: "Prescription has expired",
      })
    }

    // Check if there's enough remaining quantity
    const requestedQuantity = input.quantity || 1
    if (prescription.remaining_quantity < requestedQuantity) {
      return new StepResponse<ValidatePrescriptionOutput>({
        valid: false,
        reason: `Insufficient prescription quantity. Available: ${prescription.remaining_quantity}, Requested: ${requestedQuantity}`,
      })
    }

    return new StepResponse<ValidatePrescriptionOutput>({
      valid: true,
      prescription,
    })
  }
  // No compensation needed for validation (read-only operation)
)
