import { sdk } from "@lib/config"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const token = req.cookies.get("_medusa_jwt")?.value

  console.log("API /me: Checking token...", token ? "Token exists (length " + token.length + ")" : "No token found")

  if (!token) {
    return NextResponse.json({ customer: null })
  }

  try {
    // Try to call Medusa backend
    console.log("API /me: Calling Medusa customer.retrieve...")
    const { customer } = await sdk.store.customer.retrieve({}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    console.log("API /me: Customer retrieved successfully:", customer?.id)
    return NextResponse.json({ customer })
  } catch (error: any) {
    console.error("API /me: Error retrieving customer:", error)
    // Detailed error logging
    if (error.response) {
       // Consider logging status or data if available on the error object
       console.error("API /me: Backend status:", error.response.status)
    }
    
    // If token is invalid (e.g. expired), we should probably clear it?
    // For now just return null customer
    return NextResponse.json({ customer: null })
  }
}
