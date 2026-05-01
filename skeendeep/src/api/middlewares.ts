import { defineMiddlewares } from "@medusajs/medusa"
import { authenticate } from "@medusajs/medusa"
import { adminPrescriptionMiddlewares } from "./admin/prescriptions/middlewares"
import { storePrescriptionMiddlewares } from "./store/prescriptions/middlewares"

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/appointments",
      middlewares: [
        authenticate("customer", ["session", "bearer"]),
      ],
    },
    {
      matcher: "/store/prescriptions*",
      middlewares: [
        authenticate("customer", ["session", "bearer"]),
      ],
    },
    ...adminPrescriptionMiddlewares,
    ...storePrescriptionMiddlewares,
  ],
})
