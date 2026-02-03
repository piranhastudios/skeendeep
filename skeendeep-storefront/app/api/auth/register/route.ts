import { sdk } from "@lib/config"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password, first_name, last_name } = body

  try {
    // Correctly use auth.register for Medusa v2
    // This creates the auth identity AND the customer in one go (usually)
    // or links them if logic permits.
    await sdk.auth.register("emailpass", {
      email,
      password,
      first_name,
      last_name,
    })

    const { token } = await sdk.auth.login("emailpass", {
      email,
      password,
    })

    // Fetch customer profile immediately
    const { customer } = await sdk.store.customer.retrieve({}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const response = NextResponse.json({ success: true, token, customer })
    
    response.cookies.set("_medusa_jwt", token, {
      httpOnly: true,
      secure: false, // Forcing false for localhost
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      path: "/",
    })
    
    return response
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: error.message || "Registration failed" },
      { status: 400 }
    )
  }
}
