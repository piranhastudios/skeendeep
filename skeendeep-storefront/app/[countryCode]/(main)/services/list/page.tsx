import { Check } from "lucide-react"
import { type Metadata } from "next"
import LocalizedClientLink from "@/components/common/localized-client-link"
import { serviceList } from "@/lib/data/services"

export const metadata: Metadata = {
  title: 'Treatment List & Pricing',
  description: 'Browse our complete list of medical aesthetics treatments and services with pricing. Book your appointment today.',
}

type Appointment = {
  name: string
  duration_minutes: number
  price_gbp: number | null
  private?: boolean
  padding_before_minutes?: number
  padding_after_minutes?: number
  notes?: string
}

const Page = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight text-center">
            Treatment List & Pricing
          </h1>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
            Explore our comprehensive range of medical aesthetics treatments tailored to your needs
          </p>
        </div>
      </section>

      {/* Services Categories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="space-y-16">
            {serviceList.categories.map((category, categoryIndex) => {
              // Filter out private appointments
              const visibleAppointments = category.appointments.filter(
                (appointment: Appointment) => !appointment.private
              )

              // Skip empty categories
              if (visibleAppointments.length === 0) return null

              return (
                <div key={categoryIndex} className="space-y-8">
                  <div className="text-center md:text-left">
                    <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight">
                      {category.name}
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {visibleAppointments.map((appointment: Appointment, appointmentIndex) => (
                      <div
                        key={appointmentIndex}
                        className="bg-card border border-border rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex-1">
                            <div className="flex justify-between items-start gap-4 mb-4">
                              <h3 className="font-medium text-lg text-foreground flex-1">
                                {appointment.name}
                              </h3>
                              {appointment.price_gbp && (
                                <span className="font-serif text-2xl font-medium text-accent whitespace-nowrap">
                                  £{appointment.price_gbp}
                                </span>
                              )}
                            </div>

                            <div className="space-y-2 mb-6">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Check className="w-4 h-4 text-accent" />
                                <span>{appointment.duration_minutes} minutes</span>
                              </div>
                              {appointment.notes && (
                                <p className="text-sm text-muted-foreground italic">
                                  {appointment.notes}
                                </p>
                              )}
                            </div>
                          </div>

                          <LocalizedClientLink
                            href="/book"
                            className="inline-flex items-center justify-center rounded-full bg-foreground text-background hover:bg-foreground/90 px-6 py-3 text-sm font-medium transition-colors w-full"
                          >
                            Book Appointment
                          </LocalizedClientLink>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight">
              Not Sure Which Treatment is Right for You?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Book a consultation with Dr. Afong to discuss your skin concerns and find the perfect treatment plan.
            </p>
            <div className="mt-8">
              <LocalizedClientLink
                href="/book"
                className="inline-flex items-center justify-center rounded-full bg-foreground text-background hover:bg-foreground/90 px-8 py-3 text-sm font-medium transition-colors"
              >
                Book Consultation
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page