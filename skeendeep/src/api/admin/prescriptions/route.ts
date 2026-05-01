import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { PRESCRIPTION_MODULE } from "../../../modules/prescriptions"
import PrescriptionModuleService from "../../../modules/prescriptions/service"
import createPrescriptionWorkflow from "../../../workflows/create-prescription-workflow"
import updatePrescriptionWorkflow from "../../../workflows/update-prescription-workflow"
import deletePrescriptionWorkflow from "../../../workflows/delete-prescription-workflow"
import { CreatePrescriptionSchema, UpdatePrescriptionSchema, GetPrescriptionsSchema } from "./middlewares"
import { Modules } from "@medusajs/framework/utils"

// GET /admin/prescriptions - List all prescriptions
export const GET = async (
  req: MedusaRequest<GetPrescriptionsSchema>,
  res: MedusaResponse
) => {
  const prescriptionService: PrescriptionModuleService = req.scope.resolve(PRESCRIPTION_MODULE)
  const query = req.scope.resolve("query")

  const { customer_id, product_id, is_active, limit, offset, order } = req.validatedQuery

  // Build filters from query params
  const filters: any = {}
  if (customer_id) filters.customer_id = customer_id
  if (product_id) filters.product_id = product_id
  if (typeof is_active === "boolean") filters.is_active = is_active

  // Determine sorting order
  let sortOrder: Record<string, any> = { created_at: "DESC" }
  if (order && typeof order === "object" && !Array.isArray(order)) {
    sortOrder = order
  }

  // Get prescriptions with linked customer and product data
  const { data: prescriptions, metadata } = await query.graph({
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
      "product.id",
      "product.title",
      "product.thumbnail",
    ],
    filters,
    pagination: {
      skip: offset || 0,
      take: limit || 20,
      order: sortOrder,
    },
  })

  res.json({
    prescriptions,
    count: metadata?.count || prescriptions.length,
    offset: offset || 0,
    limit: limit || 20,
  })
}

// POST /admin/prescriptions - Create new prescription
export const POST = async (
  req: MedusaRequest<CreatePrescriptionSchema>,
  res: MedusaResponse
) => {
  const { result } = await createPrescriptionWorkflow(req.scope).run({
    input: {
      ...req.validatedBody,
      expires_at: req.validatedBody.expires_at
        ? new Date(req.validatedBody.expires_at)
        : null,
    },
  })

  res.status(201).json({ prescription: result })
}
