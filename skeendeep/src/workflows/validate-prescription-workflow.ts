import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { validatePrescriptionStep } from "./steps/validate-prescription"

type ValidatePrescriptionWorkflowInput = {
  customer_id: string
  product_id: string
  quantity?: number
}

export const validatePrescriptionWorkflow = createWorkflow(
  "validate-prescription",
  function (input: ValidatePrescriptionWorkflowInput) {
    const result = validatePrescriptionStep(input)

    return new WorkflowResponse(result)
  }
)

export default validatePrescriptionWorkflow
