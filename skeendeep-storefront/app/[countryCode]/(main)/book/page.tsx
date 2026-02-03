export default function BookingPage() {
    return (
        <>
            <iframe src="https://app.acuityscheduling.com/schedule.php?owner=22271606&ref=embedded_csp" title="Schedule Appointment" width="100%" className="h-screen" frameBorder="0" allow="payment"/>
            <script src="https://embed.acuityscheduling.com/js/embed.js" type="text/javascript"/>
        </>
    )
}