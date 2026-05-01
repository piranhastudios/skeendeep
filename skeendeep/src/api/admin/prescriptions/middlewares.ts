import { MiddlewareRoute, validateAndTransformBody, validateAndTransformQuery } from "@medusajs/framework"
import { createFindParams } from "@medusajs/medusa/api/utils/validators"
import { z } from "zod"

// Schema for creating a new prescription
export const CreatePrescriptionSchema = z.object({
  customer_id: z.string(),
  product_id: z.string(),
  diagnosis: z.string(),
  usage_instructions: z.string(),
  admin_notes: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(), // ISO date string
  quantity_limit: z.number().int().positive(),
  prescribed_by: z.string(),
})

export type CreatePrescriptionSchema = z.infer<typeof CreatePrescriptionSchema>

// Schema for updating an existing prescription
export const UpdatePrescriptionSchema = z.object({
  diagnosis: z.string().optional(),
  usage_instructions: z.string().optional(),
  admin_notes: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(), // ISO date string
  quantity_limit: z.number().int().positive().optional(),
  is_active: z.boolean().optional(),
})

export type UpdatePrescriptionSchema = z.infer<typeof UpdatePrescriptionSchema>

// Schema for listing prescriptions with query params
export const GetPrescriptionsSchema = createFindParams({
  limit: 20,
  offset: 0,
}).merge(
  z.object({
    customer_id: z.string().optional(),
    product_id: z.string().optional(),
    is_active: z.preprocess(
      (val) => {
        if (val === "true") return true
        if (val === "false") return false
        return val
      },
      z.boolean().optional()
    ),
  })
)

export type GetPrescriptionsSchema = z.infer<typeof GetPrescriptionsSchema>

export const adminPrescriptionMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/prescriptions",
    method: "GET",
    middlewares: [
      validateAndTransformQuery(GetPrescriptionsSchema, {
        defaults: [
          "id",
          "customer_id",
          "product_id",
          "diagnosis",
          "expires_at",
          "quantity_limit",
          "remaining_quantity",
          "prescribed_at",
          "is_active",
        ],
        isList: true,
        defaultLimit: 20,
      }),
    ],
  },
  {
    matcher: "/admin/prescriptions",
    method: "POST",
    middlewares: [validateAndTransformBody(CreatePrescriptionSchema)],
  },
  {
    matcher: "/admin/prescriptions/:id",
    method: "POST",
    middlewares: [validateAndTransformBody(UpdatePrescriptionSchema)],
  },
]
