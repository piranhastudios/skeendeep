import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type DeletePrescriptionInput = {
  id: string
}

export const deletePrescriptionStep = createStep(
  "delete-prescription",
  async (input: DeletePrescriptionInput, { container }) => {
    const prescriptionService = container.resolve("prescriptions")

    // Retrieve the prescription before deletion for compensation
    const prescription = await prescriptionService.retrievePrescription(input.id)

    await prescriptionService.deletePrescriptions(input.id)

    return new StepResponse({ success: true }, prescription)
  },
  async (deletedPrescription, { container }) => {
    if (!deletedPrescription) {
      return
    }

    const prescriptionService = container.resolve("prescriptions")
    
    // Recreate the prescription
    await prescriptionService.createPrescriptions({
      id: deletedPrescription.id,
      customer_id: deletedPrescription.customer_id,
      product_id: deletedPrescription.product_id,
      diagnosis: deletedPrescription.diagnosis,
      usage_instructions: deletedPrescription.usage_instructions,
      admin_notes: deletedPrescription.admin_notes,
      expires_at: deletedPrescription.expires_at,
      quantity_limit: deletedPrescription.quantity_limit,
      remaining_quantity: deletedPrescription.remaining_quantity,
      prescribed_by: deletedPrescription.prescribed_by,
      prescribed_at: deletedPrescription.prescribed_at,
      is_active: deletedPrescription.is_active,
    })
  }
)
