import { defineMiddlewares } from "@medusajs/medusa"
import { authenticate } from "@medusajs/medusa"

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/appointments",
      middlewares: [
        authenticate("customer", ["session", "bearer"]),
      ],
    },
  ],
})
