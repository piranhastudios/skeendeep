import { sdk } from "@lib/config"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password, token } = body

  if (!email || !password || !token) {
    return NextResponse.json(
      { message: "Email, password and token are required" },
      { status: 400 }
    )
  }

  try {
    await sdk.auth.updateProvider(
      "customer",
      "emailpass",
      { email, password },
      token
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Reset password route error:", {
      message: error.message,
      status: error.status,
    })

    if (error.status === 401) {
      return NextResponse.json(
        { message: "This reset link is invalid or has expired. Please request a new one." },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { message: error.message || "An error occurred while resetting your password" },
      { status: error.status || 500 }
    )
  }
}
