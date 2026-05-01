import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type UpdatePrescriptionInput = {
  id: string
  diagnosis?: string
  usage_instructions?: string
  admin_notes?: string | null
  expires_at?: Date | null
  quantity_limit?: number
  is_active?: boolean
}

export const updatePrescriptionStep = createStep(
  "update-prescription",
  async (input: UpdatePrescriptionInput, { container }) => {
    const prescriptionService = container.resolve("prescriptions")

    // Retrieve the current prescription to store for compensation
    const originalPrescription = await prescriptionService.retrievePrescription(input.id)

    const updatedPrescription = await prescriptionService.updatePrescriptions({
      id: input.id,
      diagnosis: input.diagnosis,
      usage_instructions: input.usage_instructions,
      admin_notes: input.admin_notes,
      expires_at: input.expires_at,
      quantity_limit: input.quantity_limit,
      is_active: input.is_active,
    })

    return new StepResponse(updatedPrescription, {
      id: originalPrescription.id,
      diagnosis: originalPrescription.diagnosis,
      usage_instructions: originalPrescription.usage_instructions,
      admin_notes: originalPrescription.admin_notes,
      expires_at: originalPrescription.expires_at,
      quantity_limit: originalPrescription.quantity_limit,
      is_active: originalPrescription.is_active,
    })
  },
  async (originalData, { container }) => {
    if (!originalData) {
      return
    }

    const prescriptionService = container.resolve("prescriptions")
    await prescriptionService.updatePrescriptions(originalData)
  }
)
