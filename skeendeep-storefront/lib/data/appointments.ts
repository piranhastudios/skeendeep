"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions } from "./cookies"

export interface StoreAppointment {
  id: string
  datetime: string
  end_datetime: string | null
  appointment_type: string
  location: string | null
  notes: string | null
  duration_minutes: number
  price: number
  status: string
  calendar: string
  // Add other fields as needed matching the module model
}

export const listAppointments = async () => {
  const authHeaders = await getAuthHeaders()

  if (!authHeaders) return { appointments: [], count: 0 }

  const headers = {
    ...authHeaders,
  }

  const next = {
    ...(await getCacheOptions("appointments")),
  }

  return await sdk.client.fetch<{ appointments: StoreAppointment[], count: number }>(
    `/store/appointments`,
    {
      method: "GET",
      headers,
      next,
    }
  )
}
