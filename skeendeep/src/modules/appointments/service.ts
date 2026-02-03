import { MedusaService } from "@medusajs/framework/utils"
import Appointment from "./models/appointment"

class AppointmentModuleService extends MedusaService({
  Appointment,
}){
  async upsertFromWebhook(payload: any, customerId: string | null = null) {
    // Check if appointment exists
    const existing = await this.retrieveAppointment(payload.id).catch(() => null)

    const startDate = new Date(payload.datetime)
    const durationMinutes = Number(payload.duration) || 0
    // Calculate end time properly from start + duration
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000)

    const appointmentData = {
      id: payload.id.toString(), // ensure ID is string if it's coming as number
      customer_id: customerId,
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      appointment_type: payload.type,
      appointment_type_id: payload.appointmentTypeID,
      datetime: startDate,
      end_datetime: endDate,
      timezone: payload.timezone,
      duration_minutes: durationMinutes,
      price: payload.price,
      paid: payload.paid === "yes" || payload.paid === true,
      amount_paid: payload.amountPaid,
      calendar: payload.calendar,
      calendar_id: payload.calendarID,
      can_client_cancel: payload.canClientCancel,
      can_client_reschedule: payload.canClientReschedule,
      location: payload.location,
      notes: payload.notes,
      confirmation_page: payload.confirmationPage,
      forms: payload.forms,
      labels: payload.labels,
      addon_ids: payload.addonIDs,
      raw_payload: payload,
    }

    if (existing) {
      return await this.updateAppointments(appointmentData)
    } else {
      return await this.createAppointments(appointmentData)
    }
  }
}

export default AppointmentModuleService
