import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { deletePrescriptionStep } from "./steps/delete-prescription"

type DeletePrescriptionWorkflowInput = {
  id: string
}

export const deletePrescriptionWorkflow = createWorkflow(
  "delete-prescription",
  function (input: DeletePrescriptionWorkflowInput) {
    const result = deletePrescriptionStep(input)

    return new WorkflowResponse(result)
  }
)

export default deletePrescriptionWorkflow
