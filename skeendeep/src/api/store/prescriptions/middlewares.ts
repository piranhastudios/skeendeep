import { MiddlewareRoute, validateAndTransformBody } from "@medusajs/framework"
import { z } from "zod"

// Schema for validating prescription
export const ValidatePrescriptionSchema = z.object({
  product_id: z.string(),
  quantity: z.number().int().positive().optional().default(1),
})

export type ValidatePrescriptionSchema = z.infer<typeof ValidatePrescriptionSchema>

export const storePrescriptionMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/store/prescriptions/validate",
    method: "POST",
    middlewares: [validateAndTransformBody(ValidatePrescriptionSchema)],
  },
]
