import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { APPOINTMENT_MODULE } from "../../../modules/appointments"
import AppointmentModuleService from "../../../modules/appointments/service"

export const GET = async (req: AuthenticatedMedusaRequest, res: MedusaResponse) => {
  // Medusa v2 Auth Context
  const { actor_id, actor_type } = req.auth_context || {}

  if (actor_type !== "customer" || !actor_id) {
    return res.status(401).json({ message: "Not authenticated" })
  }

  const appointmentService: AppointmentModuleService = req.scope.resolve(APPOINTMENT_MODULE)
  
  // Use the standard list method provided by MedusaService, filtering by customer_id
  const [appointments, count] = await appointmentService.listAndCountAppointments({
    customer_id: actor_id,
  }, {
    order: { datetime: "DESC" }
  })

  res.json({ appointments, count })
}
