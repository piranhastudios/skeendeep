import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { PRESCRIPTION_MODULE } from "../../../../modules/prescriptions"
import PrescriptionModuleService from "../../../../modules/prescriptions/service"
import updatePrescriptionWorkflow from "../../../../workflows/update-prescription-workflow"
import deletePrescriptionWorkflow from "../../../../workflows/delete-prescription-workflow"
import { UpdatePrescriptionSchema } from "../middlewares"

// GET /admin/prescriptions/:id - Get single prescription details
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id } = req.params
  const query = req.scope.resolve("query")

  const { data: prescriptions } = await query.graph({
    entity: "prescription",
    fields: [
      "id",
      "customer_id",
      "product_id",
      "diagnosis",
      "usage_instructions",
      "admin_notes",
      "expires_at",
      "quantity_limit",
      "remaining_quantity",
      "prescribed_by",
      "prescribed_at",
      "is_active",
      "created_at",
      "updated_at",
      "customer.*",
      "product.*",
    ],
    filters: { id },
  })

  if (!prescriptions || prescriptions.length === 0) {
    return res.status(404).json({ message: "Prescription not found" })
  }

  res.json({ prescription: prescriptions[0] })
}

// POST /admin/prescriptions/:id - Update prescription
export const POST = async (
  req: MedusaRequest<UpdatePrescriptionSchema>,
  res: MedusaResponse
) => {
  const { id } = req.params

  const { result } = await updatePrescriptionWorkflow(req.scope).run({
    input: {
      id,
      ...req.validatedBody,
      expires_at: req.validatedBody.expires_at
        ? new Date(req.validatedBody.expires_at)
        : undefined,
    },
  })

  res.json({ prescription: result })
}

// DELETE /admin/prescriptions/:id - Delete prescription
export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id } = req.params

  await deletePrescriptionWorkflow(req.scope).run({
    input: { id },
  })

  res.status(200).json({ id, deleted: true })
}
