import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            {children}
            <Footer />
        </main>
    )
}   