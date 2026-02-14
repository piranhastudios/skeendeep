import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      )
    }

    // Set the auth cookie using NextResponse
    const response = NextResponse.json({ success: true })
    
    response.cookies.set("_medusa_jwt", token, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Error setting auth cookie:", error)
    return NextResponse.json(
      { error: "Failed to set authentication" },
      { status: 500 }
    )
  }
}
