"use client"
import Spinner from "@/components/common/icons/spinner"
import Script from "next/script"
import { useState } from "react"

export default function BookingPage() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="min-h-screen overflow-hidden bg-white border-0 shadow-none">
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
          src="https://app.acuityscheduling.com/schedule.php?owner=22271606&ref=embedded_csp"
          title="Schedule Appointment"
          onLoad={() => setLoading(false)}
          className="w-full min-h-screen border-0 -mt-[60px] overflow-hidden scrollbar-hide"
        />
      </div>
      <Script src="https://embed.acuityscheduling.com/js/embed.js" />
    </div>
  )
}