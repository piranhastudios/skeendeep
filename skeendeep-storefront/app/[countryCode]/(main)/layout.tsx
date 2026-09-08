import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            {children}
            <Footer />
        </main>
    )
}
