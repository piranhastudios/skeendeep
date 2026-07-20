import { sdk } from "@lib/config"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password, first_name, last_name } = body

  try {
    // Create the auth identity, then the customer record with the registration token
    const registerToken = await sdk.auth.register("customer", "emailpass", {
      email,
      password,
    })

    const { customer } = await sdk.store.customer.create(
      { email, first_name, last_name },
      {},
      {
        Authorization: `Bearer ${registerToken}`,
      }
    )

    const loginResult = await sdk.auth.login("customer", "emailpass", {
      email,
      password,
    })

    if (typeof loginResult !== "string") {
      return NextResponse.json(
        { message: "Account created, but automatic sign-in failed. Please sign in manually." },
        { status: 400 }
      )
    }

    const token = loginResult

    const response = NextResponse.json({ success: true, token, customer })

    response.cookies.set("_medusa_jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
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
