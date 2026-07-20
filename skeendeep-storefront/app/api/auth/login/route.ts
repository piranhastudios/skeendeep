import { sdk } from "@lib/config"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password } = body

  try {
    const result = await sdk.auth.login("customer", "emailpass", {
      email,
      password,
    })

    if (typeof result !== "string") {
      return NextResponse.json(
        { message: "Additional authentication steps are required" },
        { status: 400 }
      )
    }

    const token = result

    // Fetch customer profile immediately to verify token and return user data
    const { customer } = await sdk.store.customer.retrieve({}, {
      Authorization: `Bearer ${token}`,
    })

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
    console.error("Login route error details:", {
      message: error.message,
      status: error.status,
      type: error.type,
      stack: error.stack
    })

    if (error.status === 401) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { message: error.message || "An error occurred during login" },
      { status: error.status || 500 }
    )
  }
}
