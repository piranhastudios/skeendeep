import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SourceTracker } from "@/components/source-tracker"
import { storeReleaseFlag } from "@/flags"

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const storeEnabled = await storeReleaseFlag()

    return (
        <main className="min-h-screen bg-background">
            <Suspense fallback={null}>
                <SourceTracker />
            </Suspense>
            <Header storeEnabled={storeEnabled} />
            {children}
            <Footer />
        </main>
    )
}
