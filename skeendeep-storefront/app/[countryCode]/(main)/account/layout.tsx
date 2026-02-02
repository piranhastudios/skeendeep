"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@lib/auth-store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function AccountLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-background">
                  {children}
                    </div>
    )
}