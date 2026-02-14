"use client" // include with Next.js 13+

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { useEffect, useState } from "react"
import { decodeToken } from "react-jwt"
import { useRouter, useSearchParams } from "next/navigation"

export default function GoogleCallback() {
  const [loading, setLoading] = useState(true)
  const [customer, setCustomer] = useState<HttpTypes.StoreCustomer>()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Convert searchParams to object
  const queryParams = Object.fromEntries(searchParams.entries())

  const sendCallback = async () => {
    let token = ""

    try {
      token = await sdk.auth.callback(
        "customer", 
        "google", 
        // pass all query parameters received from the
        // third party provider
        queryParams
      )
    } catch (error) {
      setError("Authentication Failed")
      throw error
    }

    return token
  }

  const createCustomer = async (email: string) => {
    // create customer
    await sdk.store.customer.create({
      email,
    })
  }

  const refreshToken = async () => {
    // refresh the token and return the new token
    const newToken = await sdk.auth.refresh()
    return newToken
  }

  const setAuthCookie = async (token: string) => {
    // Call API route to set the HTTP-only cookie
    await fetch("/api/auth/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
  }

  const validateCallback = async () => {
    try {
      const token = await sendCallback()

      const decodedToken = decodeToken(token) as { 
        actor_id: string
        user_metadata: Record<string, unknown> 
      }

      const shouldCreateCustomer = decodedToken.actor_id === ""

      let finalToken = token

      if (shouldCreateCustomer) {
        await createCustomer(decodedToken.user_metadata.email as string)
        finalToken = await refreshToken() as string
      }

      // Set the auth cookie for server-side authentication
      await setAuthCookie(finalToken)

      // use token to send authenticated requests
      const { customer: customerData } = await sdk.store.customer.retrieve()

      setCustomer(customerData)
      setLoading(false)
    } catch (err) {
      console.error("Callback validation error:", err)
      setError("Authentication failed. Please try again.")
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loading) {
      return
    }

    validateCallback()
  }, [loading])

  useEffect(() => {
    if (!customer) {
      return
    }

    // redirect to account page after successful authentication
    router.push("/account")
  }, [customer, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        {loading && (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Completing authentication...</p>
          </div>
        )}
        {error && (
          <div className="space-y-4">
            <p className="text-destructive">{error}</p>
            <a href="/auth" className="text-primary hover:underline">
              Return to login
            </a>
          </div>
        )}
        {customer && (
          <div className="space-y-4">
            <p className="text-foreground">Welcome, {customer.email}!</p>
            <p className="text-muted-foreground">Redirecting to your account...</p>
          </div>
        )}
      </div>
    </div>
  )
}