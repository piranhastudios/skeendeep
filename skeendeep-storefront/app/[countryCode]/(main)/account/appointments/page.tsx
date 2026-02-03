"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-store"
import { listAppointments, StoreAppointment } from "@/lib/data/appointments"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Calendar, MapPin, Clock } from "lucide-react"
import { format } from "date-fns"

interface UIAppointment {
    id: string
    date: string
    time: string
    type: string
    location: string
    notes: string
    duration: string
    status?: string
}

export default function AppointmentsPage() {
    const { user, loading: authLoading } = useAuth()
    const [appointments, setAppointments] = useState<UIAppointment[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchAppointments() {
            if (user) {
                setLoading(true)
                setError(null)
                try {
                    const { appointments: data } = await listAppointments()
                    
                    const mapped = data.map((appt: StoreAppointment) => ({
                        id: appt.id,
                        date: format(new Date(appt.datetime), "EEEE, MMMM d, yyyy"),
                        time: format(new Date(appt.datetime), "h:mm a"),
                        type: appt.appointment_type,
                        location: appt.location || "Clinic",
                        notes: appt.notes || "",
                        duration: `${appt.duration_minutes} mins`,
                        status: "Confirmed"
                    }))

                    setAppointments(mapped)
                } catch (e) {
                    console.error(e)
                    setError("Failed to load appointments")
                } finally {
                    setLoading(false)
                }
            }
        }

        if (!authLoading && user) {
            fetchAppointments()
        }
    }, [user, authLoading])

    if (authLoading) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (!user) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Access Denied</CardTitle>
                    <CardDescription>Please sign in to view your appointments.</CardDescription>
                </CardHeader>
            </Card>
        )
    }

    // Construct booking URL with pre-fill data
    const baseUrl = "https://app.acuityscheduling.com/schedule.php?owner=22271606"
    const params = new URLSearchParams()
    if (user.first_name) params.append("firstName", user.first_name)
    if (user.last_name) params.append("lastName", user.last_name)
    if (user.email) params.append("email", user.email)
    // Assuming phone might be available on customer object, but user type had valid fields.
    // We can add phone if we had it, but for now this is good.

    const bookingUrl = `${baseUrl}&${params.toString()}`

    return (
        <div className="container py-8 max-w-5xl">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-medium mb-2">My Appointments</h1>
                <p className="text-muted-foreground">Manage your upcoming treatments and consultations.</p>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="mb-8">
                    <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
                    <TabsTrigger value="book">Book New</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4">
                    {loading ? (
                        <div className="flex bg-card p-12 rounded-lg border items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mr-2" />
                            <span className="text-muted-foreground">Loading your schedule...</span>
                        </div>
                    ) : error ? (
                        <Card className="bg-destructive/10 border-destructive/20">
                            <CardContent className="pt-6">
                                <p className="text-destructive font-medium">{error}</p>
                            </CardContent>
                        </Card>
                    ) : appointments.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                                <Calendar className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                                <h3 className="text-lg font-medium mb-2">No upcoming appointments</h3>
                                <p className="text-muted-foreground mb-6 max-w-sm">
                                    You don't have any scheduled appointments at the moment.
                                </p>
                                <Button variant="outline" onClick={() => (document.querySelector('[value="book"]') as HTMLElement)?.click()}>
                                    Book your first appointment
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-1">
                            {appointments.map((appt) => (
                                <Card key={appt.id} className="overflow-hidden">
                                    <div className="flex flex-col md:flex-row md:items-center p-6 gap-4 md:gap-8">
                                        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-primary/5 rounded-full border border-primary/10">
                                            <Calendar className="h-8 w-8 text-primary" />
                                        </div>

                                        <div className="flex-grow space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-lg font-semibold">{appt.type}</h3>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Confirmed
                                                </span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:gap-6 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{appt.date} at {appt.time} ({appt.duration})</span>
                                                </div>
                                                {appt.location && (
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{appt.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                            {appt.notes && (
                                                <p className="text-sm text-muted-foreground mt-2 border-l-2 pl-3 italic">
                                                    "{appt.notes}"
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex-shrink-0 flex flex-row md:flex-col gap-2">
                                            {/* Link to external management if/when needed */}
                                            {/* <Button variant="outline" size="sm">Modify</Button> */}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="book">
                    <Card className="overflow-hidden bg-white">
                        <div className="aspect-[4/5] md:aspect-[16/10] w-full">
                            <iframe
                                src={bookingUrl}
                                title="Schedule Appointment"
                                className="w-full h-full min-h-[600px] border-0"
                            />
                        </div>
                        <script src="https://embed.acuityscheduling.com/js/embed.js" type="text/javascript"></script>
                    </Card>
                    <p className="text-center text-xs text-muted-foreground mt-4">
                        Powered by Acuity Scheduling
                    </p>
                </TabsContent>
            </Tabs>
        </div>
    )
}
