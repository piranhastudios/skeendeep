import { AuthenticatedMedusaRequest, MedusaResponse, MedusaRequest } from "@medusajs/framework/http"
import { PRESCRIPTION_MODULE } from "../../../modules/prescriptions"
import PrescriptionModuleService from "../../../modules/prescriptions/service"
import validatePrescriptionWorkflow from "../../../workflows/validate-prescription-workflow"
import { ValidatePrescriptionSchema } from "./middlewares"

// GET /store/prescriptions - List customer's own prescriptions
export const GET = async (req: AuthenticatedMedusaRequest, res: MedusaResponse) => {
  const { actor_id, actor_type } = req.auth_context || {}

  if (actor_type !== "customer" || !actor_id) {
    return res.status(401).json({ message: "Not authenticated" })
  }

  const query = req.scope.resolve("query")

  const { data: prescriptions } = await query.graph({
    entity: "prescription",
    fields: [
      "id",
      "product_id",
      "diagnosis",
      "usage_instructions",
      "expires_at",
      "quantity_limit",
      "remaining_quantity",
      "prescribed_at",
      "is_active",
      "product.id",
      "product.title",
      "product.thumbnail",
      "product.handle",
    ],
    filters: {
      customer_id: actor_id,
    },
    pagination: {
      order: { prescribed_at: "DESC" },
    },
  })

  res.json({
    prescriptions,
    count: prescriptions.length,
  })
}
