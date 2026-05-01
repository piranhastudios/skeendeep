import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { createPrescriptionStep } from "./steps/create-prescription"

type CreatePrescriptionWorkflowInput = {
  customer_id: string
  product_id: string
  diagnosis: string
  usage_instructions: string
  admin_notes?: string | null
  expires_at?: Date | null
  quantity_limit: number
  prescribed_by: string
}

export const createPrescriptionWorkflow = createWorkflow(
  "create-prescription",
  function (input: CreatePrescriptionWorkflowInput) {
    const prescription = createPrescriptionStep(input)

    return new WorkflowResponse(prescription)
  }
)

export default createPrescriptionWorkflow
