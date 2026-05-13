import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { APPOINTMENT_MODULE } from "../../../modules/appointments"
import AppointmentModuleService from "../../../modules/appointments/service"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const appointmentService: AppointmentModuleService = req.scope.resolve(APPOINTMENT_MODULE)
  const customerService = req.scope.resolve(Modules.CUSTOMER)

  const rawPayloadStr = (req.body as any)?.raw_payload
  if (!rawPayloadStr) {
    return res.status(400).json({ error: "Missing raw_payload" })
  }

  let payload: any
  try {
    payload = JSON.parse(rawPayloadStr)
  } catch {
    return res.status(400).json({ error: "Invalid raw_payload JSON" })
  }

  let customerId: string | null = null
  if (payload.email) {
    try {
      const customers = await customerService.listCustomers({ email: payload.email })
      if (customers.length > 0) {
        customerId = customers[0].id
      } else {
        const customer = await customerService.createCustomers({
          email: payload.email,
          first_name: payload.firstName,
          last_name: payload.lastName,
          phone: payload.phone,
        })
        customerId = customer.id
      }
    } catch (e) {
      console.error(`Customer lookup/create failed for ${payload.email}`, e)
    }
  }

  const result = await appointmentService.upsertFromWebhook(payload, customerId)
  const appt = Array.isArray(result) ? result[0] : result
  res.status(200).json({ received: true, id: appt?.id })
}
