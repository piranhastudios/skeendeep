import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { APPOINTMENT_MODULE } from "../../../modules/appointments"
import AppointmentModuleService from "../../../modules/appointments/service"
import { Modules } from "@medusajs/framework/utils"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const appointmentService: AppointmentModuleService = req.scope.resolve(APPOINTMENT_MODULE)
  const customerService = req.scope.resolve(Modules.CUSTOMER)

  const payload = req.body

  if (!Array.isArray(payload)) {
    // If it's a single object (from common webhook tools), wrap it
    // But user code check for array. Let's support both or just array as requested.
    // User request: "if (!Array.isArray(payload)) return 400"
    // I will stick to that but also handle single object if Make.com sends one.
    // Actually, usually webhooks send one event. But the user specifically asked for array iteration.
    // I will follow the user's code structure.
     if (!Array.isArray(payload)) {
         return res.status(400).json({ message: "Expected array of appointments" })
     }
  }

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
