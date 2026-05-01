import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type ConsumePrescriptionQuantityInput = {
  prescription_id: string
  quantity: number
}

export const consumePrescriptionQuantityStep = createStep(
  "consume-prescription-quantity",
  async (input: ConsumePrescriptionQuantityInput, { container }) => {
    const prescriptionService = container.resolve("prescriptions")

    // Retrieve current prescription
    const prescription = await prescriptionService.retrievePrescription(input.prescription_id)

    const newRemainingQuantity = prescription.remaining_quantity - input.quantity

    // Update the remaining quantity
    const updatedPrescription = await prescriptionService.updatePrescriptions({
      id: input.prescription_id,
      remaining_quantity: newRemainingQuantity,
    })

    return new StepResponse(updatedPrescription, {
      prescription_id: input.prescription_id,
      original_quantity: prescription.remaining_quantity,
      consumed_quantity: input.quantity,
    })
  },
  async (compensationData, { container }) => {
    if (!compensationData) {
      return
    }

    const prescriptionService = container.resolve("prescriptions")

    // Restore the original quantity
    await prescriptionService.updatePrescriptions({
      id: compensationData.prescription_id,
      remaining_quantity: compensationData.original_quantity,
    })
  }
)
