import { sdk } from "@lib/config"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email } = body

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { message: "Email is required" },
      { status: 400 }
    )
  }

  try {
    await sdk.auth.resetPassword("customer", "emailpass", {
      identifier: email,
    })
  } catch (error: any) {
    console.error("Forgot password route error:", {
      message: error.message,
      status: error.status,
    })
  }

  // Always report success so the endpoint can't be used to probe which emails exist
  return NextResponse.json({ success: true })
}
