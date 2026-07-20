"use client"

import React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MailCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LocalizedClientLink from "@/components/common/localized-client-link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const result = await response.json()
        setError(result.message || "Something went wrong. Please try again.")
        return
      }

      setSubmitted(true)
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80"
          alt="Elegant interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6">
          <LocalizedClientLink
            href="/auth"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </LocalizedClientLink>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-md">
            {/* Logo */}
            <Link href="/" className="flex justify-center mb-8">
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={48}
                className="h-10 w-auto"
              />
            </Link>

            {submitted ? (
              /* Success State */
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <MailCheck className="w-7 h-7 text-accent" />
                  </div>
                </div>
                <h1 className="text-2xl font-serif font-semibold text-foreground">
                  Check your email
                </h1>
                <p className="mt-2 text-muted-foreground">
                  If an account exists for <span className="font-medium text-foreground">{email}</span>,
                  you&apos;ll receive an email with a link to reset your password.
                </p>
                <p className="mt-6 text-sm text-muted-foreground">
                  Didn&apos;t receive anything? Check your spam folder or{" "}
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-accent hover:underline font-medium"
                  >
                    try again
                  </button>
                  .
                </p>
              </div>
            ) : (
              <>
                {/* Title */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-serif font-semibold text-foreground">
                    Forgot your password?
                  </h1>
                  <p className="mt-2 text-muted-foreground">
                    Enter your email address and we&apos;ll send you a link to reset it.
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="hello@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Please wait..." : "Send Reset Link"}
                  </Button>
                </form>

                <p className="mt-8 text-center text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <LocalizedClientLink
                    href="/auth"
                    className="text-accent hover:underline font-medium"
                  >
                    Sign in
                  </LocalizedClientLink>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
