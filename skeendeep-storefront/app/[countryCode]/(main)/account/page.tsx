"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import { retrieveCustomer } from "@/lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import LoginTemplate from "@/modules/account/templates/login-template"
import AccountDashboard from "@/modules/account/templates/account-dashboard"

export default function AccountPage() {
  const [customer, setCustomer] = useState<HttpTypes.StoreCustomer | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const customerData = await retrieveCustomer()
        setCustomer(customerData)
      } catch (error) {
        console.error("Error retrieving customer:", error)
        setCustomer(null)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner />
      </div>
    )
  }

  return (
    <>
      {customer ? (
        <AccountDashboard customer={customer} />
      ) : (
        <LoginTemplate />
      )}
    </>
  )
}
