"use server"

interface AcuityAppointment {
  id: number
  firstName: string
  lastName: string
  phone: string
  email: string
  date: string
  time: string
  endTime: string
  dateCreated: string
  datetime: string
  price: string
  paid: string
  amountPaid: string
  type: string
  appointmentTypeID: number
  addonIDs: number[]
  category: string
  duration: string
  calendar: string
  calendarID: number
  certificate: string
  confirmationPage: string
  location: string
  notes: string
  timezone: string
  uID: number
  isRecurrence: boolean
  isReschedule: boolean
  rescheduledFrom: number | null
  rescheduledTo: number | null
  canClientCancel: boolean
  canClientReschedule: boolean
  labels: { id: number; name: string; color: string }[] | null
  forms: any[]
  formsText: string
}

export async function getCustomerAppointments(email: string): Promise<{ success: boolean; data?: AcuityAppointment[]; error?: string }> {
  try {
    const auth = process.env.ACUITY_BASIC_AUTH_TOKEN
    
    if (!auth) {
      console.error("Missing ACUITY_BASIC_AUTH_TOKEN")
      return { success: false, error: "Configuration error" }
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: auth
      }
    };

    // Filter by email via API to reduce data transfer and ensure we get relevant records
    const response = await fetch(`https://acuityscheduling.com/api/v1/appointments?max=100&canceled=false&excludeForms=false&direction=DESC&email=${encodeURIComponent(email)}`, options)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Acuity API Error:", response.status, errorText)
      return { success: false, error: `Failed to fetch appointments: ${response.status}` }
    }

    const data = await response.json()
    return { success: true, data }

  } catch (error) {
    console.error("Server Action Error:", error)
    return { success: false, error: "Internal server error" }
  }
}
