import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { storeReleaseFlag } from "@/flags"

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const storeEnabled = await storeReleaseFlag()

    return (
        <main className="min-h-screen bg-background">
            <Header storeEnabled={storeEnabled} />
            {children}
            <Footer />
        </main>
    )
}
