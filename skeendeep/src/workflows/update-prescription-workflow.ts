import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { updatePrescriptionStep } from "./steps/update-prescription"

type UpdatePrescriptionWorkflowInput = {
  id: string
  diagnosis?: string
  usage_instructions?: string
  admin_notes?: string | null
  expires_at?: Date | null
  quantity_limit?: number
  is_active?: boolean
}

export const updatePrescriptionWorkflow = createWorkflow(
  "update-prescription",
  function (input: UpdatePrescriptionWorkflowInput) {
    const prescription = updatePrescriptionStep(input)

    return new WorkflowResponse(prescription)
  }
)

export default updatePrescriptionWorkflow
