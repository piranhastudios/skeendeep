import { model } from "@medusajs/framework/utils"

const Appointment = model.define("appointment", {
  id: model.id().primaryKey(),
  customer_id: model.text().nullable(), // Storing as text (uuid)
  first_name: model.text(),
  last_name: model.text(),
  email: model.text(),
  phone: model.text().nullable(),
  datetime: model.dateTime(),
  end_datetime: model.dateTime().nullable(),
  timezone: model.text().nullable(),
  duration_minutes: model.number().nullable(),
  price: model.bigNumber().nullable(), // numeric -> bigNumber
  paid: model.boolean().default(false),
  amount_paid: model.bigNumber().nullable(),
  appointment_type: model.text().nullable(),
  appointment_type_id: model.number().nullable(),
  forms: model.json().nullable(),
  labels: model.json().nullable(),
  addon_ids: model.array().nullable(), 
  raw_payload: model.json(),
  // Add other fields mapped from payload
  calendar: model.text().nullable(),
  calendar_id: model.number().nullable(),
  can_client_cancel: model.boolean().nullable(),
  can_client_reschedule: model.boolean().nullable(),
  location: model.text().nullable(),
  notes: model.text().nullable(),
  confirmation_page: model.text().nullable(),
})

export default Appointment
