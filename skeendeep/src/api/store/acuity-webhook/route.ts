import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { APPOINTMENT_MODULE } from "../../../modules/appointments"
import AppointmentModuleService from "../../../modules/appointments/service"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const appointmentService: AppointmentModuleService = req.scope.resolve(APPOINTMENT_MODULE)

  // Process the incoming webhook data
  const { body } = req
  console.log("Received Acuity Webhook:", body)

  // Here you would typically validate the webhook, extract relevant information,
  // and update your appointments in the database accordingly.
  // For example:
  // if (body.type === "appointment.created") {
  //   await appointmentService.createAppointment({
  //     customer_id: body.data.customer_id,
  //     datetime: body.data.datetime,
  //     // ... other fields
  //   })
  // }  
  res.sendStatus(200);
}
