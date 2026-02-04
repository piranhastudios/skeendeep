import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { APPOINTMENT_MODULE } from "../../../modules/appointments"
import AppointmentModuleService from "../../../modules/appointments/service"
import { Modules } from "@medusajs/framework/utils"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const appointmentService: AppointmentModuleService = req.scope.resolve(APPOINTMENT_MODULE)
  const customerService = req.scope.resolve(Modules.CUSTOMER)

  // Normalize payload to array to allow single object or array
  const payload = Array.isArray(req.body) ? req.body : [req.body]

  const results: any[] = []

  for (const appointment of payload) {
    let customerId: string | null = null
    
    // Try to find customer by email
    if (appointment.email) {
      try {
        const customers = await customerService.listCustomers({ email: appointment.email })
        if (customers.length > 0) {
          customerId = customers[0].id
        }
      } catch (e) {
        console.error(`Failed to lookup customer for email ${appointment.email}`, e)
      }
    }

    const result = await appointmentService.upsertFromWebhook(appointment, customerId)
    results.push(result)
  }

  res.status(200).json({ received: results.length })
}
