import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import validatePrescriptionWorkflow from "../../../../workflows/validate-prescription-workflow"
import { ValidatePrescriptionSchema } from "../middlewares"

// POST /store/prescriptions/validate - Validate if customer has valid prescription
export const POST = async (
  req: AuthenticatedMedusaRequest<ValidatePrescriptionSchema>,
  res: MedusaResponse
) => {
  const { actor_id, actor_type } = req.auth_context || {}

  if (actor_type !== "customer" || !actor_id) {
    return res.status(401).json({
      valid: false,
      reason: "Not authenticated",
    })
  }

  const { product_id, quantity } = req.validatedBody

  const { result } = await validatePrescriptionWorkflow(req.scope).run({
    input: {
      customer_id: actor_id,
      product_id,
      quantity: quantity || 1,
    },
  })

  res.json(result)
}
