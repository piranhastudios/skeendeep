"use client"
import Spinner from "@/components/common/icons/spinner"
import { cn } from "@/lib/utils"
import Script from "next/script"
import { useState } from "react"

const APPOINTMENT_TYPES = [
  { id: "96099928", short: "Aesthetics", label: "Aesthetics Consultation" },
  { id: "21013705", short: "Dermatology", label: "Dermatology Consultation" },
] as const

export default function BookingPage() {
  const [loading, setLoading] = useState(true)
  const [appointmentType, setAppointmentType] = useState<string>(
    APPOINTMENT_TYPES[0].id
  )

  const selectType = (id: string) => {
    if (id === appointmentType) return
    setLoading(true)
    setAppointmentType(id)
  }

  return (
    <div className="min-h-screen overflow-hidden bg-white border-0 shadow-none">
      <div className="container mx-auto flex justify-center px-6 pt-10">
        <div className="flex w-full sm:w-auto rounded-full border border-border p-1 bg-secondary">
          {APPOINTMENT_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => selectType(type.id)}
              aria-pressed={appointmentType === type.id}
              aria-label={type.label}
              className={cn(
                "flex-1 whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium transition-colors",
                appointmentType === type.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="sm:hidden">{type.short}</span>
              <span className="hidden sm:inline">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      )}
      <div
        className={`w-full relative overflow-hidden scrollbar-hide ${
          loading ? "invisible h-0" : ""
        }`}
      >
        <iframe
          key={appointmentType}
          src={`https://app.acuityscheduling.com/schedule.php?owner=22271606&ref=embedded_csp&appointmentType=${appointmentType}`}
          title="Schedule Appointment"
          onLoad={() => setLoading(false)}
          className="w-full min-h-screen border-0 -mt-[60px] overflow-hidden scrollbar-hide"
        />
      </div>
      <Script src="https://embed.acuityscheduling.com/js/embed.js" />
    </div>
  )
}
